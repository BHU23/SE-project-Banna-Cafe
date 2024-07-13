import { MembersInterface } from "./IMember";
import { MenusInterface } from "./IMenu";

export interface RatingsInterface {
    ID?: number;
    Score?: number;

    MemberID?: number;
    Member?: MembersInterface;

    MenuID?: number;
    Menu?: MenusInterface;
}
