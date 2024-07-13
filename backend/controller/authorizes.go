package controller

import (
	// "fmt"
	"net/http"

	"github.com/sut66/team08/entity"
	"github.com/sut66/team08/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginPayload struct {
	Email    string `json:"email"` 
	Password string `json:"password"`
}

// logintoken response
type LoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Position string `json:"position"`
}

// get info from user email and password
func Login(c *gin.Context) {
	var payload LoginPayload
	var member entity.Member
	var employee entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Raw("SELECT * FROM members WHERE email = ?", payload.Email).Scan(&member).Error; err == nil && member.Email == payload.Email {
		// ตรวจสอบรหัสผ่าน
		err := bcrypt.CompareHashAndPassword([]byte(member.Password), []byte(payload.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error":"email or password is invalid!"})
			return
		}

		jwtWrapper := service.JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateToken(member.Email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}
		c.SetCookie("token", signedToken, 3600, "/", "localhost", false, true)
		tokenResponse := LoginResponse{
			Token:    signedToken,
			ID:       member.ID,
			Position: "Member",
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else if err := entity.DB().Preload("Role").Raw("SELECT * FROM employees WHERE email = ?", payload.Email).Scan(&employee).Error; err == nil {
		// ตรวจสอบรหัสผ่าน
		err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(payload.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "email or password is invalid!"})
			return
		}

		jwtWrapper := service.JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateToken(employee.Email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}
		var role = "Employee"
		if(employee.RoleID == 1){
			role = "Owner"
		}
		c.SetCookie("token", signedToken, 3600, "/", "localhost", false, true)		
		tokenResponse := LoginResponse{
			Token:    signedToken,
			ID:       employee.ID,
			Position: role,
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + "email or password is invalid!"})
		return
	}

}

func Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}
