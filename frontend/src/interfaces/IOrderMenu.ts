export interface OrderMenuInterface{
    ID?: number;
    Amount?: number;
    Cost?: number;
    Note?: string;

    MenuSizeID?: number;
    MenuSize?: MenuSizesInterface;
    MenuSizeStatus?: number;
    SweetnessID?: number;
    Sweetness?: SweetnessesInterface;
    SweetnessStatus?: number;
    DrinkOptionID?: number;
    DrinKOption?: DrinkOptionsInterface;
    DrinkOptionStatus?: number;
    MenuID?: number;
    Menu?: MenusInterface;
    OrderID?: number;
    Order?: OrderInterface;
}
import { MenusInterface } from "./IMenu";
import { OrderInterface } from "./IOrder";
import { MenuSizesInterface } from "./IMenuSize";
import { SweetnessesInterface } from "./ISweetness";
import { DrinkOptionsInterface } from "./IDrinkOption";