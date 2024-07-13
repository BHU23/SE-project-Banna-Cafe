import { EmployeesInterface } from "./IEmployee";

export interface PromotionInterface {
    ID?: number; // ok
    Code?: string; // ok
    Name?: string; // ok?
    Image?: string; // ok
    TimeOfbegin?: Date;
    TimeOfend?: Date;
    Discount?: number;
    DiscountPoint?: number;

    EmployeeID?: number; // ok
    Employee?: EmployeesInterface // ok
} // Clear!