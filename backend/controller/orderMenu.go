package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/asaskevich/govalidator"
	"github.com/sut66/team08/entity"
	
)

// GET /menus
func ListMenusByOrderTypeID(c *gin.Context) {
	var menus []entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus WHERE menu_type_id = ?", id).Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// POST //orders
func CreateOrderMenu(c *gin.Context) {
	var orderMenu entity.OrderMenu
	var order entity.Order
	var menu entity.Menu
	var menuSize entity.MenuSize
	var sweetness entity.Sweetness
	var drinkOption entity.DrinkOption
	// bind เข้าตัวแปร orderMenu
	if err := c.ShouldBindJSON(&orderMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(orderMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} 
	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.MenuID).First(&menu); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.OrderID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}
	// ค้นหา drinkOption ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.DrinkOptionID).First(&drinkOption); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drinkOption not found"})
		return
	}
	// ค้นหา menuSize ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.MenuSizeID).First(&menuSize); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuSize not found"})
		return
	}
	// ค้นหา sweetness ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.SweetnessID).First(&sweetness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sweetness not found"})
		return
	}
	

	// สร้าง orderMenu
	u := entity.OrderMenu{
		Amount:    orderMenu.Amount,
		Cost:      orderMenu.Cost,
		Note:	   "",
		Sweetness:   sweetness,
		MenuSize:    menuSize,
		DrinkOption: drinkOption,
		Order:    order,
		Menu:        menu,
		SweetnessID:   &sweetness.ID,
		MenuSizeID:    &menuSize.ID,
		DrinkOptionID: &drinkOption.ID,
		OrderID:    &order.ID,
		MenuID:        &menu.ID,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}


// GET /menuOrders
func ListGetMenuOrdersByOrderID(c *gin.Context) {
	var menuOrders []entity.OrderMenu
	id := c.Param("id")
	if err := entity.DB().Preload("Order").Preload("Menu").Preload("MenuSize").Preload("Sweetness").Preload("DrinkOption").Raw("SELECT * FROM order_menus WHERE order_id = ?", id).Find(&menuOrders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menuOrders})
}


// PATCH /orders
func UpdateOrderMenu(c *gin.Context) {
	var orderMenu entity.OrderMenu
	var existingOrderMenu entity.OrderMenu
	if err := c.ShouldBindJSON(&orderMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา order ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.ID).First(&existingOrderMenu); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	var order entity.Order
	var menu entity.Menu
	var menuSize entity.MenuSize
	var sweetness entity.Sweetness
	var drinkOption entity.DrinkOption

	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.MenuID).First(&menu); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.OrderID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}
	// ค้นหา menuSize ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.MenuSizeID).First(&menuSize); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuSize not found"})
		return
	}
	// ค้นหา sweetness ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.SweetnessID).First(&sweetness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sweetness not found"})
		return
	}
	// ค้นหา drinkOption ด้วย id
	if tx := entity.DB().Where("id = ?", orderMenu.DrinkOptionID).First(&drinkOption); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drinkOption not found"})
		return
	}

	existingOrderMenu.Amount = orderMenu.Amount
	existingOrderMenu.Cost = orderMenu.Cost
	existingOrderMenu.Note = orderMenu.Note
	existingOrderMenu.Sweetness = sweetness
	existingOrderMenu.MenuSize = menuSize
	existingOrderMenu.DrinkOption = drinkOption
	existingOrderMenu.Order = order
	existingOrderMenu.Menu = menu
	existingOrderMenu.SweetnessID = &sweetness.ID
	existingOrderMenu.MenuSizeID = &menuSize.ID
	existingOrderMenu.DrinkOptionID= &drinkOption.ID
	existingOrderMenu.OrderID = &order.ID
	existingOrderMenu.MenuID = &menu.ID

	if _, err := govalidator.ValidateStruct(existingOrderMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Save(&existingOrderMenu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": existingOrderMenu})
}

// DELETE /members/:id
func DeleteOrderMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM order_menus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "orderMenu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
