import React, { useState, useCallback, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IProps } from 'src/types/interfaces';

import Checkbox from '../../common/Checkbox';
import ToasterTemplate from '../../common/ToasterTemplate';
import ToasterTemplateLeftSideWidget from '../../common/ToasterTemplateLeftSideWidget/ToasterTemplateLeftSideWidget';

import './index.scss';

const GameBoxJackpotMissionToaster: FC<IProps> = ({ data, onClose }) => {
  const { t } = useTranslation();
  const { jackpot, prizeCount, timerDelay } = data;
  const [hideMessages, setHideMessages] = useState(false);
  const handleClose = useCallback(() => {
    if (!!sessionStorage?.getItem('hideMessages')) {
      onClose();
      return;
    }
    if (hideMessages) {
      sessionStorage.setItem('hideMessages', JSON.stringify(true));
    }
    onClose();
  }, [hideMessages]);

  return (
    <ToasterTemplate timerDelay={timerDelay} onClose={handleClose}>
      <ToasterTemplate.Left>
        <ToasterTemplateLeftSideWidget ticketCount={jackpot?.account_tickets} />
      </ToasterTemplate.Left>
      <ToasterTemplate.Right
        toasterName="gameBoxJackpotMissionToaster"
        textParams={{ prizeCount }}
        timerDelay={timerDelay}
        t={t}
      >
        <div className="game-box-jackpot-mission-toaster__checkbox-wrapper">
          <Checkbox label="dontShowAgain" value={hideMessages} setValue={setHideMessages} />
        </div>
      </ToasterTemplate.Right>
    </ToasterTemplate>
  );
};
export default GameBoxJackpotMissionToaster;
