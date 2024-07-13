package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// GET /ingredunits
func ListIngredientUnits(c *gin.Context) {
	var ingredientUnits []entity.IngredientUnit
	if err := entity.DB().Raw("SELECT * FROM ingredient_units").Scan(&ingredientUnits).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ingredientUnits})
}
