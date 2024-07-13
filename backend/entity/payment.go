package entity

import (
	"time"
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Image string `gorm:"type:longtext" valid:"required~image is needed"`
	Time time.Time `valid:"required~time is required"`
	Code string
	TotalAmount int `valid:"numeric~total amount should be at least 0"`
	Point int

	Accounting []Accounting `gorm:"foreignKey:PaymentID"`
	PaymentStatus []PaymentStatus `gorm:"foreignKey:PaymentID"`


	//FK
	PromotionID *uint 
	Promotion Promotion `gorm:"references:id" valid:"-"`

	PreorderID *uint `gorm:"uniqueIndex"`
	Preorder Preorder `gorm:"references:id" valid:"-"`

	EmployeeID *uint
	Employee Employee `gorm:"references:id" valid:"-"`


}

type PaymentStatus struct{
	gorm.Model

	PaymentID *uint
	Payment Payment `gorm:"references:id"`

	StatusPaymentID *uint
	StatusPayment StatusPayment `gorm:"references:id"`
}

type StatusPayment struct{
	gorm.Model
	Name string
	PaymentStatus []PaymentStatus `gorm:"foreignKey:StatusPaymentID"`
}
