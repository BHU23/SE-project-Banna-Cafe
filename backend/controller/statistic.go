package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// GET /countMenu
func CountRows(c *gin.Context) {
	var count int64

	if err := entity.DB().Table("menus").Count(&count).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": count})
}

// GET /countEmployee
func CountRowsEm(c *gin.Context) {
	var count int64

	if err := entity.DB().Table("employees").Count(&count).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": count})
}

// GET /countMember
func CountRowMembers(c *gin.Context) {
	var count int64

	if err := entity.DB().Table("members").Count(&count).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": count})
}

// GET /countIngredient
func CountRowIngredients(c *gin.Context) {
	var count int64

	if err := entity.DB().Table("ingredients").Count(&count).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": count})
}

// GET /countPromotion
func CountRowPromotions(c *gin.Context) {
	var count int64

	if err := entity.DB().Table("promotions").Count(&count).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": count})
}