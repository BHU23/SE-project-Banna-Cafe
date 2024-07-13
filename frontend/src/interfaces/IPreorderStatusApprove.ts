export interface PreorderStatusApprovesInterface {
    ID?: number; 
    StatusApprovePreorderID?: number;
    StatusApprovePreorder?: StatusApprovePreordersInterface;
    PreorderID?: number;
    Preorder?: PreordersInterface;
} 

import { PreordersInterface } from "./IPreorder";
import { StatusApprovePreordersInterface } from "./IStatusApprovePreorder";