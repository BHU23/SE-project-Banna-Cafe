package entity
import (
	"gorm.io/gorm"
)
type PreorderStatusRecive struct {
	gorm.Model
	// FK
	PreorderID              *uint
	Preorder                Preorder `gorm:"references:id"`
	StatusRecivePreorderID *uint
	StatusRecivePreorder   StatusRecivePreorder `gorm:"references:id"`
}
