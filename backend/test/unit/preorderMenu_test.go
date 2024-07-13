package unit

import (
	//"fmt" -> not use :D
	"testing"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut66/team08/entity"
)

func TestQuantity(t *testing.T) {

	g := NewGomegaWithT(t)

	// t.Run(`Quantity is required`, func(t *testing.T) {
	// 	preorderID := uint(1)
	// 	menuSizeID := uint(1)
	// 	sweetnessID := uint(1)
	// 	drinkOptionID := uint(1)
	// 	menuID := uint(1)
	// 	preorderMenu := entity.PreorderMenu{
	// 		Quantity: 0,
	// 		TotalCost: 129,
	// 		PreorderID: &preorderID,
	// 		MenuSizeID: &menuSizeID,
	// 		SweetnessID: &sweetnessID,
	// 		DrinkOptionID: &drinkOptionID,
	// 		MenuID: &menuID,
	// 	}

	// 	ok, err := govalidator.ValidateStruct(preorderMenu)
	// 	g.Expect(ok).NotTo(BeTrue())
	// 	g.Expect(err).NotTo(BeNil())
	// 	g.Expect(err.Error()).To(Equal("กรุณากรอก Quantity !"))	
	// })

	t.Run(`Quantity should be within the range of 0 to 20`, func(t *testing.T) {
    // Set up test data
    preorderID := uint(1)
    menuSizeID := uint(1)
    sweetnessID := uint(1)
    drinkOptionID := uint(1)
    menuID := uint(1)

    // Create PreorderMenu instance with Quantity outside the valid range
    preorderMenu := entity.PreorderMenu{
        Quantity:      25,
        // TotalCost:     129,
        PreorderID:    &preorderID,
        MenuSizeID:    &menuSizeID,
        SweetnessID:   &sweetnessID,
        DrinkOptionID: &drinkOptionID,
        MenuID:        &menuID,
    }

    // Validate the struct and check the result
    ok, err := govalidator.ValidateStruct(preorderMenu)

    // Assertions using the testing package
    g.Expect(ok).NotTo(BeTrue())    // Expecting validation to fail
    g.Expect(err).NotTo(BeNil())    // Expecting an error
    g.Expect(err.Error()).To(Equal("กรุณาเลือกจำนวนใหม่ที่อยู่ในช่วง 0 ถึง 20")) 
})

	t.Run(`Quantity pattern is valid`, func(t *testing.T) {
		preorderID := uint(1)
		menuSizeID := uint(1)
		sweetnessID := uint(1)
		drinkOptionID := uint(1)
		menuID := uint(1)
		preorderMenu := entity.PreorderMenu{
			Quantity: 2,
			// TotalCost: 129.09,
			PreorderID: &preorderID,
			MenuSizeID: &menuSizeID,
			SweetnessID: &sweetnessID,
			DrinkOptionID: &drinkOptionID,
			MenuID: &menuID,
		}

		ok, err := govalidator.ValidateStruct(preorderMenu)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

// func TestTotalCost(t *testing.T) {

// 	g := NewGomegaWithT(t)

// 	// t.Run(`TotalCost is required`, func(t *testing.T) {
// 	// 	preorderID := uint(1)
// 	// 	menuSizeID := uint(1)
// 	// 	sweetnessID := uint(1)
// 	// 	drinkOptionID := uint(1)
// 	// 	menuID := uint(1)
// 	// 	preorderMenu := entity.PreorderMenu{
// 	// 		Quantity: 1,
// 	// 		TotalCost: 0,
// 	// 		PreorderID: &preorderID,
// 	// 		MenuSizeID: &menuSizeID,
// 	// 		SweetnessID: &sweetnessID,
// 	// 		DrinkOptionID: &drinkOptionID,
// 	// 		MenuID: &menuID,
// 	// 	}

// 	// 	ok, err := govalidator.ValidateStruct(preorderMenu)
// 	// 	g.Expect(ok).NotTo(BeTrue())
// 	// 	g.Expect(err).NotTo(BeNil())
// 	// 	g.Expect(err.Error()).To(Equal("กรุณากรอก TotalCost !"))	
// 	// })

// 	t.Run(`TotalCost should have 2 decimal places`, func(t *testing.T) {
// 		preorderID := uint(1)
// 		menuSizeID := uint(1)
// 		sweetnessID := uint(1)
// 		drinkOptionID := uint(1)
// 		menuID := uint(1)

// 		preorderMenu := entity.PreorderMenu{
// 			Quantity:      2,
// 			TotalCost:     129.90,
// 			PreorderID:    &preorderID,
// 			MenuSizeID:    &menuSizeID,
// 			SweetnessID:   &sweetnessID,
// 			DrinkOptionID: &drinkOptionID,
// 			MenuID:        &menuID,
// 		}

// 		ok, err := govalidator.ValidateStruct(preorderMenu)

// 		g.Expect(ok).NotTo(BeTrue())    
// 		g.Expect(err).NotTo(BeNil())    
// 		g.Expect(err.Error()).To(Equal("TotalCost ต้องมีทศนิยม 2 ตำแหน่ง"))
// 	})

// 	t.Run(`TotalCost pattern is valid`, func(t *testing.T) {
// 		preorderID := uint(1)
// 		menuSizeID := uint(1)
// 		sweetnessID := uint(1)
// 		drinkOptionID := uint(1)
// 		menuID := uint(1)
// 		preorderMenu := entity.PreorderMenu{
// 			Quantity: 2,
// 			TotalCost: 129.90,
// 			PreorderID: &preorderID,
// 			MenuSizeID: &menuSizeID,
// 			SweetnessID: &sweetnessID,
// 			DrinkOptionID: &drinkOptionID,
// 			MenuID: &menuID,
// 		}

// 		ok, err := govalidator.ValidateStruct(preorderMenu)

// 		g.Expect(ok).To(BeTrue())
// 		g.Expect(err).To(BeNil())
// 	})

// }
