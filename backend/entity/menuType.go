package entity

import (
	"gorm.io/gorm"
)

type MenuType struct {
	gorm.Model

	TypeName string `gorm:"uniqueIndex"`

	Menu []Menu `gorm:"foreignKey:MenuTypeID"`
}