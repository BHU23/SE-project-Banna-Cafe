package entity

import (
	"gorm.io/gorm"
)

type Sweetness struct {
	gorm.Model

	Name string `gorm:"uniqueIndex"`
	Value int `gorm:"uniqueIndex"`

	PreorderMenus []PreorderMenu `gorm:"foreignKey:SweetnessID"`
} 