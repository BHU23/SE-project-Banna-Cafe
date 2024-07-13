package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
	"gorm.io/gorm/clause"
)

func CreatePayment(c *gin.Context) {
	var p entity.Payment
	var r entity.StatusPayment
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Preload(clause.Associations).Where("name = ?","รอการยืนยัน").Find(&r).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := entity.Payment{
		Image:       p.Image,
		Time:        time.Now(),
		Code:        p.Code,
		TotalAmount: p.TotalAmount,
		Point:       p.Point,
		PromotionID: p.PromotionID,
		PreorderID:  p.PreorderID,
		EmployeeID:  p.EmployeeID,
	}
	i := entity.PaymentStatus{
		PaymentID: &u.ID,
		StatusPaymentID: &r.ID,
	}
	if _, err := govalidator.ValidateStruct(u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&i).Error; err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

func CreateAccoutingByPayment(c *gin.Context) {
	var a entity.Accounting
	var r int
	var at entity.AccountType
	if err := c.ShouldBindJSON(&a); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Raw("SELECT remain_amount FROM accountings ORDER BY id desc LIMIT 1").Scan(&r).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		r = 0
		return
	}
	if err := entity.DB().Raw("SELECT * FROM account_types WHERE name = ?", "รายรับ").Scan(&at).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := entity.Accounting{
		Name:          a.Name,
		Date:          time.Now(),
		Amount:        a.Amount,
		RemainAmount:  r + a.Amount,
		PaymentID:     a.PaymentID,
		Payment:       a.Payment,
		AccountTypeID: &at.ID,
		AccountType:   at,
		EmployeeID:    a.EmployeeID,
		Employee:      a.Employee,
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

}

func GetPromotionByCode(c *gin.Context) {
	code := c.Param("code")
	var p entity.Promotion
	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM promotions WHERE code = ?", code).First(&p).RowsAffected; err == 0 {
		c.JSON(http.StatusBadGateway, gin.H{"error": "code not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func GetPreorderMenuByPreorderID(c *gin.Context) {
	id := c.Param("id")
	var p []entity.PreorderMenu
	if err := entity.DB().Preload("Preorder").Preload("Menu").Table("preorder_menus").Where("preorder_id = ?", id).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func GetEmployeeByID(c *gin.Context) {
	id := c.Param("id")
	var e entity.Employee
	if err := entity.DB().Preload("Role").Preload("Gender").Raw("SELECT * FROM employees WHERE id = ?", id).First(&e).Error; err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": e})
}

func GetPaymentByPreorderID(c *gin.Context) {
	id := c.Param("id")
	var p entity.Payment
	if err := entity.DB().Raw("SELECT * FROM payments WHERE preorder_id = ?", id).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func GetPaymentByID(c *gin.Context) {
	id := c.Param("id")
	var p entity.Payment
	if err := entity.DB().Preload(clause.Associations).
		Preload("Preorder.PreorderStatusApproves.StatusApprovePreorder").
		// Preload("Preorder.PreorderStatusRecives.").
		Preload("Preorder.Member").
		Preload("Employee").
		Where("id = ?", id).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func UpdatePayment(c *gin.Context) {
	var p entity.Payment
	var result entity.Payment
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Where("id = ?", p.ID).Find(&result); err.RowsAffected == 0 {
		c.JSON(http.StatusBadGateway, gin.H{"error": "payment not found"})
		return
	}
	p.CreatedAt = result.CreatedAt
	p.DeletedAt = result.DeletedAt

	if err := entity.DB().Table("payments").Save(&p).Error; err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func UpdatePaymentStatus(c *gin.Context) {
	var p entity.PaymentStatus
	var result entity.PaymentStatus
	var s entity.StatusPayment
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Where("id = ?", p.ID).Find(&result); err.RowsAffected == 0 {
		c.JSON(http.StatusBadGateway, gin.H{"error": "payment status not found"})
		return
	}
	p.CreatedAt = result.CreatedAt
	p.DeletedAt = result.DeletedAt
	p.StatusPaymentID = &s.ID

	if err := entity.DB().Table("payment_statuses").Save(&p).Error; err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func ListPaymentStatus(c *gin.Context) {
	var p []entity.PaymentStatus
	if err := entity.DB().Preload(clause.Associations).Preload("Payment.Promotion").
		Preload("Payment.Preorder").
		Preload("Payment.Employee").
		Preload("Payment.Preorder.PreorderStatusApproves.StatusApprovePreorder").
		Preload("Payment.Preorder.PreorderStatusRecives.StatusRecivePreorder").
		Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func GetPaymentStatus(c *gin.Context) {
	id := c.Param("id")
	var p entity.PaymentStatus
	if err := entity.DB().Preload(clause.Associations).Preload("Payment.Promotion").
		Preload("Payment.Preorder.Member").
		Preload("Payment.Employee").
		Preload("Payment.Preorder.PreorderStatusApproves.StatusApprovePreorder").
		Preload("Payment.Preorder.PreorderStatusRecives.StatusRecivePreorder").
		Where("id = ?",id).
		Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func ListStatusPayment(c *gin.Context) {
	var p []entity.StatusPayment
	if err := entity.DB().Preload(clause.Associations).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}
