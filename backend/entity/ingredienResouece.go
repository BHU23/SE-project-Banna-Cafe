package entity // nop

import (
	"gorm.io/gorm"
)

type IngredientResource struct {
	gorm.Model
	IngredientID uint
	Ingredient   Ingredient `gorm:"references:id"`
	ResourceID   uint
	Resource     Resource `gorm:"references:id"`
} // Clear! but Entity not finish
