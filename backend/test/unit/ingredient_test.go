package unit

import (
	//"fmt" -> not use :D
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut66/team08/entity"
)

func TestIngredientName(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ingredient_name is required`, func(t *testing.T) {
		expertTime, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		ingredient := entity.Ingredient{
			IngredientName:   "",
			IngredientCost:   45,
			IngredientAmount: 100,
			IngredientImage:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			IngredientExpert: expertTime,
			IngredientTypeID: 1,
			IngredientUnitID: 1,
		}

		ok, err := govalidator.ValidateStruct(ingredient)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกชื่อวัตถุดิบ !")))
	})
}

func TestIngredientCost(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ingredient_cost is required`, func(t *testing.T) {
		expertTime, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		ingredient := entity.Ingredient{
			IngredientName:   "ผงชาไทย",
			IngredientCost:   0,
			IngredientAmount: 100,
			IngredientImage:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			IngredientExpert: expertTime,
			IngredientTypeID: 1,
			IngredientUnitID: 1,
		}

		ok, err := govalidator.ValidateStruct(ingredient)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกราคาวัตถุดิบ !")))
	})
}

func TestIngredientAmount(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ingredient_amount is required`, func(t *testing.T) {
		expertTime, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		ingredient := entity.Ingredient{
			IngredientName:   "ผงชาเขียว",
			IngredientCost:   50,
			IngredientAmount: 0,
			IngredientImage:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			IngredientExpert: expertTime,
			IngredientTypeID: 1,
			IngredientUnitID: 1,
		}

		ok, err := govalidator.ValidateStruct(ingredient)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกจำนวนวัตถุดิบ !")))
	})

}

func TestIngredientImage(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ingredient_image is required`, func(t *testing.T) {
		expertTime, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		ingredient := entity.Ingredient{
			IngredientName:   "ผงชามะนาว",
			IngredientCost:   50,
			IngredientAmount: 1,
			IngredientImage:  "",
			IngredientExpert: expertTime,
			IngredientTypeID: 1,
			IngredientUnitID: 1,
		}

		ok, err := govalidator.ValidateStruct(ingredient)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("please upload picture !")))
	})
}

func TestIngredientExpert(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ingredient_expert is required`, func(t *testing.T) {

		ingredient := entity.Ingredient{
			IngredientName:   "ผงชามะนาว",
			IngredientCost:   50,
			IngredientAmount: 1,
			IngredientImage:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			IngredientExpert: time.Time{},
			IngredientTypeID: 1,
			IngredientUnitID: 1,
		}

		ok, err := govalidator.ValidateStruct(ingredient)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณาเลือกวันหมดอายุ !")))
	})
}

func TestIngredientTypeID(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ingredient_TypeID is required`, func(t *testing.T) {
		expertTime, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		ingredient := entity.Ingredient{
			IngredientName:   "ผงชามะนาว",
			IngredientCost:   50,
			IngredientAmount: 1,
			IngredientImage:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			IngredientExpert: expertTime,
			IngredientTypeID: 0,
			IngredientUnitID: 1,
		}

		ok, err := govalidator.ValidateStruct(ingredient)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณาเลือกประเภทวัตถุดิบ !")))
	})
}

func TestIngredientUnitID(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ingredient_TypeID is required`, func(t *testing.T) {
		expertTime, err := time.Parse(time.RFC3339, "2024-02-09T07:14:38.139Z")
		if err != nil {
			t.Fatalf("Error parsing expert time: %v", err)
		}
		ingredient := entity.Ingredient{
			IngredientName:   "ผงชามะนาว",
			IngredientCost:   50,
			IngredientAmount: 1,
			IngredientImage:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...",
			IngredientExpert: expertTime,
			IngredientTypeID: 1,
			IngredientUnitID: 0,
		}

		ok, err := govalidator.ValidateStruct(ingredient)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณาเลือกหน่วยวัตถุดิบ !")))
	})
}
