package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
)

type Order struct {
	OrderID      string
	TotalAmount    float32
	TimeOfCreate time.Time
	Income float32
	Code string
	PromotionID *uint
	EmployeeID *uint
	MemberID *uint
	StatusID *uint
}

// GET /menus
func ListMenusbyMenuTypeID(c *gin.Context) {
	var menus []entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus WHERE menu_type_id = ?", id).Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// GET /menus/:name
func ListMenusbyName(c *gin.Context) {
	var menus []entity.Menu
	name := c.Param("name")
	if err := entity.DB().Raw("SELECT * FROM menus WHERE menu_name_eng LIKE ? OR menu_name LIKE ?", "%"+name+"%", "%"+name+"%").Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// POST //Orders
func CreateOrder(c *gin.Context) {
	var data Order
	var employee entity.Employee
	var promotion entity.Promotion
	var member entity.Member
	var status entity.StatusOrder

	// bind เข้าตัวแปร Orders
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", data.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// สร้าง Order
	u := entity.Order{
		TotalAmount:    data.TotalAmount,
		TimeOfCreate: 	&data.TimeOfCreate,
		Income:     	data.Income,
		Code:  			"",
		PromotionID:    &promotion.ID,
		EmployeeID: 	&employee.ID,
		MemberID: 		&member.ID,
		StatusID: 		&status.ID,
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var statusOrder entity.StatusOrder
	var order entity.Order
	// ค้นหา statusOrder ด้วย id
	if tx := entity.DB().Where("id = ?", data.StatusID).First(&statusOrder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusOrder not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", &u.ID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}
}
// GET /order/:id
func GetorderByID(c *gin.Context) {
	var order entity.Order
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM orders WHERE id = ?", id).Find(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order})
}

// GET /orderMember/:id
func GetorderStatusByMemberID(c *gin.Context) {
	var order entity.Order
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Where("member_id = ?", id).Last(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var statusOrder entity.StatusOrder
	if err := entity.DB().Preload("Order").Where("order_id = ?", order.ID).Last(&statusOrder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusOrder})
}

// GET /NeworderMember/:id
func GetNeworderByMemberID(c *gin.Context) {
	var order entity.Order
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Where("member_id = ?", id).Last(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}

// PATCH /orders
func Updateorder(c *gin.Context) {
	var order entity.Order
	var existingOrder entity.Order

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา order ด้วย id
	if tx := entity.DB().Where("id = ?", order.ID).First(&existingOrder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}

	existingOrder.TotalAmount = order.TotalAmount
	existingOrder.TimeOfCreate = order.TimeOfCreate
	existingOrder.Income = order.Income
	existingOrder.Code = order.Code
	existingOrder.PromotionID = order.PromotionID
	existingOrder.EmployeeID = order.EmployeeID
	existingOrder.MemberID = order.MemberID
	existingOrder.StatusID = order.StatusID
	

	if err := entity.DB().Save(&existingOrder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": existingOrder})
}

// func (t *LocalTime) MarshalJSON() ([]byte, error) {
//     tTime := time.Time(*t)
//     return []byte(fmt.Sprintf("\"%v\"", tTime.Format("2006-01-02 15:04:05"))), nil
// }
// POST //preorders
// func CreatePreorderStatusApprove(c *gin.Context) {
// 	var StatusApprove entity.PreorderStatusApprove
// 	var preorder entity.Preorder
// 	var statusApprovePreorder entity.StatusApprovePreorder
// 	// bind เข้าตัวแปร StatusApprove
// 	if err := c.ShouldBindJSON(&StatusApprove); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// ค้นหา preorder ด้วย id
// 	if tx := entity.DB().Where("id = ?", StatusApprove.PreorderID).First(&preorder); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
// 		return
// 	}
// 	// ค้นหา statusApprovePreorder ด้วย id
// 	if tx := entity.DB().Where("id = ?", StatusApprove.StatusApprovePreorderID).First(&statusApprovePreorder); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
// 		return
// 	}

// 	// สร้าง Menu
// 	u := entity.PreorderStatusApprove{
// 		Preorder:              preorder,
// 		StatusApprovePreorder: statusApprovePreorder,
// 	}

// 	// บันทึก
// 	if err := entity.DB().Create(&u).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": u})
// }
