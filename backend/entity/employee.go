package entity

import (
	"math"
	"gorm.io/gorm"
	"github.com/asaskevich/govalidator"
)

type Employee struct {
	gorm.Model

	FirstName string `valid:"required~กรุณากรอกชื่อ !, maxstringlength(30)~ชื่อต้องมีตัวอักษรไม่เกิน 30 ตัว"`
	LastName string `valid:"required~กรุณากรอกนามสกุล !, maxstringlength(30)~นามสกุลต้องมีตัวอักษรไม่เกิน 30 ตัว"`
	Email string `gorm:"uniqueIndex" valid:"required~กรุณากรอกอีเมล !, email~รูปแบบอีเมลไม่ถูกต้อง"`
	Password string `valid:"required~กรุณากรอกรหัสผ่าน !, minstringlength(5)~รหัสผ่านต้องไม่ต่ำกว่า 5 ตัว"`
	Age int `valid:"required~กรุณากรอกอายุ !"`
	Salary float64 `gorm:"type:decimal(9,2)" valid:"required~กรุณากรอกเงินเดือน !, ValidSalary~เงินเดือนมีทศนิยมไม่เกิน 2 ตำแหน่ง"`

	//Order []Order `gorm:"foreignKey:EmployeeID"`
	//Promotion []Promotion `gorm:"foreignKey:EmployeeID"`
	Payment []Payment `gorm:"foreignKey:EmployeeID"`
	Accounting []Accounting `gorm:"foreignKey:EmployeeID"`

	// FK
	RoleID uint `valid:"required~กรุณาเลือกตำแหน่ง !"`
	Role Role `gorm:"references:id"`
	GenderID uint `valid:"required~กรุณาเลือกเพศ !"`
	Gender Gender `gorm:"references:id"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("ValidSalary", govalidator.CustomTypeValidator(validateSalary))
}

func validateSalary(i interface{}, context interface{}) bool {
    value, ok := i.(float64)
    if !ok {
        return false
    }

    fractionalPart := float64(value*100) - math.Floor(float64(value*100))
    return fractionalPart == 0.00
}