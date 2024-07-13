package entity

import (
	"math"
	"gorm.io/gorm"
	"github.com/asaskevich/govalidator"
)

type Menu struct {
	gorm.Model

	MenuID int `gorm:"uniqueIndex" valid:"required~MenuID is required"`
	MenuName string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อเมนู !, maxstringlength(30)~ชื่อเมนูต้องมีตัวอักษรไม่เกิน 30 ตัว"`
	MenuNameEng string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อเมนู !, maxstringlength(30)~ชื่อเมนูต้องมีตัวอักษรไม่เกิน 30 ตัว"`
	MenuCost float64 `gorm:"type:decimal(9,2)" valid:"required~กรุณากรอกเป็นเลขทศนิยม !, ValidCost~ราคามีทศนิยมไม่เกิน 2 ตำแหน่ง"`
	MenuImage string `gorm:"type:longtext"`
	MenuStatus int `valid:"required~กรุณากรอกสถานะเมนู !, range(1|2)~กรุณากรอกเฉพาะสถานะ 1 หรือ 2 เท่านั้น"`

	// OrderMenu []OrderMenu `gorm:"foreignKey:MenuID"`
	IngredientMenu []IngredientMenu `gorm:"foreignKey:MenuID"`
	PreorderMenus []PreorderMenu `gorm:"foreignKey:MenuID"`
	Rating []Rating `gorm:"foreignKey:MenuID"`

	// FK test
	MenuTypeID uint `valid:"required~กรุณาเลือกประเภทเมนู !"`
	MenuType MenuType `gorm:"references:id"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("ValidCost", govalidator.CustomTypeValidator(validateCost))
}

func validateCost(i interface{}, context interface{}) bool {
    value, ok := i.(float64)
    if !ok {
        return false
    }

    fractionalPart := float64(value*100) - math.Floor(float64(value*100))
    return fractionalPart == 0.00
}