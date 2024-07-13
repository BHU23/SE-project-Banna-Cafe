package unit

import (
	//"fmt" -> not use :D
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut66/team08/entity"
)

func TestFirstName(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`FirstName is required`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "",
			LastName: "พูนประสิทธิ์",
			Email: "mean@gmail.com",
			Password: "123456",
			Age: 20,
			Salary: 20000.55,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกชื่อ !")))
	})

	t.Run(`FirstName pattern is not true`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ ศักดิ์ศรี ณ มหานครราชสีมา",
			LastName: "พูนประสิทธิ์",
			Email: "mean@gmail.com",
			Password: "123456",
			Age: 20,
			Salary: 20000.55,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("ชื่อต้องมีตัวอักษรไม่เกิน 30 ตัว")))
	})
}

func TestEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Email is required`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ",
			LastName: "พูนประสิทธิ์",
			Email: "",
			Password: "123456",
			Age: 20,
			Salary: 20000.55,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกอีเมล !")))
	})

	t.Run(`Email pattern is not true`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ",
			LastName: "พูนประสิทธิ์",
			Email: "mean.com",
			Password: "123456",
			Age: 20,
			Salary: 20000.55,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("รูปแบบอีเมลไม่ถูกต้อง")))
	})
}

func TestPassword(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Password is required`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ",
			LastName: "พูนประสิทธิ์",
			Email: "mean@gmail.com",
			Password: "",
			Age: 20,
			Salary: 20000.55,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกรหัสผ่าน !")))
	})

	t.Run(`Password pattern is not true`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ",
			LastName: "พูนประสิทธิ์",
			Email: "mean@gmail.com",
			Password: "1234",
			Age: 20,
			Salary: 20000.55,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("รหัสผ่านต้องไม่ต่ำกว่า 5 ตัว")))
	})
}

func TestAge(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Age is required`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ",
			LastName: "พูนประสิทธิ์",
			Email: "mean@gmail.com",
			Password: "12345",
			Age: 0,
			Salary: 20000.55,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกอายุ !")))
	})
}

func TestSalary(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Salary is required`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ",
			LastName: "พูนประสิทธิ์",
			Email: "mean@gmail.com",
			Password: "12345",
			Age: 20,
			Salary: 0,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกเงินเดือน !")))
	})

	t.Run(`Salary pattern is not true`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ",
			LastName: "พูนประสิทธิ์",
			Email: "mean@gmail.com",
			Password: "12345",
			Age: 20,
			Salary: 55.123,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("เงินเดือนมีทศนิยมไม่เกิน 2 ตำแหน่ง")))
	})
}

func TestEmployeeValidAll(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Employee pattern is valid all`, func(t *testing.T) {
		employee := entity.Employee{
			FirstName: "นายศิริภพ",
			LastName: "พูนประสิทธิ์",
			Email: "mean@gmail.com",
			Password: "12345",
			Age: 20,
			Salary: 20000.55,
			RoleID: 1,
			GenderID: 1, 
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}