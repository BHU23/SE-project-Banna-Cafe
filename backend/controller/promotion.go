package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// POST /promotions
func CreatePromotion(c *gin.Context) {
	var promotion entity.Promotion
	var employee entity.Employee // update 4/1/2567 By nop

	// bind เข้าตัวแปร promotion
	if err := c.ShouldBindJSON(&promotion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", promotion.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "EmployeeID not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(promotion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Promotion
	p := entity.Promotion{
		Employee:   employee,             // โยงความสัมพันธ์กับ Entity Employee
		EmployeeID: promotion.EmployeeID, // more 8:58 AM 28/11/2023

		Code:        promotion.Code,
		Name:        promotion.Name,
		Image:       promotion.Image,
		TimeOfbegin: promotion.TimeOfbegin,
		TimeOfend:   promotion.TimeOfend,
		Discount:    promotion.Discount,
		DiscountPoint: promotion.DiscountPoint,
	}

	// บันทึก
	if err := entity.DB().Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": p})
}

// GET /promotion/:id
func GetPromotion(c *gin.Context) {
	var promotion entity.Promotion
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM promotions WHERE id = ?", id).Find(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": promotion})
}

// GET /lastpromotions
func GetLastPromotion(c *gin.Context) {
	var promotion entity.Promotion
	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM promotions ORDER BY id DESC LIMIT 1").Find(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": promotion})
}

// GET /promotions
func ListPromotion(c *gin.Context) {
	var promotion []entity.Promotion
	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM promotions").Find(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": promotion})
}

// GET /promotions/ready
func ListReadyPromotion(c *gin.Context) {
    var promotions []entity.Promotion
    currentTime := time.Now()
    if err := entity.DB().Preload("Employee").
        Where("time_ofbegin <= ?", currentTime).
        Where("time_ofend >= ?", currentTime).
        Find(&promotions).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": promotions})
}

// DELETE /promotions/:id
func DeletePromotion(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM promotions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "promotion not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /promotions
func UpdatePromotion(c *gin.Context) {
	var promotion entity.Promotion
	var result entity.Promotion

	if err := c.ShouldBindJSON(&promotion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา promotion ด้วย id
	if tx := entity.DB().Where("id = ?", promotion.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "promotion not found"})
		return
	}

	if err := entity.DB().Save(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": promotion})

}
