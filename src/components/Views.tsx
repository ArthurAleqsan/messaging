import Notification from './general/Notification';
import React, { FC } from 'react';
import { MessigingTemplates } from 'src/types/enums';
import { IProps } from 'src/types/interfaces';
import Dialog from './general/Dialog';

interface IViewsProps extends IProps {
  template: MessigingTemplates;
}

const messageRenderMap = new Map<MessigingTemplates, RenderFunction>([
  [MessigingTemplates.notification, (data, cb) => <Notification data={data} onClose={cb} />],
  [MessigingTemplates.popupDialog, (data, cb) => <Dialog data={data} onClose={cb} mode="dark" />],
]);

const Views: FC<IViewsProps> = ({ template, data, onClose }) => {
  return messageRenderMap?.get(template)?.(data, onClose) || null;
};

export default Views;
