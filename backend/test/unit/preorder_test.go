package unit

import (
	//"fmt" -> not use :D
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut66/team08/entity"
)
func TestTotalAmount(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`TotalAmount is required`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    0,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("TotalAmount ต้องมากกว่า 0 กรุณาเลือกสินค้า !"))
	})

	t.Run(`TotalAmount pattern is valid`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestPickUpDateTime(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`PickUpDateTime is required`, func(t *testing.T) {
		memberID := uint(1)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    112.22,
			PickUpDateTime: nil,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกเวลารับบริการ !"))
	})

	t.Run(`PickUpDateTime should more now time 45 min`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(30 * time.Minute)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณาสั่งจองล่วงหน้าอย่างน้อย 45 นาที"))
	})

	t.Run(`PickUpDateTime pattern is valid`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}

func TestNote(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Note should not exceed 100 characters`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		longNote := "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur velit ac leo eleifend, in luctus velit efficitur. Sed consectetur dolor nec risus pharetra, quis tincidunt nunc convallis. Integer non dui nec nunc feugiat varius a ac libero."
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           longNote,
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Note ความยาวไม่เกิน 100 ตัวอักษร"))
	})

	t.Run(`Note pattern is valid`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}

func TestRespond(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Respond should not exceed 100 characters`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		longRespond := "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur velit ac leo eleifend, in luctus velit efficitur. Sed consectetur dolor nec risus pharetra, quis tincidunt nunc convallis. Integer non dui nec nunc feugiat varius a ac libero."
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        longRespond,
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Respound ความยาวไม่เกิน 100 ตัวอักษร"))
	})

	t.Run(`Respond pattern is valid`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "ได้เลยครับ",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}

func TestMemberID(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`MemberID is required`, func(t *testing.T) {
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    12.22,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       nil,
		}

		ok, err := govalidator.ValidateStruct(preorder)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Member is required !"))
	})

	t.Run(`MemberID pattern is valid`, func(t *testing.T) {
		memberID := uint(1)
		pickUpDateTime := time.Now().Add(50 * time.Minute)
		preorder := entity.Preorder{
			IDPreorder:     "0893hu",
			TotalAmount:    122.09,
			PickUpDateTime: &pickUpDateTime,
			Note:           "ไม่รับถั่ว",
			Respond:        "",
			MemberID:       &memberID,
		}

		ok, err := govalidator.ValidateStruct(preorder)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}
