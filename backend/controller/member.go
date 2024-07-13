package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
	"golang.org/x/crypto/bcrypt"
)

// POST /members
func CreateMember(c *gin.Context) {
	var member entity.Member

	// bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Member
	u := entity.Member{
		Username:    member.Username,
		Email:       member.Email,
		Password:    member.Password,
		Phone:       member.Phone,
		MemberImage: member.MemberImage,
		Point:       member.Point,
	}

	if _, err := govalidator.ValidateStruct(u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /member/:id
func GetMember(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// GET /members
func ListMembers(c *gin.Context) {
	var members []entity.Member
	if err := entity.DB().Raw("SELECT * FROM members").Find(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": members})
}

// DELETE /members/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /members
func UpdateMember(c *gin.Context) {
	var member entity.Member
	var existingMember entity.Member

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา email ใน Employee ด้วย email
	var employee []entity.Employee
	if err := entity.DB().Where("email = ?", member.Email).Find(&employee).Error; err == nil && len(employee) >= 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "อีเมลนี้ถูกใช้งานแล้ว"})
		return
	}
	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", member.ID).First(&existingMember); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	if _, err := govalidator.ValidateStruct(member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// เช็คว่ามีการเปลี่ยนแปลง password หรือไม่
	if member.Password != existingMember.Password {
		// มีการเปลี่ยนแปลง password ใหม่
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(member.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return
		}
		member.Password = string(hashPassword)
	} else {
		// ไม่มีการเปลี่ยนแปลง password ใหม่
		member.Password = existingMember.Password
	}
	existingMember.Email = member.Email
	existingMember.MemberImage = member.MemberImage
	existingMember.Password = member.Password
	existingMember.Phone = member.Phone
	existingMember.Point = member.Point
	existingMember.Username = member.Username

	

	if err := entity.DB().Save(&existingMember).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": existingMember})
}

// POST /membersRegister
func CreateMemberRegister(c *gin.Context) {
	var member entity.Member

	// bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา email ใน Employee ด้วย email
	var employee []entity.Employee
	if err := entity.DB().Where("email = ?", member.Email).Find(&employee).Error; err == nil && len(employee) >= 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email ถูกใช้งานแล้ว"})
		return
	}
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(member.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hash password"})
	}

	// สร้าง member
	members := entity.Member{
		Username: member.Username,
		Email:    member.Email,
		Password: string(hashPassword),
	}

	// บันทึก
	if err := entity.DB().Create(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": members})
}

// GET /member/:id
func GetMemberByID(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}
