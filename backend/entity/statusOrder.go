package entity

import (
	"gorm.io/gorm"
)

type StatusOrder struct {
	gorm.Model
	Name string `gorm:"not null;uniqueIndex"`

	Orders []Order `gorm:"foreignKey:StatusID"`
}
