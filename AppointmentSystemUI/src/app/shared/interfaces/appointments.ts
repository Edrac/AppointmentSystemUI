import { User } from "./user";

export interface Appointments {
  id: string,
  startTime: Date,
  endTime: Date,
  userFK: string, //guid
  user?: User | null,
}
