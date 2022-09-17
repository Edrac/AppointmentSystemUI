import { Appointments } from "./appointments";

export interface User {
  id: string, //license plate
  firstName: string,
  lastName: string,
  Appointments?: Array<Appointments> | null,
}
