package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/entity"
	"golang.org/x/crypto/bcrypt"
)

// POST /employees
func CreateEmployee(c *gin.Context) {
	var employee entity.Employee
	var role entity.Role
	var gender entity.Gender

	// bind เข้าตัวแปร employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Email ใน Member ด้วย Email
	var member []entity.Member
	if err := entity.DB().Where("email = ?", employee.Email).Find(&member).Error; err == nil && len(member) >= 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "อีเมลนี้ถูกใช้งานแล้ว"})
		return
	}
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hash password"})
	}

	// สร้าง Employee
	u := entity.Employee{
		Role:    role,
		Gender: gender,
		FirstName: employee.FirstName,
		LastName:  employee.LastName,
		Email:     employee.Email,
		Password:  string(hashPassword),
		Age:		employee.Age,
		Salary:		employee.Salary,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /employee/:id
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	if err := entity.DB().Preload("Role").Preload("Gender").Raw("SELECT * FROM employees WHERE id = ?", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /employees
func ListEmployees(c *gin.Context) {
	var employees []entity.Employee
	if err := entity.DB().Preload("Role").Preload("Gender").Raw("SELECT * FROM employees").Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employees})
}

// DELETE /employees/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /employees
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee
	var result entity.Employee

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", employee.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Email ใน Member ด้วย Email
	var member []entity.Member
	if err := entity.DB().Where("email = ?", employee.Email).Find(&member).Error; err == nil && len(member) >= 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "อีเมลนี้ถูกใช้งานแล้ว"})
		return
	}

	// เช็คว่ามีการเปลี่ยนแปลง password หรือไม่
	if employee.Password != result.Password {
		// มีการเปลี่ยนแปลง password ใหม่
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return
		}
		employee.Password = string(hashPassword)
	} else {
		// ไม่มีการเปลี่ยนแปลง password ใหม่
		employee.Password = result.Password
	}

	if err := entity.DB().Save(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /genderMale
func GenderMale(c *gin.Context) {
    var employees []struct {
        ID int `json:"id"`
    }
    if err := entity.DB().Table("employees").Select("id").Where("gender_id = ?", 1).Scan(&employees).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": employees})
}

// GET /genderFemale
func GenderFemale(c *gin.Context) {
    var employees []struct {
        ID int `json:"id"`
    }
    if err := entity.DB().Table("employees").Select("id").Where("gender_id = ?", 2).Scan(&employees).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": employees})
}

// GET /genderOther
func GenderOther(c *gin.Context) {
    var employees []struct {
        ID int `json:"id"`
    }
    if err := entity.DB().Table("employees").Select("id").Where("gender_id = ?", 3).Scan(&employees).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": employees})
}