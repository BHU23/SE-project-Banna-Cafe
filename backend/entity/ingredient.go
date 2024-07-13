package entity // nop

import (
	"time"

	"gorm.io/gorm"
)

type Ingredient struct {
	gorm.Model

	IngredientName   string           `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อวัตถุดิบ !"`
	IngredientCost   float64          `valid:"required~กรุณากรอกราคาวัตถุดิบ !"`
	IngredientAmount int              `valid:"required~กรุณากรอกจำนวนวัตถุดิบ !"`
	IngredientImage  string           `gorm:"type:longtext" valid:"required~please upload picture !"`
	IngredientExpert time.Time        `valid:"required~กรุณาเลือกวันหมดอายุ !"`
	IngredientMenu   []IngredientMenu `gorm:"foreignKey:IngredientID"`

	IngredientTypeID uint           `valid:"required~กรุณาเลือกประเภทวัตถุดิบ !"`
	IngredientType   IngredientType `gorm:"references:id" valid:"-"`

	IngredientUnitID uint           `valid:"required~กรุณาเลือกหน่วยวัตถุดิบ !"`
	IngredientUnit   IngredientUnit `gorm:"references:id" valid:"-"` // by nop 7/2/67
} // Clear!
