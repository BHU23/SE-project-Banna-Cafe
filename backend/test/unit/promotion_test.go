package unit

import (
	//"fmt" -> not use :D
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut66/team08/entity"
)

func TestCode(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`promotion_code is required`, func(t *testing.T) {
		timeOfbegin, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		timeOfend, err := time.Parse(time.RFC3339, "2024-02-13T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}

		promotion := entity.Promotion{
			Code:        "",
			Name:        "สวัสดีปีใหม่",
			Image:       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			TimeOfbegin: timeOfbegin,
			TimeOfend:   timeOfend,
			Discount:    10,
			EmployeeID:  1,
		}

		ok, err := govalidator.ValidateStruct(promotion)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกรหัสโปรโมชั่น!")))
	})
}
func TestName(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`promotion_name is required`, func(t *testing.T) {
		timeOfbegin, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		timeOfend, err := time.Parse(time.RFC3339, "2024-02-13T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}

		promotion := entity.Promotion{
			Code:        "Luck99",
			Name:        "",
			Image:       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			TimeOfbegin: timeOfbegin,
			TimeOfend:   timeOfend,
			Discount:    10,
			EmployeeID:  1,
		}

		ok, err := govalidator.ValidateStruct(promotion)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกชื่อโปรโมชั่น!")))
	})
}
func TestImage(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`promotion_image is required`, func(t *testing.T) {
		timeOfbegin, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		timeOfend, err := time.Parse(time.RFC3339, "2024-02-13T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}

		promotion := entity.Promotion{
			Code:        "Luck99",
			Name:        "สวัสดีปีใหม่",
			Image:       "",
			TimeOfbegin: timeOfbegin,
			TimeOfend:   timeOfend,
			Discount:    10,
			EmployeeID:  1,
		}

		ok, err := govalidator.ValidateStruct(promotion)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณาอัพโหลดรูป!")))
	})
}
func TestTimeOfbegin(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`promotion_TimeOfbegin is required`, func(t *testing.T) {
		timeOfend, err := time.Parse(time.RFC3339, "2024-02-13T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}

		promotion := entity.Promotion{
			Code:        "Luck99",
			Name:        "สวัสดีปีใหม่",
			Image:       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			TimeOfbegin: time.Time{},
			TimeOfend:   timeOfend,
			Discount:    10,
			EmployeeID:  1,
		}

		ok, err := govalidator.ValidateStruct(promotion)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณาเลือกวันเริ่มโปรโมชั่น!")))
	})
}
func TestTimeOfend(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`promotion_TimeOfend is required`, func(t *testing.T) {
		timeOfbegfin, err := time.Parse(time.RFC3339, "2024-02-13T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}

		promotion := entity.Promotion{
			Code:        "Luck99",
			Name:        "สวัสดีปีใหม่",
			Image:       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			TimeOfbegin: timeOfbegfin,
			TimeOfend:   time.Time{},
			Discount:    10,
			EmployeeID:  1,
		}

		ok, err := govalidator.ValidateStruct(promotion)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณาเลือกวันสิ้นสุดโปรโมชั่น!")))
	})
}
func TestDiscount(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`promotion_Discount is required`, func(t *testing.T) {
		timeOfbegin, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		timeOfend, err := time.Parse(time.RFC3339, "2024-02-13T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}

		promotion := entity.Promotion{
			Code:        "Luck99",
			Name:        "สวัสดีปีใหม่",
			Image:       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			TimeOfbegin: timeOfbegin,
			TimeOfend:   timeOfend,
			Discount:    0,
			EmployeeID:  1,
		}

		ok, err := govalidator.ValidateStruct(promotion)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกส่วนลด!")))
	})
}