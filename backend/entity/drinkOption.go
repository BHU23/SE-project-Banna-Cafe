package entity

import (
	"gorm.io/gorm"
)

type DrinkOption struct {
	gorm.Model
	Name           string          `gorm:"uniqueIndex"`
	PreorderMenus  []PreorderMenu  `gorm:"foreignKey:DrinkOptionID"`
}

