package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	// "time"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("se-project.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	database.AutoMigrate(
		&Ingredient{},
		&Resource{},
		&IngredientResource{},
		&IngredientType{},
		&History{},
		&IngredientMenu{},
		// &OrderMenu{},
		// &Order{},
		&Menu{},
		&MenuType{},
		&Employee{},
		&Role{},
		&Promotion{},
		&Rating{},
		&Member{},
		&Gender{},
		&Preorder{},
		&PreorderMenu{},
		&PreorderStatusApprove{},
		&StatusApprovePreorder{},
		&PreorderStatusRecive{},
		&StatusRecivePreorder{},
		&DrinkOption{},
		&Sweetness{},
		&MenuSize{},
		&Payment{},
		&PaymentStatus{},
		&StatusPayment{},
		&Accounting{},
		&AccountType{},
	)
	db = database

	// MenuType Data: Ok
	menuType := []MenuType{
		{TypeName: "กาแฟ"},
		{TypeName: "ชา & นม"},
		{TypeName: "ผลไม้"},
		{TypeName: "เค้ก & เบเกอรี่"},
		{TypeName: "สำเร็จรูป"},
	}
	db.Create(&menuType) // Assuming 'db' is your GORM database instance

	// IngredientUnit Data: เหลือเพิ่ม
	ingredientUnit := []IngredientUnit{
		{UnitName: "กรัม"},
		{UnitName: "กิโลกรัม"},
		{UnitName: "ซอง"},
		{UnitName: "ชิ้น"},
		{UnitName: "ถุง"},
	}
	db.Create(&ingredientUnit) // Assuming 'db' is your GORM database instance

	// Role Data: Ok
	role := []Role{
		{RoleName: "Owner"},
		{RoleName: "Employee"},
	}
	db.Create(&role) // Assuming 'db' is your GORM database instance

	// Gender Data: Ok
	gender := []Gender{
		{GenderName: "ชาย"},
		{GenderName: "หญิง"},
		{GenderName: "เพศอื่น ๆ"},
	}
	db.Create(&gender) // Assuming 'db' is your GORM database instance

	// Employee Data: Ok
	employee := []Employee{
		{
			FirstName: "นายศิริ",
			LastName:  "พูนศรี",
			Email:     "siri@gmail.com",
			Password:  "$2a$14$ipdyBoruELybDnsJpitNE.IZIhWhMk8V92LtNXYgZDau1PRrTWLS6",
			Age:       21,
			Salary:    55000.55,
			RoleID:    1,
			GenderID:  3,
		},
		{
			FirstName: "นายศิริภพ",
			LastName:  "พูนประสิทธิ์",
			Email:     "mean@gmail.com",
			Password:  "$2a$14$ipdyBoruELybDnsJpitNE.IZIhWhMk8V92LtNXYgZDau1PRrTWLS6",
			Age:       22,
			Salary:    45000.00,
			RoleID:    2,
			GenderID:  1,
		},
		{
			FirstName: "นายนพกร",
			LastName:  "ดาศรี",
			Email:     "nop@gmail.com",
			Password:  "$2a$14$ipdyBoruELybDnsJpitNE.IZIhWhMk8V92LtNXYgZDau1PRrTWLS6",
			Age:       22,
			RoleID:    2,
			GenderID:  1,
		},
		{
			FirstName: "นายภูวดล",
			LastName:  "ศรีธร",
			Email:     "tik@gmail.com",
			Password:  "$2a$14$ipdyBoruELybDnsJpitNE.IZIhWhMk8V92LtNXYgZDau1PRrTWLS6",
			Age:       23,
			Salary:    45000.00,
			RoleID:    2,
			GenderID:  1,
		},
		{
			FirstName: "นายปฐวิกานต์",
			LastName:  "หร่ายขุนทด",
			Email:     "pond@gmail.com",
			Password:  "$2a$14$ipdyBoruELybDnsJpitNE.IZIhWhMk8V92LtNXYgZDau1PRrTWLS6",
			Age:       24,
			Salary:    45000.00,
			RoleID:    2,
			GenderID:  1,
		},
		{
			FirstName: "นายศักดิ์ชัย",
			LastName:  "วงษ์กล่ำ",
			Email:     "ball@gmail.com",
			Password:  "$2a$14$gxH.aE8wfDyXPRQh6F2NJOY9gt4k/EWT0z2jgdOHDGvMKfJE5Mng6",
			Age:       25,
			Salary:    45000.00,
			RoleID:    2,
			GenderID:  1,
		},
		{
			FirstName: "นางปราณี",
			LastName:  "ศรีนวล",
			Email:     "pranee@gmail.com",
			Password:  "$2a$14$ipdyBoruELybDnsJpitNE.IZIhWhMk8V92LtNXYgZDau1PRrTWLS6",
			Age:       26,
			Salary:    35000.00,
			RoleID:    2,
			GenderID:  2,
		},
	}
	db.Create(&employee)

	// IngredientType Data: Ok
	ingredientType := []IngredientType{
		{TypeName: "DRIED (ชนิดแห้ง)"},
		{TypeName: "LIQUID (ชนิดเหลว)"},
		{TypeName: "POWDER (ชนิดผง)"},
		{TypeName: "FRESH (ชนิดของสด)"},
	}
	db.Create(&ingredientType) // Assuming 'db' is your GORM database instance

	// Member Data (ex)
	member := []Member{
		{
			Username: "Member1",
			Email:    "Member1@gmail.com",
			Password: "$2a$14$1qfB.u0tiph7ygK3J8EBZurz/WYIpk6O1mvSFNiSwGYmbEWtxT6ti", //1111111
			Phone:    "0981894780",
			Point:    50,
		},
		{
			Username: "Member2",
			Email:    "Member2@gmail.com",
			Password: "$2a$14$1qfB.u0tiph7ygK3J8EBZurz/WYIpk6O1mvSFNiSwGYmbEWtxT6ti", //11111111
			Phone:    "0626735910",
			Point:    20,
		},
	}
	db.Create(&member)

	var count1 int64
	db.Model(&Menu{}).Count(&count1)
	if count1 == 0 {
		// Create IngredientMenu data
		menu := []Menu{
			{
				MenuID:      1,
				MenuName:    "เอสเพรสโซ",
				MenuNameEng: "Espresso",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/dKEMNOD.png",
				MenuStatus:  1,
				MenuTypeID:  1,
			},
			{
				MenuID:      2,
				MenuName:    "อเมริกาโน่",
				MenuNameEng: "Americano",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/ZdIfkED.png",
				MenuStatus:  1,
				MenuTypeID:  1,
			},
			{
				MenuID:      3,
				MenuName:    "ลาเต้",
				MenuNameEng: "Latte",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/lQAxX5h.png",
				MenuStatus:  1,
				MenuTypeID:  1,
			},
			{
				MenuID:      4,
				MenuName:    "คาปูชิโน",
				MenuNameEng: "Cappuccino",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/6VgJpu7.png",
				MenuStatus:  1,
				MenuTypeID:  1,
			},
			{
				MenuID:      5,
				MenuName:    "มอคค่า",
				MenuNameEng: "Mocca",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/CqDEg77.png",
				MenuStatus:  1,
				MenuTypeID:  1,
			},
			{
				MenuID:      6,
				MenuName:    "มัคคิอาโต้",
				MenuNameEng: "Macchiato",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/vVHX2kX.png",
				MenuStatus:  1,
				MenuTypeID:  1,
			},
			{
				MenuID:      7,
				MenuName:    "มัทฉะผสมกาแฟ",
				MenuNameEng: "Matcha Coffee",
				MenuCost:    69.00,
				MenuImage:   "https://i.imgur.com/RRjLqiV.png",
				MenuStatus:  1,
				MenuTypeID:  1,
			},
			{
				MenuID:      8,
				MenuName:    "เซ็ตชาไทย",
				MenuNameEng: "Set Thai Tea",
				MenuCost:    159.00,
				MenuImage:   "https://i.imgur.com/BxWcUat.png",
				MenuStatus:  1,
				MenuTypeID:  2,
			},
			{
				MenuID:      9,
				MenuName:    "ชาไทย",
				MenuNameEng: "Thai Tea",
				MenuCost:    69.00,
				MenuImage:   "https://i.imgur.com/XtafMX9.png",
				MenuStatus:  1,
				MenuTypeID:  2,
			},
			{
				MenuID:      10,
				MenuName:    "ช็อกโก้ช็อกโก้",
				MenuNameEng: "ChocoChoco",
				MenuCost:    69.00,
				MenuImage:   "https://i.imgur.com/xg7WAXn.png",
				MenuStatus:  1,
				MenuTypeID:  2,
			},
			{
				MenuID:      11,
				MenuName:    "ช็อกมิ้น",
				MenuNameEng: "Choco Mint",
				MenuCost:    79.00,
				MenuImage:   "https://i.imgur.com/jxnH2B0.png",
				MenuStatus:  1,
				MenuTypeID:  2,
			},
			{
				MenuID:      12,
				MenuName:    "ชาเขียวเลม่อน",
				MenuNameEng: "Matcha Lemon",
				MenuCost:    89.00,
				MenuImage:   "https://i.imgur.com/2Kwjx5n.png",
				MenuStatus:  1,
				MenuTypeID:  2,
			},
			{
				MenuID:      13,
				MenuName:    "นมชมพูฟูใจ",
				MenuNameEng: "Pink Milk Heart Flossy",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/071tF6Q.png",
				MenuStatus:  1,
				MenuTypeID:  2,
			},
			{
				MenuID:      14,
				MenuName:    "ชามะนาว",
				MenuNameEng: "Lemon Tea",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/RYCwFCK.png",
				MenuStatus:  1,
				MenuTypeID:  2,
			},
			{
				MenuID:      15,
				MenuName:    "ชาเขียว",
				MenuNameEng: "Matcha Green Tea",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/KRH2dZ4.png",
				MenuStatus:  1,
				MenuTypeID:  2,
			},
			{
				MenuID:      16,
				MenuName:    "มิกซ์เบอร์รี่",
				MenuNameEng: "Mix Berry",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/RRrbpRZ.png",
				MenuStatus:  1,
				MenuTypeID:  3,
			},
			{
				MenuID:      17,
				MenuName:    "เบอร์รี่โยเกิร์ต",
				MenuNameEng: "Berry Yogurt",
				MenuCost:    89.00,
				MenuImage:   "https://i.imgur.com/4y8Gvxv.png",
				MenuStatus:  1,
				MenuTypeID:  3,
			},
			{
				MenuID:      18,
				MenuName:    "น้ำส้ม",
				MenuNameEng: "Orange Juice",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/MciaLD8.png",
				MenuStatus:  1,
				MenuTypeID:  3,
			},
			{
				MenuID:      19,
				MenuName:    "น้ำแตงโม",
				MenuNameEng: "Watermelon Juice",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/PievJ5b.png",
				MenuStatus:  1,
				MenuTypeID:  3,
			},
			{
				MenuID:      20,
				MenuName:    "น้ำสับปะรด",
				MenuNameEng: "Pineapple Juice",
				MenuCost:    59.00,
				MenuImage:   "https://i.imgur.com/F8bVsmj.png",
				MenuStatus:  1,
				MenuTypeID:  3,
			},
			{
				MenuID:      21,
				MenuName:    "บลูฮาวาย",
				MenuNameEng: "Blue Hawaii",
				MenuCost:    59.00,
				MenuImage:   "https://i.imgur.com/xKoqBcW.png",
				MenuStatus:  1,
				MenuTypeID:  3,
			},
			{
				MenuID:      22,
				MenuName:    "เบอร์รี่ชีทเค้ก",
				MenuNameEng: "Berry Cheesecake",
				MenuCost:    79.00,
				MenuImage:   "https://i.imgur.com/NMocioA.png",
				MenuStatus:  1,
				MenuTypeID:  4,
			},
			{
				MenuID:      23,
				MenuName:    "เบอร์รี่ช็อคโก้เค้ก",
				MenuNameEng: "Berry Choco Cake",
				MenuCost:    89.00,
				MenuImage:   "https://i.imgur.com/L6HpIn1.png",
				MenuStatus:  1,
				MenuTypeID:  4,
			},
			{
				MenuID:      24,
				MenuName:    "ครัวซอง",
				MenuNameEng: "Croissant",
				MenuCost:    39.00,
				MenuImage:   "https://i.imgur.com/o9bjIZ1.png",
				MenuStatus:  1,
				MenuTypeID:  4,
			},
			{
				MenuID:      25,
				MenuName:    "ครัวซองช็อคโก้",
				MenuNameEng: "Chocolate Croissant",
				MenuCost:    49.00,
				MenuImage:   "https://i.imgur.com/nHCaMY5.png",
				MenuStatus:  1,
				MenuTypeID:  4,
			},
			{
				MenuID:      26,
				MenuName:    "ชุดกาแฟ",
				MenuNameEng: "Coffee Set",
				MenuCost:    259.00,
				MenuImage:   "https://i.imgur.com/3fUnfgX.png",
				MenuStatus:  2,
				MenuTypeID:  5,
			},
			{
				MenuID:      27,
				MenuName:    "กาแฟขั่วเข้ม",
				MenuNameEng: "Dark Roast",
				MenuCost:    199.00,
				MenuImage:   "https://i.imgur.com/4JVXBqb.png",
				MenuStatus:  2,
				MenuTypeID:  5,
			},
			{
				MenuID:      28,
				MenuName:    "กาแฟลาเต้สุดนุ่ม",
				MenuNameEng: "Super Soft Latte Coffee",
				MenuCost:    159.00,
				MenuImage:   "https://i.imgur.com/1K7wmjK.png",
				MenuStatus:  2,
				MenuTypeID:  5,
			},
			{
				MenuID:      29,
				MenuName:    "คุ้กกี้",
				MenuNameEng: "Cookie",
				MenuCost:    59.00,
				MenuImage:   "https://i.imgur.com/7pAEfc4.png",
				MenuStatus:  2,
				MenuTypeID:  5,
			},
			{
				MenuID:      30,
				MenuName:    "มาการอง",
				MenuNameEng: "Macaron",
				MenuCost:    79.00,
				MenuImage:   "https://i.imgur.com/9C8eKYd.png",
				MenuStatus:  2,
				MenuTypeID:  5,
			},
		}

		for _, menu := range menu {
			db.Create(&menu)
		}
	}

	var count2 int64
	db.Model(&IngredientMenu{}).Count(&count2)
	if count2 == 0 {
		// Create IngredientMenu data
		ingredientMenu := []IngredientMenu{
			{
				Amount:           1,
				IngredientID:     1,
				MenuID:           1,
				IngredientUnitID: 1,
			},
			{
				Amount:           2,
				IngredientID:     1,
				MenuID:           2,
				IngredientUnitID: 1,
			},
			{
				Amount:           3,
				IngredientID:     1,
				MenuID:           3,
				IngredientUnitID: 1,
			},
			{
				Amount:           4,
				IngredientID:     1,
				MenuID:           4,
				IngredientUnitID: 1,
			},
			{
				Amount:           5,
				IngredientID:     1,
				MenuID:           5,
				IngredientUnitID: 1,
			},
			{
				Amount:           6,
				IngredientID:     1,
				MenuID:           6,
				IngredientUnitID: 1,
			},
			{
				Amount:           7,
				IngredientID:     1,
				MenuID:           7,
				IngredientUnitID: 1,
			},
			{
				Amount:           8,
				IngredientID:     1,
				MenuID:           8,
				IngredientUnitID: 1,
			},
			{
				Amount:           9,
				IngredientID:     1,
				MenuID:           9,
				IngredientUnitID: 1,
			},
			{
				Amount:           10,
				IngredientID:     1,
				MenuID:           10,
				IngredientUnitID: 1,
			},
			{
				Amount:           9,
				IngredientID:     1,
				MenuID:           11,
				IngredientUnitID: 1,
			},
			{
				Amount:           8,
				IngredientID:     1,
				MenuID:           12,
				IngredientUnitID: 1,
			},
			{
				Amount:           7,
				IngredientID:     1,
				MenuID:           13,
				IngredientUnitID: 1,
			},
			{
				Amount:           6,
				IngredientID:     1,
				MenuID:           14,
				IngredientUnitID: 1,
			},
			{
				Amount:           5,
				IngredientID:     1,
				MenuID:           15,
				IngredientUnitID: 1,
			},
			{
				Amount:           5,
				IngredientID:     1,
				MenuID:           16,
				IngredientUnitID: 1,
			},
			{
				Amount:           4,
				IngredientID:     1,
				MenuID:           17,
				IngredientUnitID: 1,
			},
			{
				Amount:           3,
				IngredientID:     1,
				MenuID:           18,
				IngredientUnitID: 1,
			},
			{
				Amount:           2,
				IngredientID:     1,
				MenuID:           19,
				IngredientUnitID: 1,
			},
			{
				Amount:           1,
				IngredientID:     1,
				MenuID:           20,
				IngredientUnitID: 1,
			},
			{
				Amount:           2,
				IngredientID:     1,
				MenuID:           21,
				IngredientUnitID: 1,
			},
			{
				Amount:           3,
				IngredientID:     1,
				MenuID:           22,
				IngredientUnitID: 1,
			},
			{
				Amount:           4,
				IngredientID:     1,
				MenuID:           23,
				IngredientUnitID: 1,
			},
			{
				Amount:           5,
				IngredientID:     1,
				MenuID:           24,
				IngredientUnitID: 1,
			},
			{
				Amount:           6,
				IngredientID:     1,
				MenuID:           25,
				IngredientUnitID: 1,
			},
			{
				Amount:           7,
				IngredientID:     1,
				MenuID:           26,
				IngredientUnitID: 1,
			},
			{
				Amount:           8,
				IngredientID:     1,
				MenuID:           27,
				IngredientUnitID: 1,
			},
			{
				Amount:           9,
				IngredientID:     1,
				MenuID:           28,
				IngredientUnitID: 1,
			},
			{
				Amount:           10,
				IngredientID:     1,
				MenuID:           29,
				IngredientUnitID: 1,
			},
			{
				Amount:           11,
				IngredientID:     1,
				MenuID:           30,
				IngredientUnitID: 1,
			},
		}

		for _, ingredientMenu := range ingredientMenu {
			db.Create(&ingredientMenu)
		}
	}

	// Sweetness Data (ex): Ok
	sweetness := []Sweetness{
		{
			Name:  "ไม่หวาน",
			Value: 25,
		},
		{
			Name:  "หวานน้อย",
			Value: 50,
		},
		{
			Name:  "หวานปกติ",
			Value: 100,
		},
	}
	db.Create(&sweetness)

	// DrinkOption Data (ex): Ok
	drinkOption := []DrinkOption{
		{
			Name: "ร้อน",
		},
		{
			Name: "เย็น",
		},
		{
			Name: "ปั่น",
		},
	}
	db.Create(&drinkOption)

	// menuSize Data (ex): Ok
	menuSize := []MenuSize{
		{
			Name:           "s",
			AddAmount:      0,
			Quantity:       16,
			UnitOfQuantity: "oz",
		},
		{
			Name:           "m",
			AddAmount:      25,
			Quantity:       22,
			UnitOfQuantity: "oz",
		},
		{
			Name:           "l",
			AddAmount:      40,
			Quantity:       24,
			UnitOfQuantity: "oz",
		},
	}
	db.Create(&menuSize)

	// StatusApprovePreorder Data (ex): Ok
	statusApprovePreorder := []StatusApprovePreorder{
		{
			Name: "รออนุมัติการสั่งจอง",
		},
		{
			Name: "อนุมัติการสั่งจอง",
		},
		{
			Name: "ไม่อนุมัติการสั่งจอง",
		},
	}
	db.Create(&statusApprovePreorder)

	// StatusRecivePreorder Data (ex): Ok
	statusRecivePreorder := []StatusRecivePreorder{
		{
			Name: "รออนุมัติการสั่งจอง",
		},
		{
			Name: "ยังไม่ได้รับสินค้า",
		},
		{
			Name: "ไม่อนุมัติการสั่งจอง",
		},

		{
			Name: "รับสินค้าแล้วเรียบร้อย",
		},
		{
			Name: "ไม่รับสินค้า",
		},
	}
	db.Create(&statusRecivePreorder)
	pickUpDateTime1 := time.Date(2566, 2, 12, 15, 0, 0, 0, time.UTC)
	pickUpDateTime2 := time.Date(2566, 1, 11, 15, 34, 0, 0, time.UTC)
	pickUpDateTime3 := time.Date(2567, 2, 1, 10, 0, 0, 0, time.UTC)
	preorder := []Preorder{
		{
			IDPreorder:     "1",
			TotalAmount:    49, //รับสินค้าแล้วเรียบร้อย
			PickUpDateTime: &pickUpDateTime1,
			Note:           "",
			Respond:        "",
			MemberID:       &member[0].ID,
		},
		{
			IDPreorder:     "2",
			TotalAmount:    88, //ไม่ยอมรับสินค้าแล้วเรียบร้อย
			PickUpDateTime: &pickUpDateTime2,
			Note:           "",
			Respond:        "",
			MemberID:       &member[1].ID,
		},
		{
			IDPreorder:     "3",
			TotalAmount:    159, //รออนุมัติการสั่งจอง
			PickUpDateTime: &pickUpDateTime3,
			Note:           "",
			Respond:        "",
			MemberID:       &member[1].ID,
		},
	}
	db.Create(&preorder)

	preorderstatusapprove := []PreorderStatusApprove{
		{
			Preorder:              preorder[0],
			StatusApprovePreorder: statusApprovePreorder[1],
		},
		{
			Preorder:              preorder[1],
			StatusApprovePreorder: statusApprovePreorder[2],
		},

		{
			Preorder:              preorder[2],
			StatusApprovePreorder: statusApprovePreorder[0],
		},
	}
	db.Create(&preorderstatusapprove)

	preorderstatusrecive := []PreorderStatusRecive{
		{
			Preorder:             preorder[0],
			StatusRecivePreorder: statusRecivePreorder[3],
		},
		{
			Preorder:             preorder[1],
			StatusRecivePreorder: statusRecivePreorder[2],
		},
		{
			Preorder:             preorder[2],
			StatusRecivePreorder: statusRecivePreorder[1],
		},
	}
	db.Create(&preorderstatusrecive)

	preorderMenu := []PreorderMenu{
		{
			Quantity:      2,
			TotalCost:     88,
			PreorderID:    &preorder[0].ID,
			Preorder:      preorder[0],
			MenuSizeID:    &menuSize[0].ID,
			MenuSize:      menuSize[0],
			SweetnessID:   &sweetness[0].ID,
			Sweetness:     sweetness[0],
			DrinkOptionID: &drinkOption[0].ID,
			DrinkOption:   drinkOption[0],
			MenuID:        &[]uint{1}[0],
		},
		{
			Quantity:      1,
			TotalCost:     49,
			PreorderID:    &preorder[1].ID,
			Preorder:      preorder[1],
			MenuSizeID:    &menuSize[0].ID,
			MenuSize:      menuSize[0],
			SweetnessID:   &sweetness[0].ID,
			Sweetness:     sweetness[0],
			DrinkOptionID: &drinkOption[0].ID,
			DrinkOption:   drinkOption[0],
			MenuID:        &[]uint{2}[0],
		},
		{
			Quantity:      3,
			TotalCost:     147,
			PreorderID:    &preorder[2].ID,
			Preorder:      preorder[2],
			MenuSizeID:    &menuSize[0].ID,
			MenuSize:      menuSize[0],
			SweetnessID:   &sweetness[0].ID,
			Sweetness:     sweetness[0],
			DrinkOptionID: &drinkOption[0].ID,
			DrinkOption:   drinkOption[0],
			MenuID:        &[]uint{3}[0],
		},
	}
	db.Create(&preorderMenu)

	ingredient := []Ingredient{
		{
			IngredientName:   "ครีมเทียม",
			IngredientCost:   40,
			IngredientAmount: 300,
			IngredientImage:  "https://i.imgur.com/2onBDWQ.png",
			IngredientExpert: time.Date(2567, 3, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 2,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "โซดา",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/QCIPLAj.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 2,
			IngredientUnitID: 4,
		},
		{
			IngredientName:   "นมข้นหวาน",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/NY0SmJd.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 2,
			IngredientUnitID: 4,
		},
		{
			IngredientName:   "นมจืด",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/aaZwh3M.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 2,
			IngredientUnitID: 4,
		},
		{
			IngredientName:   "น้ำตาล",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/y4irYVX.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 1,
			IngredientUnitID: 5,
		},
		{
			IngredientName:   "ผงกาแฟ",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/HxbmdgY.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 3,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "ผงช็อกโกแลต",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/hiFD5hX.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 3,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "ผงชาเขียวมัจฉะ",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/NoH94sH.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 3,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "ผงเอสเปรสโซ่",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/Y6FLw5d.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 3,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "โฟมนม",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/yZZkL9x.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 2,
			IngredientUnitID: 4,
		},
		{
			IngredientName:   "มะนาว",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/GHUilfd.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 4,
			IngredientUnitID: 2,
		},
		{
			IngredientName:   "วิปครีม",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/U16hFMh.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 2,
			IngredientUnitID: 4,
		},
		{
			IngredientName:   "เกลือ",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/8pXuCy7.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 2,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "น้ำเชื่อม",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/vWF8AwA.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 2,
			IngredientUnitID: 5,
		},
		{
			IngredientName:   "ผงชาเขียว",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/kfMARJV.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 3,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "ผงชาไทย",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/NrV7pig.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 3,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "ผงมินต์",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/GB0BEjy.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 3,
			IngredientUnitID: 3,
		},
		/////////////////////  Fruit    //////////////////
		{
			IngredientName:   "แตงโม",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/tcyPls2.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 4,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "บลูเบอร์รี่",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/V3KlRmy.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 4,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "ราซเบอร์รี่",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/Nstp9jJ.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 4,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "สตอเบอร์รี่",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/FMlCn6L.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 4,
			IngredientUnitID: 3,
		},
		{
			IngredientName:   "ส้ม",
			IngredientCost:   10,
			IngredientAmount: 100,
			IngredientImage:  "https://i.imgur.com/zX2hHWO.png",
			IngredientExpert: time.Date(2567, 5, 16, 15, 0, 0, 0, time.UTC),
			IngredientTypeID: 4,
			IngredientUnitID: 3,
		},
	}
	db.Create(&ingredient) // ok

	resource := []Resource{
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
		{
			Name:    "ไทยพัฒนา",
			Address: "10/2 หมูู่ 10 ตำบล ไทยเจริญ อำเภอหนองแก จังหวัดหนองขาม 32190",
			Phone:   "0990082253",
		},
	}
	db.Create(&resource)

	ingredientresource := []IngredientResource{
		{
			IngredientID: 1,
			ResourceID:   1,
		},
		{
			IngredientID: 2,
			ResourceID:   2,
		},
		{
			IngredientID: 3,
			ResourceID:   3,
		},
		{
			IngredientID: 4,
			ResourceID:   4,
		},
		{
			IngredientID: 5,
			ResourceID:   5,
		},
		{
			IngredientID: 6,
			ResourceID:   6,
		},
		{
			IngredientID: 7,
			ResourceID:   7,
		},
		{
			IngredientID: 8,
			ResourceID:   8,
		},
		{
			IngredientID: 9,
			ResourceID:   9,
		},
		{
			IngredientID: 10,
			ResourceID:   10,
		},
		{
			IngredientID: 11,
			ResourceID:   11,
		},
		{
			IngredientID: 12,
			ResourceID:   12,
		},
		{
			IngredientID: 13,
			ResourceID:   13,
		},
		{
			IngredientID: 14,
			ResourceID:   14,
		},
		{
			IngredientID: 15,
			ResourceID:   15,
		},
		{
			IngredientID: 16,
			ResourceID:   16,
		},
		{
			IngredientID: 17,
			ResourceID:   17,
		},
		{
			IngredientID: 18,
			ResourceID:   18,
		},
		{
			IngredientID: 19,
			ResourceID:   10,
		},
		{
			IngredientID: 20,
			ResourceID:   20,
		},
		{
			IngredientID: 21,
			ResourceID:   21,
		},
		{
			IngredientID: 22,
			ResourceID:   22,
		},
	}
	db.Create(&ingredientresource)

	history := []History{
		{
			Amount:       300,
			ImportDate:   time.Now(),
			IngredientID: 1,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 2,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 3,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 4,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 5,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 6,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 7,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 8,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 9,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 10,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 11,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 12,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 13,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 14,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 15,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 16,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 17,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 18,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 19,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 20,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 21,
		},
		{
			Amount:       100,
			ImportDate:   time.Now(),
			IngredientID: 22,
		},
	}
	db.Create(&history)

	promotion := []Promotion{
		{
			Code:          "chinafestival",
			Name:          "โปรโมชั่นต้อนรับตรุสจีน",
			Image:         "https://i.imgur.com/7laHtuq.png",
			TimeOfbegin:   time.Date(2024, time.January, 30, 0, 0, 0, 0, time.Local),
			TimeOfend:     time.Date(2024, time.December, 10, 0, 0, 0, 0, time.Local),
			Discount:      56.00,
			DiscountPoint: 30,
			EmployeeID:    2,
		},
		{
			Code:          "Happy Newyear",
			Name:          "โปรโมชั่นปีใหม่",
			Image:         "https://i.imgur.com/8mFoulK.png",
			TimeOfbegin:   time.Date(2023, time.December, 20, 0, 0, 0, 0, time.Local),
			TimeOfend:     time.Date(2024, time.January, 15, 0, 0, 0, 0, time.Local),
			Discount:      50.00,
			DiscountPoint: 20,
			EmployeeID:    1,
		},
		{
			Code:          "winter",
			Name:          "โปรโมชั่นฤดูหนาว",
			Image:         "https://i.imgur.com/ge0dLsX.png",
			TimeOfbegin:   time.Date(2023, time.November, 15, 0, 0, 0, 0, time.Local),
			TimeOfend:     time.Date(2024, time.February, 15, 0, 0, 0, 0, time.Local),
			Discount:      1000.00,
			DiscountPoint: 50,
			EmployeeID:    2,
		},
		{
			Code:          "summer2024",
			Name:          "โปรโมชั่นต้อนรับฤดูร้อน",
			Image:         "https://i.imgur.com/edFUfzv.png",
			TimeOfbegin:   time.Date(2024, time.January, 1, 0, 0, 0, 0, time.Local),
			TimeOfend:     time.Date(2024, time.December, 31, 0, 0, 0, 0, time.Local),
			Discount:      30.00,
			DiscountPoint: 100,
			EmployeeID:    2,
		},
	}
	db.Create(&promotion)

	statusPayment := []StatusPayment{
		{
			Name: "รอการยืนยัน",
		},
		{
			Name: "การชำระเงินสำเร็จ",
		},
		{
			Name: "การชำระเงินไม่สำเร็จ",
		},
	}
	db.Create(&statusPayment)

	Time1 := time.Date(2566, 2, 11, 15, 0, 0, 0, time.UTC)
	Time2 := time.Date(2566, 1, 11, 13, 34, 0, 0, time.UTC)
	Time3 := time.Date(2567, 1, 02, 10, 0, 0, 0, time.UTC)

	payment := []Payment{
		{
			Image:       "https://i.imgur.com/IdNRrbK.jpg",
			Time:        Time1,
			Code:        "Happy Newyear",
			TotalAmount: 33,
			PreorderID:  &[]uint{1}[0],
			PromotionID: &promotion[1].ID,
			Employee:    employee[0],
			EmployeeID:  &employee[0].ID,
		},
		{
			Image:       "https://i.imgur.com/G9JVbhU.jpg",
			Time:        Time2,
			Code:        "",
			TotalAmount: 49,
			PreorderID:  &[]uint{2}[0],

			Employee:   employee[0],
			EmployeeID: &employee[0].ID,
		},
		{
			Image:       "https://i.imgur.com/G9JVbhU.jpg",
			Time:        Time3,
			Code:        "",
			TotalAmount: 1479,
			PreorderID:  &[]uint{3}[0],

			Employee:   employee[0],
			EmployeeID: &employee[0].ID,
		},
	}
	db.Create(&payment)

	paymentStatus := []PaymentStatus{
		{
			PaymentID:       &payment[0].ID,
			StatusPaymentID: &statusPayment[1].ID,
		},
		{
			PaymentID:       &payment[1].ID,
			StatusPaymentID: &statusPayment[2].ID,
		},
		{
			PaymentID:       &payment[2].ID,
			StatusPaymentID: &statusPayment[0].ID,
		},
	}
	db.Create(&paymentStatus)

}
