import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

interface IRenderTicketMock {
  isTournamentMission?: boolean;
  ticketCount?: number;
  t?: any;
  type?: string;
}

const renderTicketMock = ({ t, isTournamentMission, ticketCount }: IRenderTicketMock): any => (
  <>
    <i className="toaster-template-left-side-widget__ticket-icon icon-ticket-2" />
    {isTournamentMission && <span className="toaster-template-left-side-widget__cup">🏆</span>}
    <span className="toaster-template-left-side-widget__text">{t('tickets')}</span>
    <span className="toaster-template-left-side-widget__count">{ticketCount ?? 0}</span>
  </>
);

const renderPlusMock = (): any => (
  <>
    <div className="toaster-template-left-side-widget__plus-icon-wrapper">
      <i className="icon-plus" />
    </div>
  </>
);

const ToasterTemplateLeftSideWidget = ({ isTournamentMission, ticketCount, type }: IRenderTicketMock): any => {
  const { t } = useTranslation();

  const widgetRenderConfig = useMemo(
    () => ({
      ticket: renderTicketMock.bind(null, { t, isTournamentMission, ticketCount }),
      plus: renderPlusMock.bind(null, t),
    }),
    []
  );

  return <div className="toaster-template-left-side-widget">{widgetRenderConfig[type ?? 'ticket']()}</div>;
};

export default ToasterTemplateLeftSideWidget;
