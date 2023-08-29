import { FC } from 'react';
import ToasterTemplate from './../../../../src/components/common/ToasterTemplate';
import { IProps } from './../../../../src/types/interfaces';

const Notification: FC<IProps> = ({ data, onClose }) => {
  return (
    <ToasterTemplate onClose={onClose}>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </ToasterTemplate>
  );
};

export default Notification;
