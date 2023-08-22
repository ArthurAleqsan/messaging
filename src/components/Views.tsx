import GameBoxPrize from './general/GameBoxPrize';
import NewMissionToaster from './general/NewMission';
import NewProgressiveMissionToaster from './general/NewProgressiveMission';
import React, { FC } from 'react';
import { MessigingTemplates } from 'src/types/enums';
import { IProps } from 'src/types/interfaces';
import GameBoxJackpotMissionToaster from './general/GameBoxJackpotMission';
import NewWageringMissionToaster from './general/NewWageringMission';
import WagerFreespinsCompleteToaster from './general/WagerFreespinsComplete';
// import TourFinishedMission from './general/TourfinishedMission';

interface IViewsProps extends IProps {
  template: MessigingTemplates;
}

const messageRenderMap = new Map<MessigingTemplates, RenderFunction>([
  // newProgressiveMission, newMission
  [MessigingTemplates.newMission, (data, cb) => <NewMissionToaster data={data} onClose={cb} />],
  // newWageringMission, newWageringMission
  [MessigingTemplates.newWageringMission, (data, cb) => <NewWageringMissionToaster data={data} onClose={cb} />],
  // tourFinished
  // [MessigingTemplates.tourFinished, () => <TourFinishedMission />],
  [MessigingTemplates.gameBoxJackpotMission, (data, cb) => <GameBoxJackpotMissionToaster data={data} onClose={cb} />],
  [MessigingTemplates.gameBoxPrize, (data, cb) => <GameBoxPrize data={data} onClose={cb} />],
  [MessigingTemplates.wagerFreespinsComplete, (data, cb) => <WagerFreespinsCompleteToaster data={data} onClose={cb} />],
  [MessigingTemplates.newProgressiveMission, (data, cb) => <NewProgressiveMissionToaster data={data} onClose={cb} />],
]);

const Views: FC<IViewsProps> = ({ template, data, onClose }) => {
  return messageRenderMap?.get(template)?.(data, onClose) || null;
};

export default Views;
