package entity

import (
	// "math"

	// "github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type PreorderMenu struct {
    gorm.Model
    Quantity      int       `valid:"range(0|20)~กรุณาเลือกจำนวนใหม่ที่อยู่ในช่วง 0 ถึง 20"`
    TotalCost     float32   `gorm:"type:decimal(9,2)"`

    // Foreign keys
    PreorderID    *uint      `valid:"required~Preorder is required"`
    Preorder      Preorder   `gorm:"references:id" valid:"-"`
    MenuSizeID    *uint      `valid:"required~MenuSize is required"`
    MenuSize      MenuSize   `gorm:"references:id" valid:"-"`
    SweetnessID   *uint      `valid:"required~Sweetness is required"`
    Sweetness     Sweetness  `gorm:"references:id" valid:"-"`
    DrinkOptionID *uint      `valid:"required~DrinkOption is required"`
    DrinkOption   DrinkOption `gorm:"references:id" valid:"-"`
    MenuID        *uint      `valid:"required~Menu is required"`
    Menu          Menu       `gorm:"references:id" valid:"-"`
}

// // Custom validation function registration
// func init() {
//     govalidator.CustomTypeTagMap.Set("ValidateTotalCost", govalidator.CustomTypeValidator(validateTotalCost))
// }

// // Custom validation function for TotalCost field
// func validateTotalCost(i interface{}, context interface{}) bool {
//     value, ok := i.(float64)
//     if !ok {
//         return false
//     }

//     fractionalPart := float64(value*100) - math.Floor(float64(value*100))
//     return fractionalPart == 0
// }
