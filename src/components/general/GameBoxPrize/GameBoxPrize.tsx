import { useTranslation } from 'react-i18next';

import ToasterTemplate from '../../common/ToasterTemplate';
import ToasterTemplateLeftSideWidget from '../../common/ToasterTemplateLeftSideWidget/ToasterTemplateLeftSideWidget';
import ProgressBar from '../ProgressBar';

import './index.scss';
import { FC } from 'react';
import { IProps } from 'src/types/interfaces';

const GameBoxPrize: FC<IProps> = ({ data, onClose }) => {
  const { t } = useTranslation();

  const isPrizeMoney = data?.mission?.prize?.type === 'money';

  return (
    <ToasterTemplate timerDelay={data?.timerDelay} onClose={onClose}>
      <ToasterTemplate.Left>
        <ToasterTemplateLeftSideWidget
          ticketCount={!isPrizeMoney && data?.prizeCount}
          isTournamentMission={!isPrizeMoney}
          type={isPrizeMoney ? 'plus' : 'ticket'}
        />
      </ToasterTemplate.Left>
      <ToasterTemplate.Right viewDetails toasterName={data?.toasterName} textParams={data?.toasterTextParams} t={t}>
        <div className="game-box-prize__progress-bar-wrapper">
          <ProgressBar data={data?.mission} />
        </div>
      </ToasterTemplate.Right>
    </ToasterTemplate>
  );
};

export default GameBoxPrize;
