package unit

import (
	//"fmt" -> not use :D
	"testing"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut66/team08/entity"
)

func TestUsername(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Username is required", func(t *testing.T) {
		Member := entity.Member{
			Username:     "", // Empty username for testing the required validation
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd1234",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ !"))
	})

	t.Run(`Username should not exceed 50 characters`, func(t *testing.T) {
		Member := entity.Member{
			Username:     "BhuwadolSriton na suraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanaaaaaaaaaaaaaaaaaaaaaareeeeeeeeeeeeee",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd1234",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ชื่อผู้ใช้ความยาวต้องไม่เกิน 50 อักษร"))	
	})

	t.Run(`Username pattern is valid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd1234",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestEmailMember(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Email is required", func(t *testing.T) {
		Member := entity.Member{
			Username:     "Bhuwadol Sriton", 
			Email:        "",// Empty Email for testing the required validation
			Password:     "Abcd1234",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอก Email !"))
	})

	t.Run(`Email is invalid`, func(t *testing.T) {
		Member := entity.Member{
			Username:     "Bhuwadol Sriton",
			Email:        "b6419455g.sut.ac.th",
			Password:     "Abcd1234",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Email ผิดพลาด"))	
	})

	t.Run(`Email pattern is valid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd1234",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestPasswordMember(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Password is required", func(t *testing.T) {
		Member := entity.Member{
			Username:    "Bhuwadol Sriton",
			Email:       "b6419455@g.sut.ac.th",
			Password:    "",
			Phone:       "0987654321",
			MemberImage: "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:       100,
		}

		ok, err := govalidator.ValidateStruct(Member)
		g.Expect(ok).NotTo(BeTrue())          
		g.Expect(err).NotTo(BeNil())               
		g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสผ่าน !"))  
	})

	t.Run(`Password is invalid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "*12888",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("รหัสผ่านต้องประกอบด้วยอย่างน้อย 8 ตัว"))	
	})

	t.Run(`Password pattern is valid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd1234@",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}


func TestPhone(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Phone is't number`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd1234",
			Phone:        "098765432dve",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอกเฉพาะตัวเลข 10 ตัว"))	
	})
	t.Run(`Phone is valid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd12345",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestMemberImage(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`MemberImage is't base64`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd1234",
			Phone:        "0987654321",
			MemberImage:  "102365.png",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("รูปภาพไม่ถูกต้อง กรุณาอัปโหลดรูปภาพใหม่"))	
	})
	
	t.Run(`MemberImage is valid`, func(t *testing.T) {
		Member := entity.Member{
			Username: 	  "Bhuwadol Sriton",
			Email:        "b6419455@g.sut.ac.th",
			Password:     "Abcd12345",
			Phone:        "0987654321",
			MemberImage:  "data:image/jpeg;base64,/9j/4AAQ/AndSoOn",
			Point:        100,
		}

		ok, err := govalidator.ValidateStruct(Member)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}