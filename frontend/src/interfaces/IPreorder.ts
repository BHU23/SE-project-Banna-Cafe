import { MembersInterface } from "./IMember";

export interface PreordersInterface {
  ID?: number; 
  IDPreorder?: string;
  TotalAmount?: number;
  PickUpDateTime?: Date; 
  Note?: string;
  Respond?: string;
  MemberID?: number;
  Member?: MembersInterface;
}
