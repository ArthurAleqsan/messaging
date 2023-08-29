import { FC, useState, useCallback } from 'react';
import { IProps } from './../../../../src/types/interfaces';
import { Modal } from 'antd';
import './styles.scss';

interface IDialogProps extends IProps {
  mode: string;
}

const Dialog: FC<IDialogProps> = ({ data, onClose, mode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, []);

  return (
    <Modal onCancel={closeModal} open={isOpen} footer={null} centered mask={false} className={mode}>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </Modal>
  );
};

export default Dialog;
