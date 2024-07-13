import { EmployeesInterface } from "./IEmployee"
import { PaymentInterface } from "./IPayment"
export interface AccountingInterface {
    ID?: number;
    Date?: Date;
    Name?: string;
    Amount?: number;
    RemainAmount?: number;

    PaymentID?: number;
    Payment?: PaymentInterface;

    AccountTypeID?: number;
    AccountType?: AccountTypeInterface;

    EmployeeID?: number;
    Employee?: EmployeesInterface;
}

export interface AccountTypeInterface {
    ID?: number;
    Name?: string;
}
