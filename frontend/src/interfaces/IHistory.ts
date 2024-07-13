import { IngredientsInterface } from "./IIngredient";

export interface HistoryInterface { // Update By Nop 2/12/2566
    ID?: number; // ok
    Amount?: number; // ok
    ImportDate?: Date // Update
    IngredientID?: number; // ok
    Ingredient?: IngredientsInterface; // ok
} // Clear!