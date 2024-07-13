package entity

import (
	"gorm.io/gorm"
)

type IngredientUnit struct {
	gorm.Model

	UnitName string `gorm:"uniqueIndex"`

	IngredientMenu []IngredientMenu `gorm:"foreignKey:IngredientUnitID"`
	Ingredient []Ingredient `gorm:"foreignKey:IngredientUnitID"`
}