package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// POST /historys
func CreateHistory(c *gin.Context) {
	var history entity.History
	var ingredient entity.Ingredient

	// bind เข้าตัวแปร history
	if err := c.ShouldBindJSON(&history); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", history.IngredientID).First(&ingredient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ingredient not found"})
		return
	}

	// สร้าง History
	u := entity.History{
		Ingredient:   ingredient,           // โยงความสัมพันธ์กับ Entity MenuType
		IngredientID: history.IngredientID, // more 8:58 AM 28/11/2023
		Amount:       history.Amount,       // ตั้งค่าฟิลด์ MenuName
		ImportDate:   history.ImportDate,   // Update 2/12/2566 By Nop
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /history/:id
func GetHistory(c *gin.Context) {
	var history entity.History
	id := c.Param("id")
	if err := entity.DB().Preload("Ingredient").Raw("SELECT * FROM histories WHERE id = ?", id).Find(&history).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": history})
}

// GET /histories
func ListHistory(c *gin.Context) {
	var history []entity.History
	if err := entity.DB().Preload("Ingredient").Raw("SELECT * FROM histories").Find(&history).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": history})
}

// DELETE /histories/:id
func DeleteHistory(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM histories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "history not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /histories
func UpdateHistory(c *gin.Context) {
	var history entity.History
	var result entity.History

	if err := c.ShouldBindJSON(&history); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา history ด้วย id
	if tx := entity.DB().Where("id = ?", history.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "history not found"})
		return
	}

	if err := entity.DB().Save(&history).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": history})
}
