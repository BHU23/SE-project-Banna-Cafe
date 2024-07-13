package unit

import (
	//"fmt" -> not use :D
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut66/team08/entity"
)

func TestMenuName(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`menu_name is required`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "", // incorrect :( -> null
			MenuNameEng: "Black Coffee",
			MenuCost:    55.55,
			MenuImage:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกชื่อเมนู !")))
	})

	t.Run(`menu_name pattern is not true`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "กาแฟดำที่อร่อยที่สุดในสามโลก กินแล้วสุขภาพดี", // incorrect :( -> longest > 50
			MenuNameEng: "Black Coffee",
			MenuCost:    55.55,
			MenuImage:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		// g.Expect(err.Error()).To(Equal(fmt.Sprintf("MenuName: %s does not validate as maxstringlength(50)", menu.MenuName)))
		g.Expect(err.Error()).To(Equal(("ชื่อเมนูต้องมีตัวอักษรไม่เกิน 30 ตัว")))
	})
}

func TestMenuCost(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`menu_cost is required`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "โกโก้",
			MenuNameEng: "CoCoa",
			MenuCost:    0, // incorrect :( -> null
			MenuImage:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("กรุณากรอกเป็นเลขทศนิยม !")))
	})

	t.Run(`menu_cost pattern is not true`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "โกโก้",
			MenuNameEng: "CoCoa",
			MenuCost:    55.123, // incorrect :( -> decimal > .xx (2)
			MenuImage:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(("ราคามีทศนิยมไม่เกิน 2 ตำแหน่ง")))
	})

}

func TestMenuValidAll(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Menu pattern is valid all`, func(t *testing.T) {
		menu := entity.Menu{
			MenuID:      1,
			MenuName:    "ชาเขียว",
			MenuNameEng: "Green Tea",
			MenuCost:    55.05,
			MenuImage:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAGmCAYAAADcRps...", // longtext
			MenuStatus:  1,
			MenuTypeID:  1,
		}

		ok, err := govalidator.ValidateStruct(menu)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}

func TestAmountIngredient(t *testing.T) {
	
	g := NewGomegaWithT(t)
	
	t.Run(`Amount is required`, func(t *testing.T) {
		ingredientMenu := entity.IngredientMenu{
			MenuID: 1,
			IngredientID: 2,
			IngredientUnitID: 3,
			Amount: 0, // incorrect
		}

		ok, err := govalidator.ValidateStruct(ingredientMenu)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(("กรุณากรอกจำนวนวัตถุดิบ !")))
	})

	t.Run(`Amount pattern is not true`, func(t *testing.T) {
		ingredientMenu := entity.IngredientMenu{
			MenuID: 1,
			IngredientID: 2,
			IngredientUnitID: 3,
			Amount: 99999, // incorrect
		}

		ok, err := govalidator.ValidateStruct(ingredientMenu)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(("จำนวนวัตถุดิบต้องมีตั้งแต่ 1 จำนวนขึ้นไป และมีจำนวนไม่เกิน 4 หลัก")))
	})

	t.Run(`Amount pattern is valid all`, func(t *testing.T) {
		ingredientMenu := entity.IngredientMenu{
			MenuID: 1,
			IngredientID: 2,
			IngredientUnitID: 3,
			Amount: 1,
		}

		ok, err := govalidator.ValidateStruct(ingredientMenu)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
		// g.Expect(err.Error()).To(Equal(("")))
	})
}