package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// GET /accountTypes
func ListAccountTypes(c *gin.Context) {
	var accountTypes []entity.AccountType
	if err := entity.DB().Raw("SELECT * FROM account_types").Scan(&accountTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": accountTypes})
}
