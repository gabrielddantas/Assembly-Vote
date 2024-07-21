import { ISessionProps } from "../session/session.interface";

export interface IScheduleProps {
  id: string;
  title: string;
  description: string;
  session: ISessionProps;
}
