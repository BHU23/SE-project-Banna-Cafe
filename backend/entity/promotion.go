package entity

import (
	"time"

	"gorm.io/gorm"
)

type Promotion struct {
	gorm.Model
	Code        string    `gorm:"uniqueIndex" valid:"required~กรุณากรอกรหัสโปรโมชั่น!"`
	Name        string    `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อโปรโมชั่น!"`
	Image       string    `gorm:"type:longtext" valid:"required~กรุณาอัพโหลดรูป!"`
	TimeOfbegin time.Time `valid:"required~กรุณาเลือกวันเริ่มโปรโมชั่น!"`
	TimeOfend   time.Time `valid:"required~กรุณาเลือกวันสิ้นสุดโปรโมชั่น!"`
	Discount    float64   `valid:"required~กรุณากรอกส่วนลด!, float~กรุณากรอกเป็นเลขทศนิยม"`
	DiscountPoint int

	// FK
	EmployeeID uint
	Employee   Employee `gorm:"references:ID" valid:"-"`
}
