package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// GET /menuTypes
func ListMenuTypes(c *gin.Context) {
	var menuTypes []entity.MenuType
	if err := entity.DB().Raw("SELECT * FROM menu_types").Scan(&menuTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menuTypes})
}