package entity // nop

import (
	"time"

	"gorm.io/gorm"
)

type History struct {
	gorm.Model
	Amount     int
	ImportDate time.Time

	IngredientID uint
	Ingredient   Ingredient `gorm:"references:id"`
} // Clear! but Entity not finish
