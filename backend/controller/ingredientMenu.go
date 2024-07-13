package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// GET /ingredientMenu/:id
func GetIngredientMenu(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM ingredient_menus WHERE menu_id = ?", id).Find(&ingredientMenu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientMenu})
}

// GET /ingredientMenus
func ListIngredientMenus(c *gin.Context) {
	var ingredientMenus []entity.IngredientMenu
	id := c.Param("id")
	if err := entity.DB().Preload("IngredientUnit").Preload("Ingredient").Preload("Menu").Raw("SELECT * FROM ingredient_menus WHERE menu_id = ?", id).Find(&ingredientMenus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientMenus})
} // 19/12/2023

// DELETE /ingredientMenus/:id
func DeleteIngredientMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ingredient_menus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// DELETE /ingredientMenus/:id
func DeleteIngredientMenuSet(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ingredient_menus WHERE menu_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientMenu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
} // more

// POST /ingredientMenus
func CreateIngredientMenuByMenuName(c *gin.Context) {
	var ingredientMenu entity.IngredientMenu
	var ingredient entity.Ingredient
	var menuName entity.Menu
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

	// ค้นหา menuName ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientMenu.MenuID).First(&menuName); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menuName not found"})
		return
	}

	// สร้าง IngredientMenu
	u := entity.IngredientMenu{
		Amount:     ingredientMenu.Amount,
		IngredientID: ingredientMenu.IngredientID,
		MenuID: ingredientMenu.MenuID,
		Ingredient: ingredient,
		Menu:       menuName,
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