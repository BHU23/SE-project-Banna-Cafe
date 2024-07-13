import { RolesInterface } from "./IRole";
import { GendersInterface } from "./IGender";

export interface EmployeesInterface {
  ID?: number;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Password?: string;
  Age?: number;
  Salary: number;
  RoleID?: number;
  Role?: RolesInterface;
  GenderID?: number;
  Gender?: GendersInterface;
}
