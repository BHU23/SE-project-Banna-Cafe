package entity
import (
	"gorm.io/gorm"
)
type PreorderStatusApprove struct {
	gorm.Model

	// FK
	PreorderID              *uint
	Preorder                Preorder `gorm:"references:id"`
	StatusApprovePreorderID *uint
	StatusApprovePreorder   StatusApprovePreorder `gorm:"references:id"`
}