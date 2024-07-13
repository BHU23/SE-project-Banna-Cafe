import { IngredientsInterface } from "./IIngredient";
import { MenusInterface } from "./IMenu";
import { IngredientUnitsInterface } from "./IIngredientUnit";

export interface IngredientMenusInterface {
    ID?: number;
    Amount?: number;

    MenuID?: number;
    MenuName?: string;
    Menu?: MenusInterface;

    IngredientID?: number;
    IngredientName?: string;
    Ingredient?: IngredientsInterface;

    IngredientUnitID?: number;
    UnitName?: string;
    IngredientUnit?: IngredientUnitsInterface;
  }