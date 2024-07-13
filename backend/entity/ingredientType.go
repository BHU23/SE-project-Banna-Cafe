package entity

import (
	"gorm.io/gorm"
)

type IngredientType struct {
	gorm.Model
	TypeName string `gorm:"uniqueIndex"`

	Ingredient []Ingredient `gorm:"foreignKey:id"`
} // Clear!
