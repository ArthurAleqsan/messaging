import React, { FC, useMemo } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import ToasterTemplate from '../../common/ToasterTemplate';
import ToasterTemplateLeftSideWidget from '../../common/ToasterTemplateLeftSideWidget/ToasterTemplateLeftSideWidget';
import ProgressBar from '../ProgressBar';

import './index.scss';
import { IProps } from 'src/types/interfaces';
import { formatCurrency } from 'src/helpers';

const NewWageringMissionToaster: FC<IProps> = ({ onClose, data }) => {
  console.log('data---', data);
  const { t } = useTranslation();

  const handleClose = (): void => {
    onClose();
    // dispatch(requestMission());
    // dispatch(requestGameBoxMission())
  };

  const isFreeSpinDialog = useMemo(() => data?.data.missionState === 'freespins', [data]);

  return (
    <ToasterTemplate onClose={handleClose}>
      <ToasterTemplate.Left>
        <ToasterTemplateLeftSideWidget type="plus" />
      </ToasterTemplate.Left>
      <ToasterTemplate.Right
        viewDetails
        toasterName={`${isFreeSpinDialog ? 'freeSpinsNewMissionToaster' : 'depositNewMissionToaster'}`}
        textParams={
          isFreeSpinDialog
            ? {
                count: data?.freespinsCount,
                date: moment(data?.expireDate).format('DD/MM/YYYY'),
              }
            : { prize: formatCurrency(data?.balance, data?.currency) }
        }
        t={t}
      >
        {!isFreeSpinDialog && (
          <div className="new-wagering-mission-toaster__progress-bar-wrapper">
            <ProgressBar data={data} />
            <span
              className="new-wagering-mission-toaster__progress-bar-text"
              dangerouslySetInnerHTML={{
                __html: t('depositNewMissionToasterProgressBarText', {
                  count: formatCurrency(+(data?.balance * data?.coefficient).toFixed(2), data?.currency),
                }),
              }}
            />
          </div>
        )}
      </ToasterTemplate.Right>
    </ToasterTemplate>
  );
};

export default NewWageringMissionToaster;
