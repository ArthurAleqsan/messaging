import { MessigingTemplates } from './enums';

export interface IProps {
  data: any;
  onClose: () => void;
}

export interface IMessage {
  accountId: number;
  data: {
    missionId: number;
    missionName: string;
    missionState: 'inProgress'; // can be other enum values
    balance?: number;
    prize?: {
      amount: number;
      currency: string;
      type: 'money'; // can be other enum values
    };
    goal?: number;
    tournamentId?: number;
    tournamentName?: string;
    tournamentType?: string;
    playerPosition: number;
    score: number;
    isProgressive?: boolean;
    progressiveMissionId?: number;
    // can be add other values also
  };
  dateCreated: Date;
  showBorders: boolean;
  showForMobile: boolean;
  status: 'unread' | 'read';
  type: MessigingTemplates;
  _id: string;
  messageType: 'popup' | 'modal';
}
