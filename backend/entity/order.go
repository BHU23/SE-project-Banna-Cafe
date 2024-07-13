package entity // no mean

import (
	"math"
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	TotalAmount  float32 // default in db is Decimal(4,2)
	TimeOfCreate *time.Time
	Income       float32
	Code         string

	OrderMenus []OrderMenu `gorm:"foreignKey:OrderID"`

	// FK
	EmployeeID *uint    `valid:"required~Employee is required"`
	Employee   Employee `gorm:"references:id" valid:"-"`

	PromotionID *uint     `valid:"required~Promotion is required"`
	Promotion   Promotion `gorm:"references:id" valid:"-"`

	StatusID *uint       `valid:"required~Status is required"`
	Status   StatusOrder `gorm:"references:id" valid:"-"`

	MemberID *uint  `valid:"required~Member is required"`
	Member   Member `gorm:"references:id" valid:"-"`

	// Code ?

}

func init() {
	govalidator.CustomTypeTagMap.Set("CreateTime", govalidator.CustomTypeValidator(validateCreateTime))
	govalidator.CustomTypeTagMap.Set("ValidAmount", govalidator.CustomTypeValidator(validateAmount))
}

func validateCreateTime(i interface{}, context interface{}) bool {
	CreateTime, ok := i.(*time.Time)
	if !ok || CreateTime == nil {
		return true
	}

	TimeNow := time.Now()
	return CreateTime.After(TimeNow)
}

func validateAmount(i interface{}, context interface{}) bool {
	value, ok := i.(float32)
	if !ok {
		return false
	}

	fractionalPart := float64(value*100) - math.Floor(float64(value*100))
	return fractionalPart == 0.00
}

// Clear!
