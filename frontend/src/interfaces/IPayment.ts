import { EmployeesInterface } from "./IEmployee";
import { PreOrderInterface } from "./IManagepreorder";

export interface PaymentInterface {
  ID?: number;
  Image?: string;
  Time?: Date;
  Code?: string;
  TotalAmount?: number;
  Point?: number;

  PromotionID?: number;
  Promotion?: PromotionInterface;

  PreorderID?: number;
  Preorder?: PreOrderInterface;

  EmployeeID?: number;
  Employee?: EmployeesInterface;
}

export interface PaymentStatusInterface {
  ID?: number;

  PaymentID?: number;
  Payment?: PaymentInterface;

  StatusPaymentID?: number;
  StatusPayment?: StatusPaymentInterface;
}

export interface StatusPaymentInterface {
  ID?: number;
  Name?: string;
}

export interface PromotionInterface {
  ID?: number;
  Code?: string;
  Discount?: number;
  DiscountPoint?: number;
  Employee?: EmployeesInterface;
  EmployeeID?: number;
  Image?: string;
  Name?: string;
  TimeOfbegin?: Date;
  TimeOfend?: Date;
}
