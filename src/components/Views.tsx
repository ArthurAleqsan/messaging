import Notification from './general/Notification';
import { FC } from 'react';
import { EnumMessigingTemplates } from './../types/enums';
import { IProps } from './../types/interfaces';
import Dialog from './general/Dialog';
import { RenderFunction } from './../types/types';

interface IViewsProps extends IProps {
  template: EnumMessigingTemplates;
}

const messageRenderMap = new Map<EnumMessigingTemplates, RenderFunction>([
  [EnumMessigingTemplates.notification, (data, cb) => <Notification data={data} onClose={cb} />],
  [EnumMessigingTemplates.popupDialog, (data, cb) => <Dialog data={data} onClose={cb} mode="dark" />],
]);

const Views: FC<IViewsProps> = ({ template, data, onClose }) => {
  return messageRenderMap?.get(template)?.(data, onClose) || null;
};

export default Views;
