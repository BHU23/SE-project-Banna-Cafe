import { IngredientsInterface } from "./IIngredient";
import { ResourceInterface } from "./IResource";

export interface IngredientResourceInterface {
  ID?: number; // ok
  IngredientID?: number; // ok
  Ingredient?: IngredientsInterface; // ok

  ResourceID?: number; // ok
  Resource?: ResourceInterface; // ok
} // Clear!