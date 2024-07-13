package entity

import (
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model

	Username    string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อ !,maxstringlength(50)~ชื่อผู้ใช้ความยาวต้องไม่เกิน 50 อักษร"`
	Email       string `gorm:"uniqueIndex" valid:"required~กรุณากรอก Email !, email~Email ผิดพลาด"`
	Password    string `valid:"required~กรุณากรอกรหัสผ่าน !,minstringlength(8)~รหัสผ่านต้องประกอบด้วยอย่างน้อย 8 ตัว"`
	Phone       string `valid:"phone_valid~เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอกเฉพาะตัวเลข 10 ตัว"`
	MemberImage string `gorm:"type:longtext" valid:"image_valid~รูปภาพไม่ถูกต้อง กรุณาอัปโหลดรูปภาพใหม่"`
	Point       int
	// Order     []Order    `gorm:"foreignKey:MemberID"`
	Rating    []Rating   `gorm:"foreignKey:MemberID"`
	Preorders []Preorder `gorm:"foreignKey:MemberID"`
}

func init() {
	govalidator.TagMap["image_valid"] = govalidator.Validator(func(str string) bool {
		return govalidator.Matches(str, "^(data:image(.+);base64,.+)$")
	})
	govalidator.TagMap["phone_valid"] = govalidator.Validator(func(str string) bool {
		return govalidator.IsNumeric(str) && len(str) == 10
	})
}
