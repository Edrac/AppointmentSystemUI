import { User } from "./user";

export interface Appointments {
  Id: string,
  StartTime: Date,
  EndTime: Date,
  UserFK: string, //guid
  User?: User | null,
}
