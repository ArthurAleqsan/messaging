import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IProps } from 'src/types/interfaces';

import ToasterTemplate from '../../common/ToasterTemplate';
import ToasterTemplateLeftSideWidget from '../../common/ToasterTemplateLeftSideWidget/ToasterTemplateLeftSideWidget';
import ProgressBar from '../ProgressBar';

import './index.scss';

const NewMissionToaster: FC<IProps> = ({ onClose, data }) => {
  const { t } = useTranslation();
  const { prize, goal, missionName, isProgressive } = data?.data;

  console.log('data----', data);

  const missionsConfig = useMemo(() => {
    return {
      tourTicket: {
        toasterName: 'tournamentNewMissionToaster',
        textParams: { goal, missionName },
        titleParams: { missionName },
      },
      jackpotTicket: {
        toasterName: 'raffleNewMissionToaster',
        textParams: { missionName },
        titleParams: { missionName },
      },
      freespins: {
        toasterName: 'freeSpinsNewMissionToaster',
        textParams: { missionName, count: prize.spinCount },
        titleParams: { missionName },
      },
    };
  }, [data]);

  const prizeType = useMemo(() => {
    if (isProgressive) {
      return 'progressiveMission';
    }
    return prize?.type;
  }, [data]);

  console.log('missionsConfig', missionsConfig, prizeType);

  const isTournamentMission = prizeType === 'tourTicket';

  return (
    <ToasterTemplate onClose={onClose}>
      <ToasterTemplate.Left>
        <ToasterTemplateLeftSideWidget isTournamentMission={isTournamentMission} />
      </ToasterTemplate.Left>
      <ToasterTemplate.Right
        viewDetails
        toasterName={'tournamentNewMissionToaster'}
        textParams={{ goal, missionName }}
        titleParams={{ missionName }}
        t={t}
      >
        <div className="new-mission-toaster__progress-bar-wrapper">
          <ProgressBar data={data?.data} />
        </div>
        {!isTournamentMission && (
          <span
            className="new-mission-toaster__progress-bar-text"
            dangerouslySetInnerHTML={{
              __html: t('newMissionRaffleToasterProgressBarText'),
            }}
          />
        )}
      </ToasterTemplate.Right>
    </ToasterTemplate>
  );
};

export default NewMissionToaster;
