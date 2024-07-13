package controller

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
	"gorm.io/gorm/clause"
)

type preorderPayload struct {
	PreoderID               string
	TotalAmount             float32
	PickUpDateTime          time.Time
	Note                    string
	Respound                string
	MemberID                *uint
	StatusApprovePreorderID *uint
	StatusRecivePreorderID  *uint
}

// GET /menus
func ListMenusByMenuTypeID(c *gin.Context) {
	var menus []entity.Menu
	id := c.Param("id")
	if err := entity.DB().Preload("MenuType").Raw("SELECT * FROM menus WHERE menu_type_id = ?", id).Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

// GET /menus/:name
func ListMenusByName(c *gin.Context) {
	var menus []entity.Menu
	name := c.Param("name")
	if err := entity.DB().Raw("SELECT * FROM menus WHERE menu_name_eng LIKE ? OR menu_name LIKE ?", "%"+name+"%", "%"+name+"%").Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func generateRandomPreorderID(length int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}

func isPreorderIDUnique(id string, usedIDs map[string]bool) bool {
	_, exists := usedIDs[id]
	return !exists
}

// POST //preorders
func CreatePreorder(c *gin.Context) {
	var data preorderPayload
	var member entity.Member

	// bind เข้าตัวแปร preorders
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", data.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	if _, err := govalidator.ValidateStruct(data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Preorder
	u := entity.Preorder{
		IDPreorder:     "",
		TotalAmount:    data.TotalAmount,
		PickUpDateTime: &data.PickUpDateTime,
		Note:           data.Note,
		Respond:        "",
		Member:         member,
		MemberID:       &member.ID,
	}

	usedIDs := make(map[string]bool)

	for {
		IDPreorder := generateRandomPreorderID(7)
		if isPreorderIDUnique(IDPreorder, usedIDs) {
			usedIDs[IDPreorder] = true
			u.IDPreorder = IDPreorder

			fmt.Printf("Generated Preorder ID: %s\n", u.IDPreorder)
			break
		}
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var statusApprovePreorder entity.StatusApprovePreorder
	var preorder entity.Preorder
	// ค้นหา statusApprovePreorder ด้วย id
	if tx := entity.DB().Where("id = ?", data.StatusApprovePreorderID).First(&statusApprovePreorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusApprovePreorder not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", &u.ID).First(&preorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}

	// สร้าง Menu
	pa := entity.PreorderStatusApprove{
		Preorder:                preorder,
		PreorderID:              &preorder.ID,
		StatusApprovePreorder:   statusApprovePreorder,
		StatusApprovePreorderID: &statusApprovePreorder.ID,
	}
	if _, err := govalidator.ValidateStruct(pa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// บันทึก
	if err := entity.DB().Create(&pa).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var statusRecivePreorder entity.StatusRecivePreorder
	// ค้นหา statusRecivePreorder ด้วย id
	if tx := entity.DB().Where("id = ?", data.StatusRecivePreorderID).First(&statusRecivePreorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusRecivePreorder not found"})
		return
	}

	// สร้าง statusRecivePreorder
	pr := entity.PreorderStatusRecive{
		Preorder:               preorder,
		PreorderID:             &preorder.ID,
		StatusRecivePreorder:   statusRecivePreorder,
		StatusRecivePreorderID: &statusRecivePreorder.ID,
	}
	if _, err := govalidator.ValidateStruct(pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// บันทึก
	if err := entity.DB().Create(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": gin.H{"preoder": u, "preorderStatusApprove": pa, "preorderStatusRecive": pr}})
}

// GET /preorder/:id
func GetPreorderByID(c *gin.Context) {
	var preorder entity.Preorder
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM preorders WHERE id = ?", id).Find(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": preorder})
}

// GET /preorderMember/:id
func GetPreorderStatusPaymentByMemberID(c *gin.Context) {
	var preorder entity.Preorder
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Where("member_id = ?", id).Last(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var payment entity.Payment
	if err := entity.DB().Preload("Preorder").Where("preorder_id = ?", preorder.ID).Last(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// var paymentStatus entity.PaymentStatus 
	// if err := entity.DB().Preload("Payment").Preload("StatusPayment").Where("id = ?", payment.ID).Last(&paymentStatus).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// } 
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /NewpreorderMember/:id
func GetNewPreorderByMemberID(c *gin.Context) {
	var preorder entity.Preorder
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Where("member_id = ?", id).Last(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": preorder})
}

// PATCH /preorders
func UpdatePreorder(c *gin.Context) {
	var preorder entity.Preorder
	var existingPreorder entity.Preorder

	if err := c.ShouldBindJSON(&preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	preorder.TotalAmount = float32(int(preorder.TotalAmount*100)) / 100
	// ค้นหา preorder ด้วย id
	if tx := entity.DB().Where("id = ?", preorder.ID).First(&existingPreorder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}
	dayOfMonth := preorder.PickUpDateTime.Day()
	newPickUpDateTime := preorder.PickUpDateTime.Add(-17 * time.Hour)
	daynewdate := newPickUpDateTime.Day()
	newPickUpDateTime = newPickUpDateTime.AddDate(0, 0, -daynewdate)
	newPickUpDateTime = newPickUpDateTime.AddDate(0, 0, dayOfMonth)
	existingPreorder.PickUpDateTime = &newPickUpDateTime

	existingPreorder.IDPreorder = preorder.IDPreorder
	existingPreorder.Note = preorder.Note
	existingPreorder.Respond = preorder.Respond
	existingPreorder.Member = preorder.Member
	existingPreorder.MemberID = preorder.MemberID
	existingPreorder.TotalAmount = preorder.TotalAmount

	if _, err := govalidator.ValidateStruct(preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Save(&existingPreorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": existingPreorder})
}

// GET /paymentByMember/:id
func GetPaymentByMember(c *gin.Context) {
	var payments []entity.Payment
	id := c.Param("id")
	if err := entity.DB().
		Preload("Preorder").Preload("Promotion").
		Where("preorder_id IN (SELECT id FROM preorders WHERE member_id = ?)", id).
		Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payments})
}

// GET /statusApproves/:id
func GetStatusApproves(c *gin.Context) {
	var statusApproves []entity.StatusApprovePreorder
	if err := entity.DB().Raw("SELECT * FROM status_approves").Find(&statusApproves).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusApproves})
}

// GET /statusReceives/:id
func GetStatusReceives(c *gin.Context) {
	var statusReceives []entity.StatusRecivePreorder
	if err := entity.DB().Raw("SELECT * FROM status_receives").Find(&statusReceives).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusReceives})
}

// GET /preorderStatusApprove/preorder/:id
func GetPreorderStatusApproveByMemberID(c *gin.Context) {
	var preorderStatusApprove []entity.PreorderStatusApprove
	id := c.Param("id")
	if err := entity.DB().
		Preload("Preorder").Preload("StatusApprovePreorder").
		Where("preorder_id IN (SELECT id FROM preorders WHERE member_id = ?)", id).
		Find(&preorderStatusApprove).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": preorderStatusApprove})
}

// GET /preorderStatusRecive/preorder/:id
func GetPreorderStatusReciveByMemberID(c *gin.Context) {
	var preorderStatusRecive []entity.PreorderStatusRecive
	id := c.Param("id")
	if err := entity.DB().
		Preload("Preorder").Preload("StatusRecivePreorder").
		Where("preorder_id IN (SELECT id FROM preorders WHERE member_id = ?)", id).
		Find(&preorderStatusRecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": preorderStatusRecive})
}

// DELETE /members/:id
func DeletePreorde(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM preorders WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Ball//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

func ListPreorderStatusRecive(c *gin.Context) {
	var p []entity.PreorderStatusRecive
	if err := entity.DB().Preload(clause.Associations).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

// func ListMPByID(c *gin.Context) {
// 	i := c.Param("id")
// 	var mp struct {
// 		PreorderID    int    `json:"PreorderID"`
// 		PickupTime    string `json:"PickupTime"`
// 		ApproveStatus string `json:"ApproveStatus"`
// 		ReceiveStatus string `json:"ReceiveStatus"`
// 		Price         int    `json:"Price"`
// 		MemberID      string `json:"MemberID"`
// 		MemberName    string `json:"MemberName"`
// 		Slipt         string `json:"Slipt"`
// 		Respond       string `json:"Respond"`
// 		Note          string `json:"Note"`
// 	}
// 	query := fmt.Sprint("SELECT preorders.id as PreorderID,preorders.pick_up_date_time as PickupTime,status_approve_preorders.name as ApproveStatus,status_recive_preorders.name as ReceiveStatus,payments.total_amount as Price,members.id as MemberID,payments.image as Slipt,username as MemberName,respond as Respond,note ",
// 		"FROM preorders ",
// 		"JOIN members ON preorders.member_id = members.id ",
// 		"JOIN preorder_status_approves ON preorder_status_approves.preorder_id = preorders.id ",
// 		"JOIN status_approve_preorders ON status_approve_preorders.id = preorder_status_approves.status_approve_preorder_id ",
// 		"JOIN preorder_status_recives ON preorder_status_recives.preorder_id = preorders.id ",
// 		"JOIN status_recive_preorders ON status_recive_preorders.id = preorder_status_recives.status_recive_preorder_id ",
// 		"JOIN payments ON payments.preorder_id = preorders.id ",
// 		"WHERE preorders.id = ", i)
// 	if err := entity.DB().Raw(query).Scan(&mp).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": mp})
// }

func GetPaymentBiID(c *gin.Context) {
	i := c.Param("id")
	var mp struct {
		PreorderID    int    `json:"PreorderID"`
		PickupTime    string `json:"PickupTime"`
		ApproveStatus string `json:"ApproveStatus"`
		ReceiveStatus string `json:"ReceiveStatus"`
		Price         int    `json:"Price"`
		MemberID      string `json:"MemberID"`
		MemberName    string `json:"MemberName"`
		Slipt         string `json:"Slipt"`
		Respond       string `json:"Respond"`
		Note          string `json:"Note"`
	}
	query := fmt.Sprint("SELECT preorders.id as PreorderID,preorders.pick_up_date_time as PickupTime,status_approve_preorders.name as ApproveStatus,status_recive_preorders.name as ReceiveStatus,payments.total_amount as Price,members.id as MemberID,payments.image as Slipt,username as MemberName,respond as Respond,note ",
		"FROM preorders ",
		"JOIN members ON preorders.member_id = members.id ",
		"JOIN preorder_status_approves ON preorder_status_approves.preorder_id = preorders.id ",
		"JOIN status_approve_preorders ON status_approve_preorders.id = preorder_status_approves.status_approve_preorder_id ",
		"JOIN preorder_status_recives ON preorder_status_recives.preorder_id = preorders.id ",
		"JOIN status_recive_preorders ON status_recive_preorders.id = preorder_status_recives.status_recive_preorder_id ",
		"JOIN payments ON payments.preorder_id = preorders.id ",
		"WHERE preorders.id = ", i)
	if err := entity.DB().Raw(query).Scan(&mp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mp})
}

func GetPreOrderByID(c *gin.Context) {
	i := c.Param("id")
	var p entity.Preorder
	if err := entity.DB().Preload("Member").Preload("PreorderStatusApproves").Preload("PreorderStatusRecives").Raw("SELECT * FROM preorders WHERE id = ?", i).First(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}
func GetStatusReveivesPreorderByPreorderID(c *gin.Context) {
	i := c.Param("id")
	var p entity.PreorderStatusRecive
	if err := entity.DB().Preload("Preorder").Preload("StatusRecivePreorder").Raw("SELECT * FROM preorder_status_recives WHERE preorder_id = ?", i).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

func UpdatePreOrder(c *gin.Context) {
	var preorder entity.Preorder
	var result entity.Preorder

	if err := c.ShouldBindJSON(&preorder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Raw("Select * FROM preorders WHERE id = ?", preorder.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "preorder not found"})
		return
	}
	preorder.PickUpDateTime = result.PickUpDateTime
	preorder.CreatedAt = result.CreatedAt

	if err := entity.DB().Table("preorders").Save(&preorder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": preorder})
}

func UpdatePreorderStatusRecive(c *gin.Context) {
	var s entity.PreorderStatusRecive
	var result entity.PreorderStatusRecive
	// var d entity.StatusRecivePreorder

	if err := c.ShouldBindJSON(&s); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error1": err.Error()})
		return
	}

	if er := entity.DB().Raw("Select * FROM preorder_status_recives WHERE id = ?", s.ID).First(&result).Error; er != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error2": er.Error()})
		return
	}

	// if err := entity.DB().Raw("Select * FROM status_receive_preorders WHERE id = 2").Scan(&d).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error3": err.Error()})
	// 	return
	// }

	s.CreatedAt = result.CreatedAt
	s.Preorder = result.Preorder
	s.PreorderID = result.PreorderID
	// s.StatusReceivePreorder = d
	// s.StatusReceivePreorderID = &d.ID

	if err := entity.DB().Table("preorder_status_recives").Save(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error4": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": s})
}

func UpdatePreorderStatusApprove(c *gin.Context) {
	var s entity.PreorderStatusApprove
	var result entity.PreorderStatusApprove
	// var d entity.StatusRecivePreorder

	if err := c.ShouldBindJSON(&s); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error1": err.Error()})
		return
	}

	if er := entity.DB().Raw("Select * FROM preorder_status_approves WHERE id = ?", s.ID).First(&result).Error; er != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error2": er.Error()})
		return
	}

	// if err := entity.DB().Raw("Select * FROM status_receive_preorders WHERE id = 2").Scan(&d).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error3": err.Error()})
	// 	return
	// }

	s.CreatedAt = result.CreatedAt
	s.Preorder = result.Preorder
	s.PreorderID = result.PreorderID
	// s.StatusReceivePreorder = d
	// s.StatusReceivePreorderID = &d.ID

	if err := entity.DB().Table("preorder_status_approves").Save(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error4": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": s})
}

func ListStatusReceive(c *gin.Context) {
	var p []entity.StatusRecivePreorder
	if err := entity.DB().Preload(clause.Associations).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}
func ListStatusApprove(c *gin.Context) {
	var p []entity.StatusApprovePreorder
	if err := entity.DB().Preload(clause.Associations).Find(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p})
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Ball//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
