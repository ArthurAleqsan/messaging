import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

interface IProps {
  label: string;
  value: any;
  setValue: (checked: boolean) => void;
}

const Checkbox: FC<IProps> = ({ label, value, setValue }) => {
  const { t } = useTranslation();
  const node: any = useRef();

  const handleClick = (): void => {
    setValue(!node.current.checked);
  };

  return (
    <div className="custom-checkbox" onClick={handleClick}>
      <input className="custom-checkbox__input" checked={value} value={value} type="checkbox" ref={node} />
      <span className="custom-checkbox__label">{t(label)}</span>
    </div>
  );
};

export default Checkbox;
