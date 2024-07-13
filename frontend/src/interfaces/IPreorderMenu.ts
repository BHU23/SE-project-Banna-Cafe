
import { PreordersInterface } from "./IPreorder";
import { MenusInterface } from "./IMenu";
import { MenuSizesInterface } from "./IMenuSize";import { SweetnessesInterface } from "./ISweetness";
import { DrinkOptionsInterface } from "./IDrinkOption";

export interface PreorderMenusInterface {
    ID?: number; 
    Quantity?: number;
    TotalCost?: number;
 
    MenuID?: number;
    Menu?: MenusInterface;
    PreorderID?: number;
    Preorder?: PreordersInterface;
    MenuSizeID?: number;
    MenuSize?: MenuSizesInterface;
    MenuSizeStatus?: number;
    SweetnessID?: number;
    Sweetness?: SweetnessesInterface; 
    SweetnessStatus?: number;
    DrinkOptionID?: number;
    DrinkOption?: DrinkOptionsInterface;
    DrinkOptionStatus?: number;
} 

