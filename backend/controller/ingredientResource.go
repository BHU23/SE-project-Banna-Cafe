package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// POST /ingredientresources
func CreateIngredientResource(c *gin.Context) {
	var ingredientresource entity.IngredientResource
	var ingredient entity.Ingredient
	var resource entity.Resource

	// bind เข้าตัวแปร ingredientresource
	if err := c.ShouldBindJSON(&ingredientresource); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientresource.IngredientID).First(&ingredient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}
	// ค้นหา resource ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientresource.ResourceID).First(&resource); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resource not found"})
		return
	}

	// สร้าง ingredientResource
	u := entity.IngredientResource{
		Ingredient:   ingredient,                      // โยงความสัมพันธ์กับ Entity MenuType
		IngredientID: ingredientresource.IngredientID, // more 8:58 AM 28/11/2023
		Resource:     resource,
		ResourceID:   ingredientresource.ResourceID,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /ingredientresource/:id
func GetIngredientResource(c *gin.Context) {
	var ingredientresource entity.IngredientResource
	id := c.Param("id")
	if err := entity.DB().Preload("Ingredient").Preload("Resource").Raw("SELECT * FROM ingredient_resources WHERE id = ?", id).Find(&ingredientresource).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientresource})
}

// GET /ingredientresources
func ListIngredientResource(c *gin.Context) {
	var ingredientresource []entity.IngredientResource
	if err := entity.DB().Preload("Ingredient").Preload("Resource").Raw("SELECT * FROM ingredient_resources").Find(&ingredientresource).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientresource})
}

// DELETE /ingredientresources/:id
func DeleteIngredientResource(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ingredient_resources WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient_resource not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /ingredientresources
func UpdateIngredientResource(c *gin.Context) {
	var ingredientresource entity.IngredientResource
	var result entity.IngredientResource

	if err := c.ShouldBindJSON(&ingredientresource); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา ingredientresource ด้วย id
	if tx := entity.DB().Where("id = ?", ingredientresource.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredientResource not found"})
		return
	}

	if err := entity.DB().Save(&ingredientresource).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientresource})
}
