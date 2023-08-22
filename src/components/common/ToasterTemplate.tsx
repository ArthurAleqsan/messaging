import React, { useEffect } from 'react';

const TOASTER_ICONS = {
  raffleNewMissionToaster: 'raffle-draw',
  tournamentNewMissionToaster: 'tournament',
  depositNewMissionToaster: 'deposit',
  freeSpinsNewMissionToaster: 'freespins',
  gameBoxJackpotMissionToaster: 'raffle-draw',
  moneyCongratulationMessages: 'deposit',
  tourTicketCongratulationMessages: 'tournament',
  freeSpinMissionCompleateToaster: 'freespins',
  depositMissionCongratsToaster: 'deposit',
  freeSpinMissionCongratsToaster: 'freespins',
  tounamentMissionCongratsToaster: 'tournament',
};

interface IProps {
  onClose: () => void;
  children: any;
  timerDelay: number;
}

const ToasterTemplate: any = ({ onClose, children, timerDelay }: IProps) => {
  useEffect(() => {
    let timer: any;
    if (timerDelay) {
      timer = setTimeout(onClose, timerDelay);
    }
    return () => clearTimeout(timer);
  }, [timerDelay]);

  return (
    <div className="toaster-template">
      <div className="toaster-template__close-wrapper" onClick={onClose}>
        <i className="toaster-template__close icon-clearclose" />
      </div>
      <div className="toaster-template__inner">{children}</div>
      {+timerDelay > 0 && (
        <div className="toaster-template__timer">
          <span
            style={{
              animationName: 'progress',
              animationDuration: `${timerDelay / 1000}s`,
              animationFillMode: 'forwards',
              animationTimingFunction: 'linear',
            }}
          />
        </div>
      )}
    </div>
  );
};

ToasterTemplate.Left = ({ children }: any) => {
  return <div className="toaster-template__left-side-wrapper">{children}</div>;
};
ToasterTemplate.Right = ({ children, titleParams, toasterName, textParams, t, timerDelay }: any) => {
  return (
    <div className="toaster-template__info-wrapper" style={{ padding: `12px 8px ${+timerDelay > 0 ? 13 : 8}px` }}>
      <div className="toaster-template__info-title-wrapper">
        <span
          className="toaster-template__info-title"
          dangerouslySetInnerHTML={{
            __html: t(`${toasterName}.title`, titleParams ?? {}),
          }}
        />
        {!!TOASTER_ICONS[toasterName] && (
          <img
            src={`/images/${TOASTER_ICONS[toasterName]}.svg`}
            alt="deposit"
            className="toaster-template__info-title--img"
          />
        )}
      </div>
      <span
        className="toaster-template__info-text"
        dangerouslySetInnerHTML={{
          __html: t(`${toasterName}.text`, textParams ?? {}),
        }}
      />
      {children}
    </div>
  );
};

export default ToasterTemplate;
