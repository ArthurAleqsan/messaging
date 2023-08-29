import { useEffect } from 'react';

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

export default ToasterTemplate;
