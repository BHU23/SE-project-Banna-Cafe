export interface PreorderStatusRecivesInterface {
    ID?: number; 
    StatusRecivePreorderID?: number;
    StatusRecivePreorder?: StatusRecivePreordersInterface;
    PreorderID?: number;
    Preorder?: PreordersInterface;
} 

import { PreordersInterface } from "./IPreorder";
import { StatusRecivePreordersInterface } from "./IStatusRecivePreorder";