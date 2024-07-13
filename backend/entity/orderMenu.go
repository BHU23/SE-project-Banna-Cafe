package entity // no mean 50/50

import (
	"gorm.io/gorm"
)

type OrderMenu struct {
	gorm.Model
	Amount    int `valid:"required~Amount is required"`
	Cost 	  float32
	Note      string

	// FK
	MenuID 		  *uint 	  `valid:"required~Menu is required"`
	Menu 		  Menu 		  `gorm:"references:id" valid:"-"`
	MenuSizeID    *uint       `valid:"required~MenuSize is required"`
	MenuSize      MenuSize    `gorm:"references:id" valid:"-"`
	SweetnessID   *uint       `valid:"required~Sweetness is required"`
	Sweetness     Sweetness   `gorm:"references:id" valid:"-"`
	DrinkOptionID *uint       `valid:"required~DrinkOption is required"`
	DrinkOption    DrinkOption `gorm:"references:id" valid:"-"`
	OrderID 	  *uint 	   `valid:"required~Order is required"`
	Order 		   Order  	   `gorm:"references:id" valid:"-"`
} // Clear!