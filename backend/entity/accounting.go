package entity

import (
	"time"

	"gorm.io/gorm"
)

type Accounting struct{
	gorm.Model
	
	Date time.Time
	Name string
	Amount int
	RemainAmount int

	PaymentID *uint
	Payment Payment `gorm:"references:id"`

	AccountTypeID *uint
	AccountType AccountType `gorm:"references:id"`

	EmployeeID *uint
	Employee Employee `gorm:"references:id"`
}

type AccountType struct{
	gorm.Model
	Name string
	Accountings []Accounting `gorm:"foreignKey:AccountTypeID"`
}