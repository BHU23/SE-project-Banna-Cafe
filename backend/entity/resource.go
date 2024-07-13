package entity // nop

import (
	"gorm.io/gorm"
)

type Resource struct {
	gorm.Model
	Name    string
	Address string
	Phone   string
} // Clear! but Entity not finish
