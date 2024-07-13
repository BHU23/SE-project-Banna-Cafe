package entity

import (
	"gorm.io/gorm"
)

type Rating struct {
	gorm.Model

	Score int

	// FK
	MemberID *uint
	Member Member `gorm:"references:id"`
	MenuID *uint
	Menu Menu `gorm:"references:id"`
}