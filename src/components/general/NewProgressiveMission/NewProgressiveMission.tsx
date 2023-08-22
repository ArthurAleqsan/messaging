import { useTranslation } from 'react-i18next';

import ToasterTemplate from '../../common/ToasterTemplate';
import Coins from '../CoinBalance';

import './index.scss';
import { FC, useMemo } from 'react';
import { IProps } from 'src/types/interfaces';
import { getMissionPrize } from 'src/helpers';

const NewProgressiveMissionToaster: FC<IProps> = ({ onClose, data }) => {
  const { t } = useTranslation();

  const { missionCompleted, newMission, timerDelay, validTemplates, view } = data;

  const upcoming = validTemplates?.find((m: { status?: string }) => m?.status === 'inProgress');

  const toasterName: string = useMemo(() => {
    if (missionCompleted) {
      return 'progressiveMissionCompleted';
    } else {
      return view || 'newProgressiveMission';
    }
  }, [missionCompleted, view]);

  const prize = useMemo(() => {
    if (newMission) {
      if (newMission?.prize?.currency === 'FPP') {
        return '';
      } else {
        return getMissionPrize(newMission?.prize, t);
      }
    } else {
      return 0;
    }
  }, []);

  return (
    <ToasterTemplate onClose={onClose} timerDelay={timerDelay}>
      <ToasterTemplate.Left>
        <div className="progressive__missions__left-icon">
          <img src={'/images/progressiveMissions.svg'} alt={'progressiveMissions'} />
        </div>
      </ToasterTemplate.Left>
      <ToasterTemplate.Right
        viewDetails
        toasterName={toasterName}
        textParams={{
          missionName: newMission?.name,
          prize,
          upcomingMission: upcoming?.name,
        }}
        t={t}
      >
        <span>{newMission?.prize?.currency === 'FPP' ? <Coins val={newMission?.prize?.amount} /> : null}</span>
      </ToasterTemplate.Right>
    </ToasterTemplate>
  );
};

export default NewProgressiveMissionToaster;
