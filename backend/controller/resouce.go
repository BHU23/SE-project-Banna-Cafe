package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// POST /resources
func CreateResource(c *gin.Context) {
	var resource entity.Resource

	// bind เข้าตัวแปร resource
	if err := c.ShouldBindJSON(&resource); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา menuType ด้วย id
	// if tx := entity.DB().Where("id = ?", menu.MenuTypeID).First(&menuType); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "menuType not found"})
	// 	return
	// }

	// สร้าง Resource
	u := entity.Resource{
		// Resource:  Resource, // โยงความสัมพันธ์กับ Entity Resource
		Name:    resource.Name,
		Address: resource.Address,
		Phone:   resource.Phone,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /resource/:id
func GetResource(c *gin.Context) {
	var resource entity.Resource
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM resources WHERE id = ?", id).Find(&resource).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": resource})
}

// GET /lastresources
func GetLastResource(c *gin.Context) {
	var resource entity.Resource
	if err := entity.DB().Raw("SELECT * FROM resources ORDER BY id DESC LIMIT 1").Find(&resource).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": resource})
}

// GET /resources
func ListResource(c *gin.Context) {
	var resource []entity.Resource
	if err := entity.DB().Raw("SELECT * FROM resources").Find(&resource).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": resource})
}

// DELETE /resources/:id
func DeleteResource(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM resources WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resource not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /resources
func UpdateResource(c *gin.Context) {
	var resource entity.Resource
	var result entity.Resource

	if err := c.ShouldBindJSON(&resource); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา resource ด้วย id
	if tx := entity.DB().Where("id = ?", resource.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resource not found"})
		return
	}

	if err := entity.DB().Save(&resource).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": resource})

}
