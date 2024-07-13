package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

// POST / A Account
func CreateAccounting(c *gin.Context) {
	var accounting entity.Accounting
	var accounttype entity.AccountType
	var paymant entity.Payment
	var employee entity.Employee

	// bind เข้าตัวแปร accounting
	if err := c.ShouldBindJSON(&accounting); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา accounttype ด้วย id
	if tx := entity.DB().Where("id = ?", accounting.AccountTypeID).First(&accounttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "AccountType not found"})
		return
	}

	// สร้าง Accounting
	u := entity.Accounting{
		Date:          accounting.Date,
		Name:          accounting.Name,
		Amount:        accounting.Amount,
		RemainAmount:  accounting.RemainAmount,
		PaymentID:     &paymant.ID,
		AccountTypeID: &accounttype.ID,
		EmployeeID:    &employee.ID,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /accounting/:id
func GetAccounting(c *gin.Context) {
	var accounting entity.Accounting
	id := c.Param("id")
	if err := entity.DB().Preload("AccountType").Raw("SELECT * FROM accountings WHERE id = ?", id).Find(&accounting).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": accounting})
}

// GET /lastaccounting
func GetLastAccounting(c *gin.Context) {
	var accounting entity.Accounting
	if err := entity.DB().Preload("AccountType").Raw("SELECT * FROM accountings ORDER BY id DESC LIMIT 1").Find(&accounting).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": accounting})
}

// GET /accounting
func ListAccounting(c *gin.Context) {
	var accountings []entity.Accounting
	if err := entity.DB().Preload("AccountType").Raw("SELECT * FROM accountings").Find(&accountings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": accountings})
}

// DELETE /accounting/:id
func DeleteAccounting(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM accountings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "accounting not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /accountings
func UpdateAccounting(c *gin.Context) {
	var accounting entity.Accounting
	var result entity.Accounting

	if err := c.ShouldBindJSON(&accounting); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", accounting.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "accounting not found"})
		return
	}

	if err := entity.DB().Save(&accounting).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": accounting})

}
