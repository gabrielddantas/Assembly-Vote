import { ISessionProps } from "../session/session.interface";

export interface IScheduleProps {
  id: string;
  title: string;
  description: string;
  session: ISessionProps;
}

export interface IScheduleResponseProps extends IScheduleProps {
  totalVotes: number;
  approvedVotes: number;
  disapprovedVotes: number;
}
