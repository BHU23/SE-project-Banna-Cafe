export interface OrderInterface{
    ID?: number;
    TotalAmount?: number;
    TimeOfCreate?: Date;
    Income?: number;
    MemberID?: number;
    Member?:MembersInterface;
    EmployeeID?: number;
    Employee?:EmployeesInterface;
}
import { MembersInterface } from "./IMember";
import { EmployeesInterface } from "./IEmployee";