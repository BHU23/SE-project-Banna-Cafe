import { IngredientTypesInterface } from "./IIngredientType";
import { IngredientUnitsInterface } from "./IIngredientUnit";

export interface IngredientsInterface {
  ID?: number; // ok
  IngredientName?: string; // ok
  IngredientCost?: number; // ok?
  IngredientAmount?: number; // ok
  IngredientImage?: string;
  IngredientExpert?: Date;

  IngredientTypeID?: number; // ok
  IngredientType?: IngredientTypesInterface; // ok

  IngredientUnitID?: number; // ok
  IngredientUnit?: IngredientUnitsInterface;
} // Clear!