package entity
import (
	"gorm.io/gorm"
)
type StatusApprovePreorder struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	PreorderStatusApproves []PreorderStatusApprove `gorm:"foreignKey:StatusApprovePreorderID"`
}