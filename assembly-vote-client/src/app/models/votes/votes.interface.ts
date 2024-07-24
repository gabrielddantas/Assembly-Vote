import { IAssociateProps } from "../associate/associate.interface";
import { IScheduleProps } from "../schedule/schedule.interface";

export interface IVotesProps {
  id: number;
  vote: boolean;
  associate: IAssociateProps;
  schedule: IScheduleProps;
}
