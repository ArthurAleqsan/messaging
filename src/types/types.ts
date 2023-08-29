// import { EnumMessigingTemplates } from './enums';

export type MarkAsReadParams = {
  status: 'read';
  accountId: string;
  messageId: string;
};

export type RenderFunction = (data: any, cb: any) => React.ReactElement;
