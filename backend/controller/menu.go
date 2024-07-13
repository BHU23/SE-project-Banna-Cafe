package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
	"github.com/asaskevich/govalidator"
)

// POST /menus
func CreateMenu(c *gin.Context) {
	var menu entity.Menu
	var menuType entity.MenuType

	// bind เข้าตัวแปร menu
	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา menuType ด้วย id
	if tx := entity.DB().Where("id = ?", menu.MenuTypeID).First(&menuType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuType not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Menu
	u := entity.Menu{
		MenuType:  menuType,
		MenuTypeID: menu.MenuTypeID,
		MenuID: menu.MenuID,
		MenuName:  menu.MenuName,
		MenuNameEng:  menu.MenuNameEng,
		MenuCost:  menu.MenuCost,
		MenuImage: menu.MenuImage,
		MenuStatus: menu.MenuStatus,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /menu/:id
func GetMenu(c *gin.Context) {
	var menu entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus WHERE id = ?", id).Find(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menu})
}

// GET /menus
func ListMenus(c *gin.Context) {
	var menus []entity.Menu
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus").Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// DELETE /menus/:id
func DeleteMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM menus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /menus
func UpdateMenu(c *gin.Context) {
	var menu entity.Menu
	var result entity.Menu

	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา menu ด้วย id
	if tx := entity.DB().Where("id = ?", menu.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menu})
}

// GET /menuNames/:id
func GetMenuName(c *gin.Context) {
	var menuName entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus WHERE id = ?", id).Find(&menuName).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menuName})
}

// GET /menuNames
func ListMenuNames(c *gin.Context) {
	var menuNames []entity.Menu
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus").Scan(&menuNames).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menuNames})
}

// GET /latestMenuID
func GetLatestMenuID(c *gin.Context) {
    var menu entity.Menu
    if err := entity.DB().Preload("MenuType").Order("id desc").First(&menu).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": menu.ID})
}

// GET /listActiveMenu
func ListActiveMenus(c *gin.Context) {
    var menus []struct {
        ID int `json:"id"`
    }
    if err := entity.DB().Table("menus").Select("id").Where("menu_status = ?", 1).Scan(&menus).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": menus})
}

// GET /listNoActiveMenu
func ListNoActiveMenus(c *gin.Context) {
    var menus []struct {
        ID int `json:"id"`
    }
    if err := entity.DB().Table("menus").Select("id").Where("menu_status = ?", 2).Scan(&menus).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": menus})
}

// POST /ingredientMenus
func CreateIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	var ingredient entity.Ingredient
	var menu entity.Menu
	var ingredientUnit entity.IngredientUnit

	// bind เข้าตัวแปร ingredientMenu
	if err := c.ShouldBindJSON(&ingredientMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientMenu.IngredientID).First(&ingredient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(ingredientMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง IngredientMenu
	u := entity.IngredientMenu{
		Amount:     ingredientMenu.Amount,
		IngredientID: ingredientMenu.IngredientID,
		MenuID: ingredientMenu.MenuID,
		Ingredient: ingredient,
		Menu:       menu,
		IngredientUnitID: ingredientMenu.IngredientUnitID,
		IngredientUnit: ingredientUnit,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// PATCH /ingredientMenus
func UpdateIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	var result entity.IngredientMenu

	if err := c.ShouldBindJSON(&ingredientMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("menu_id = ?", ingredientMenu.MenuID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(ingredientMenu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}	

	// Update data for ingredientMenu
	if err := entity.DB().Model(&result).Omit("id").Updates(&ingredientMenu).Error; err != nil {
    	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    	return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientMenu})
}