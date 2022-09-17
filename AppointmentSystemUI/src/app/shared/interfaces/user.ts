import { Appointments } from "./appointments";

export interface User {
  Id: string, //license plate
  FirstName: string,
  LastName: string,
  Appointments?: Array<Appointments> | null,
}
