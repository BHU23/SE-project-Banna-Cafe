package entity

import (
	"gorm.io/gorm"
)

type MenuSize struct {
	gorm.Model

	Name string `gorm:"uniqueIndex"`
	AddAmount float64
	Quantity int 
	UnitOfQuantity string

	PreorderMenus []PreorderMenu `gorm:"foreignKey:MenuSizeID"`
}