import { MembersInterface } from "./IMember";

export interface ManagePreOrderInterface {
  PreorderID?: number;
  //CreateAt?: Date;
  PickupTime?: Date;
  ApproveStatus?: string;
  ReceiveStatus?: string;
  Price?: Float32Array;
  MemmberID?: number;
  MemberName?: string;
  Slipt?: string;
  Respond?: string;
  Note?: string;
  PaymentStatus?: string;
}
export interface PreOrderInterface {
  ID?: number;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  TotalAmount?: Float32Array;
  Note?: string;
  Respond?: string;
  MemberID?: number;
  Member?: MembersInterface;
  DeletedAt?: Date;
  PreorderStatusApproveID: number
  PreorderStatusApproves?: PreorderStatusApprovesInterface[];
  PreorderStatusRevivesID: number
  PreorderStatusRecives?: PreorderStatusRecivesInterface[];

  //tik
  PickUpDateTime?: Date;
  IDPreorder?: string;
}

export interface StatusApprovePreorderInterface {
  ID?: number;
  Name?: string;
}

export interface StatusRecivePreorderInterface {
  ID?: number;
  Name?: string;
}

export interface PreorderStatusApprovesInterface {
  ID?: number;
  PreOrderID?: number;
  PreOrder?: PreOrderInterface;
  StatusApprovePreorderID?: number;
  StatusApprovePreorder?: StatusApprovePreorderInterface;
}

export interface PreorderStatusRecivesInterface {
  ID?: number;
  PreOrderID?: number;
  PreOrder?: PreOrderInterface;
  StatusRecivePreorderID?: number;
  StatusRecivePreorder?: StatusRecivePreorderInterface;
}
