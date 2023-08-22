import { useTranslation } from 'react-i18next';

import ToasterTemplate from '../../common/ToasterTemplate';
import ToasterTemplateLeftSideWidget from '../../common/ToasterTemplateLeftSideWidget/ToasterTemplateLeftSideWidget';
import ProgressBar from '../ProgressBar';

import './index.scss';
import { FC } from 'react';
import { IProps } from 'src/types/interfaces';
import { formatBalance } from 'src/helpers';

const WagerFreespinsCompleteToaster: FC<IProps> = ({ onClose, data }) => {
  const { t } = useTranslation();

  return (
    <ToasterTemplate timerDelay={data.timerDelay} onClose={onClose}>
      <ToasterTemplate.Left>
        <ToasterTemplateLeftSideWidget type="plus" />
      </ToasterTemplate.Left>
      <ToasterTemplate.Right
        viewDetails
        toasterName={data?.coefficient ? 'freeSpinMissionCompleateToaster' : 'freeSpinCompleteWithoutWageringToaster'}
        textParams={{
          amount: formatBalance(data?.balance || data?.amount, data?.currency),
        }}
        t={t}
      >
        {data?.coefficient ? (
          <>
            <div className="wager-freespins-complete-toaster__progress-bar-wrapper">
              <ProgressBar data={{ goal: parseFloat((data?.balance * data?.coefficient).toFixed(2)) }} />
            </div>

            <span
              className="wager-freespins-complete-toaster__progress-bar-text"
              dangerouslySetInnerHTML={{
                __html: t('freeSpinMissionCompleateToasterProgressBarText', {
                  amount: formatBalance(String(data?.balance * data?.coefficient), data?.currency),
                }),
              }}
            />
          </>
        ) : null}
      </ToasterTemplate.Right>
    </ToasterTemplate>
  );
};

export default WagerFreespinsCompleteToaster;
