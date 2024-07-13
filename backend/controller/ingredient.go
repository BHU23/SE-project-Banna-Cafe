package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// POST /ingredients
func CreateIngredient(c *gin.Context) {
	var ingredient entity.Ingredient
	var ingredientType entity.IngredientType // update 6/12/2566 By nop
	var ingredientUnit entity.IngredientUnit // update 4/1/2567 By nop
	// var menuType entity.MenuType

	// bind เข้าตัวแปร ingredient
	if err := c.ShouldBindJSON(&ingredient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา ingredientType ด้วย id
	if tx := entity.DB().Where("id = ?", ingredient.IngredientTypeID).First(&ingredientType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientType not found"})
		return
	}
	// ค้นหา ingredientUnit ด้วย id
	if tx := entity.DB().Where("id = ?", ingredient.IngredientUnitID).First(&ingredientUnit); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientUnit not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(ingredient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Ingredient
	u := entity.Ingredient{
		IngredientType:   ingredientType,              // โยงความสัมพันธ์กับ Entity IngredientType
		IngredientTypeID: ingredient.IngredientTypeID, // more 8:58 AM 28/11/2023

		IngredientUnit:   ingredientUnit, // โยงความสัมพันธ์กับ Entity IngredientUnit
		IngredientUnitID: ingredient.IngredientUnitID,

		IngredientName:   ingredient.IngredientName,
		IngredientCost:   ingredient.IngredientCost,
		IngredientAmount: ingredient.IngredientAmount,
		IngredientImage:  ingredient.IngredientImage,
		IngredientExpert: ingredient.IngredientExpert,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /ingredient/:id
func GetIngredient(c *gin.Context) {
	var ingredient entity.Ingredient
	id := c.Param("id")
	if err := entity.DB().Preload("IngredientType").Preload("IngredientUnit").Raw("SELECT * FROM ingredients WHERE id = ?", id).Find(&ingredient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredient})
}

// GET /lastingredients
func GetLastIngredient(c *gin.Context) {
	var ingredient entity.Ingredient
	if err := entity.DB().Preload("IngredientType").Preload("IngredientUnit").Raw("SELECT * FROM ingredients ORDER BY id DESC LIMIT 1").Find(&ingredient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredient})
}

// GET /ingredients
func ListIngredients(c *gin.Context) {
	var ingredients []entity.Ingredient
	if err := entity.DB().Preload("IngredientType").Preload("IngredientUnit").Raw("SELECT * FROM ingredients").Find(&ingredients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredients})
}

// DELETE /ingredients/:id
func DeleteIngredient(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ingredients WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /ingredients
func UpdateIngredient(c *gin.Context) {
	var ingredient entity.Ingredient
	var result entity.Ingredient

	if err := c.ShouldBindJSON(&ingredient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", ingredient.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}

	if err := entity.DB().Save(&ingredient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredient})

}
