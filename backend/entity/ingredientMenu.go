package entity

import (
	"gorm.io/gorm"
)

type IngredientMenu struct {
	gorm.Model
	Amount int `valid:"required~กรุณากรอกจำนวนวัตถุดิบ !, range(1|9999)~จำนวนวัตถุดิบต้องมีตั้งแต่ 1 จำนวนขึ้นไป และมีจำนวนไม่เกิน 4 หลัก"`

	// FK
	IngredientID uint `valid:"required~Ingredient is required"`
	Ingredient Ingredient `gorm:"references:id" valid:"-"`

	MenuID uint `valid:"required~Menu is required"`
	Menu Menu `gorm:"references:id" valid:"-"`

	IngredientUnitID uint `valid:"required~IngredientUnit is required"`
	IngredientUnit IngredientUnit `gorm:"references:id" valid:"-"`
}
