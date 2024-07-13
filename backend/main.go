package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut66/team08/controller"
	"github.com/sut66/team08/entity"
	middlewares "github.com/sut66/team08/middleware"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/membersRegister", controller.CreateMemberRegister)
	r.POST("/login", controller.Login)
	r.GET("/promotions/ready", controller.ListReadyPromotion)

	protected := r.Group("")
	{
		//
		protected.Use(middlewares.Authorizes())
		{
			// Menu Routes
			protected.GET("/menus", controller.ListMenus)
			protected.GET("/menu/:id", controller.GetMenu)
			protected.POST("/menus", controller.CreateMenu) // sholee & biw -> edit "menu"
			protected.PATCH("/menus", controller.UpdateMenu)
			protected.DELETE("/menus/:id", controller.DeleteMenu)
			protected.GET("/latestMenuID", controller.GetLatestMenuID) // new 21/12/66
			protected.GET("/listActiveMenu", controller.ListActiveMenus)
			protected.GET("/listNoActiveMenu", controller.ListNoActiveMenus)
			protected.GET("/countMenu", controller.CountRows)
			// MenuType Routes
			protected.GET("/menuTypes", controller.ListMenuTypes)
			// MenuName Routes
			protected.GET("/menuNames", controller.ListMenuNames) // more 21/12/66
			protected.GET("/menuNames/:id", controller.GetMenuName)
			// IngredientUnit Routes
			protected.GET("/ingredientUnits", controller.ListIngredientUnits) // more 13/12/66 -> edit 15/12/66

			// Employee Routes
			protected.GET("/employees", controller.ListEmployees)
			protected.GET("/employee/:id", controller.GetEmployee)
			protected.POST("/employees", controller.CreateEmployee)
			protected.PATCH("/employees", controller.UpdateEmployee)
			protected.DELETE("/employees/:id", controller.DeleteEmployee)
			// Role Routes
			protected.GET("/roles", controller.ListRoles)
			// Gender Routes
			protected.GET("/genders", controller.ListGenders)
			protected.GET("/countEmployee", controller.CountRowsEm)
			protected.GET("/genderMale", controller.GenderMale)
			protected.GET("/genderFemale", controller.GenderFemale)
			protected.GET("/genderOther", controller.GenderOther)

			// Ingredient Routes Update By nop 2/12/2566
			protected.GET("/ingredients", controller.ListIngredients)
			protected.GET("/lastingredients", controller.GetLastIngredient)
			protected.GET("/ingredient/:id", controller.GetIngredient)
			protected.POST("/ingredients", controller.CreateIngredient)
			protected.PATCH("/ingredients", controller.UpdateIngredient)
			protected.DELETE("/ingredients/:id", controller.DeleteIngredient)

			// IngredientType Routes Update By nop 2/12/2566
			protected.GET("/ingredientTypes", controller.ListIngredientTypes)

			// IngredientMenu Routes
			protected.GET("/menu/ingredientMenus/:id", controller.ListIngredientMenus)
			protected.GET("/ingredientMenus/:id", controller.GetIngredientMenu)
			protected.POST("/ingredientMenus", controller.CreateIngredientMenu)
			protected.POST("/ingredientMenus/menuNames", controller.CreateIngredientMenuByMenuName) // more 21/12/2023
			protected.PATCH("/ingredientMenus", controller.UpdateIngredientMenu)
			protected.DELETE("/ingredientMenus/:id", controller.DeleteIngredientMenu)
			protected.DELETE("/menu/ingredientMenus/:id", controller.DeleteIngredientMenuSet) // more 21/12/2023

			// Member Routes
			protected.GET("/members", controller.ListMembers)
			protected.GET("/member/:id", controller.GetMember)
			protected.POST("/members", controller.CreateMember)
			protected.PATCH("/members", controller.UpdateMember)
			protected.DELETE("/members/:id", controller.DeleteMember)

			// Rating Routes
			protected.GET("/ratings", controller.ListRatings)
			protected.GET("/rating/:id", controller.GetRating)
			protected.POST("/ratings", controller.CreateRating)
			protected.PATCH("/ratings", controller.UpdateRating)
			protected.DELETE("/ratings/:id", controller.DeleteRating)

			// History Routes Update By nop 11/12/2566
			protected.GET("/histories", controller.ListHistory)
			protected.GET("/history/:id", controller.GetHistory)
			protected.POST("/histories", controller.CreateHistory)
			protected.PATCH("/histories", controller.UpdateHistory)
			protected.DELETE("/histories/:id", controller.DeleteHistory)

			// Resource Routes Update By nop 2/12/2566
			protected.GET("/resources", controller.ListResource)
			protected.GET("/lastresources", controller.GetLastResource)
			protected.GET("/resource/:id", controller.GetResource)
			protected.POST("/resources", controller.CreateResource)
			protected.PATCH("/resources", controller.UpdateResource)
			protected.DELETE("/resources/:id", controller.DeleteResource)

			// Ingredient Resource Routes  Update By nop 2/12/2566
			protected.GET("/ingredientresources", controller.ListIngredientResource)
			protected.GET("/ingredientresource/:id", controller.GetIngredientResource)
			protected.POST("/ingredientresources", controller.CreateIngredientResource)
			protected.PATCH("/ingredientresources", controller.UpdateIngredientResource)
			protected.DELETE("/ingredientresources/:id", controller.DeleteIngredientResource)

			// Preoder Routes
			protected.GET("/menusByMenuType/:id", controller.ListMenusByMenuTypeID)
			protected.GET("/menus/:name", controller.ListMenusByName)
			protected.GET("/ratingsByMenuID/:id", controller.GetRatingsByMenuID)
			protected.GET("/preorder/:id", controller.GetPreorderByID)
			protected.GET("/preorderMember/:id", controller.GetPreorderStatusPaymentByMemberID)
			protected.GET("/newPreorderMember/:id", controller.GetNewPreorderByMemberID)
			protected.POST("/preorders", controller.CreatePreorder)
			protected.PATCH("/preorders", controller.UpdatePreorder)
			protected.DELETE("/preorder/:id", controller.DeletePreorde)

			// PreoderMenu Routes
			protected.POST("/preorderMenus", controller.CreatePreorderMenu)
			protected.GET("/sweetnesses", controller.ListSweetnesses)
			protected.GET("/menuSizes", controller.ListMenuSizes)
			protected.GET("/drinkOptions", controller.ListDrinkOptions)
			protected.GET("/preorderMenus/:id", controller.ListMenuPreordersByPreoderID)
			protected.DELETE("/preorderMenu/:id", controller.DeletePreorderMenu)
			protected.PATCH("/preorderMenus", controller.UpdatePreorderMenu)

			//GetPayment
			r.GET("/paymetMember/:id", controller.GetPaymentByMember)
			r.GET("/preorderStatusReceive/member/:id", controller.GetPreorderStatusReciveByMemberID)
			r.GET("/preorderStatusApprove/member/:id", controller.GetPreorderStatusApproveByMemberID)

			// Ball Routes
			protected.GET("/managepreorders/preorders/get/:id", controller.GetPreOrderByID)
			protected.GET("/managepreorders/get/:id", controller.GetPaymentBiID)
			protected.GET("/managepreorders/status/get/:id", controller.GetStatusReveivesPreorderByPreorderID)
			protected.GET("/managepreorders/statusrecive/list", controller.ListStatusReceive)
			protected.GET("/managepreorders/statusapprove/list", controller.ListStatusApprove)
			protected.GET("/managepreorders/paymentbypreorder/get/:id", controller.GetPaymentByPreorderID)
			protected.PATCH("/managepreorders/preorders", controller.UpdatePreOrder)
			protected.PATCH("/managepreorders/update_status_recive", controller.UpdatePreorderStatusRecive)
			protected.PATCH("/managepreorders/update_status_approve", controller.UpdatePreorderStatusApprove)

			protected.GET("/payment/getpromo/:code", controller.GetPromotionByCode)
			protected.GET("/payment/getpreordermenu/:id", controller.GetPreorderMenuByPreorderID)
			protected.GET("/payment/getemployee/:id", controller.GetEmployeeByID)
			protected.GET("/payment/getpayment/:id", controller.GetPaymentByID)
			protected.GET("/payment/listpaymentstatus", controller.ListPaymentStatus)
			protected.GET("/payment/getpaymentstatus/:id", controller.GetPaymentStatus)
			protected.GET("/payment/liststatuspayment", controller.ListStatusPayment)
			protected.GET("/managepreorders/listPreorderStatusRecive", controller.ListPreorderStatusRecive)
			protected.POST("/payments", controller.CreatePayment)
			protected.POST("/payment/create_accounting", controller.CreateAccoutingByPayment)
			protected.PATCH("/payment/update", controller.UpdatePayment)
			protected.PATCH("/payment_status/update", controller.UpdatePaymentStatus)
			//Ball Routes

			// Promotion Routes
			protected.GET("/promotions", controller.ListPromotion)
			protected.GET("/promotion/:id", controller.GetPromotion)
			protected.GET("/lastpromotions", controller.GetLastPromotion)
			protected.POST("/promotions", controller.CreatePromotion)
			protected.PATCH("/promotions", controller.UpdatePromotion)
			protected.DELETE("/promotions/:id", controller.DeletePromotion)
			// Run the server

			// Statistics Routes
			protected.GET("/countMember", controller.CountRowMembers)
			protected.GET("/countIngredient", controller.CountRowIngredients)
			protected.GET("/countPromotion", controller.CountRowPromotions)
		}
	}
	r.Run()
}

// package main

// import (
// 	"github.com/gin-gonic/gin"
// 	"github.com/sut66/team08/controller"
// 	"github.com/sut66/team08/entity"
// )

// func main() {
// 	entity.SetupDatabase()
// 	r := gin.Default()
// 	r.Use(CORSMiddleware())
// 	r.POST("/membersRegister", controller.CreateMemberRegister)
// 	r.POST("/login", controller.Login)

// 	//
// 	// Menu Routes
// 	r.GET("/menus", controller.ListMenus)
// 	r.GET("/menu/:id", controller.GetMenu)
// 	r.POST("/menus", controller.CreateMenu) // sholee & biw -> edit "menu"
// 	r.PATCH("/menus", controller.UpdateMenu)
// 	r.DELETE("/menus/:id", controller.DeleteMenu)
// 	r.GET("/latestMenuID", controller.GetLatestMenuID) // new 21/12/66
// 	r.GET("/listActiveMenu", controller.ListActiveMenus)
// 	r.GET("/listNoActiveMenu", controller.ListNoActiveMenus)
// 	r.GET("/countMenu", controller.CountRows)
// 	// MenuType Routes
// 	r.GET("/menuTypes", controller.ListMenuTypes)
// 	// MenuName Routes
// 	r.GET("/menuNames", controller.ListMenuNames) // more 21/12/66
// 	r.GET("/menuNames/:id", controller.GetMenuName)
// 	// IngredientUnit Routes
// 	r.GET("/ingredientUnits", controller.ListIngredientUnits) // more 13/12/66 -> edit 15/12/66

// 	// Employee Routes
// 	r.GET("/employees", controller.ListEmployees)
// 	r.GET("/employee/:id", controller.GetEmployee)
// 	r.POST("/employees", controller.CreateEmployee)
// 	r.PATCH("/employees", controller.UpdateEmployee)
// 	r.DELETE("/employees/:id", controller.DeleteEmployee)
// 	// Role Routes
// 	r.GET("/roles", controller.ListRoles)
// 	// Gender Routes
// 	r.GET("/genders", controller.ListGenders)
// 	r.GET("/countEmployee", controller.CountRowsEm)
// 	r.GET("/genderMale", controller.GenderMale)
// 	r.GET("/genderFemale", controller.GenderFemale)
// 	r.GET("/genderOther", controller.GenderOther)

// 	// Ingredient Routes Update By nop 2/12/2566
// 	r.GET("/ingredients", controller.ListIngredients)
// 	r.GET("/lastingredients", controller.GetLastIngredient)
// 	r.GET("/ingredient/:id", controller.GetIngredient)
// 	r.POST("/ingredients", controller.CreateIngredient)
// 	r.PATCH("/ingredients", controller.UpdateIngredient)
// 	r.DELETE("/ingredients/:id", controller.DeleteIngredient)

// 	// IngredientType Routes Update By nop 2/12/2566
// 	r.GET("/ingredientTypes", controller.ListIngredientTypes)

// 	// IngredientMenu Routes
// 	r.GET("/menu/ingredientMenus/:id", controller.ListIngredientMenus)
// 	r.GET("/ingredientMenus/:id", controller.GetIngredientMenu)
// 	r.POST("/ingredientMenus", controller.CreateIngredientMenu)
// 	r.POST("/ingredientMenus/menuNames", controller.CreateIngredientMenuByMenuName) // more 21/12/2023
// 	r.PATCH("/ingredientMenus", controller.UpdateIngredientMenu)
// 	r.DELETE("/ingredientMenus/:id", controller.DeleteIngredientMenu)
// 	r.DELETE("/menu/ingredientMenus/:id", controller.DeleteIngredientMenuSet) // more 21/12/2023

// 	// Member Routes
// 	r.GET("/members", controller.ListMembers)
// 	r.GET("/member/:id", controller.GetMember)
// 	r.POST("/members", controller.CreateMember)
// 	r.PATCH("/members", controller.UpdateMember)
// 	r.DELETE("/members/:id", controller.DeleteMember)

// 	// Rating Routes
// 	r.GET("/ratings", controller.ListRatings)
// 	r.GET("/rating/:id", controller.GetRating)
// 	r.POST("/ratings", controller.CreateRating)
// 	r.PATCH("/ratings", controller.UpdateRating)
// 	r.DELETE("/ratings/:id", controller.DeleteRating)

// 	// History Routes Update By nop 11/12/2566
// 	r.GET("/histories", controller.ListHistory)
// 	r.GET("/history/:id", controller.GetHistory)
// 	r.POST("/histories", controller.CreateHistory)
// 	r.PATCH("/histories", controller.UpdateHistory)
// 	r.DELETE("/histories/:id", controller.DeleteHistory)

// 	// Resource Routes Update By nop 2/12/2566
// 	r.GET("/resources", controller.ListResource)
// 	r.GET("/lastresources", controller.GetLastResource)
// 	r.GET("/resource/:id", controller.GetResource)
// 	r.POST("/resources", controller.CreateResource)
// 	r.PATCH("/resources", controller.UpdateResource)
// 	r.DELETE("/resources/:id", controller.DeleteResource)

// 	// Ingredient Resource Routes  Update By nop 2/12/2566
// 	r.GET("/ingredientresources", controller.ListIngredientResource)
// 	r.GET("/ingredientresource/:id", controller.GetIngredientResource)
// 	r.POST("/ingredientresources", controller.CreateIngredientResource)
// 	r.PATCH("/ingredientresources", controller.UpdateIngredientResource)
// 	r.DELETE("/ingredientresources/:id", controller.DeleteIngredientResource)

// 	// Preoder Routes
// 	r.GET("/menusByMenuType/:id", controller.ListMenusByMenuTypeID)
// 	r.GET("/menus/:name", controller.ListMenusByName)
// 	r.GET("/ratingsByMenuID/:id", controller.GetRatingsByMenuID)
// 	r.GET("/preorder/:id", controller.GetPreorderByID)
// 	r.GET("/preorderMember/:id", controller.GetPreorderStatusPaymentByMemberID)
// 	r.GET("/newPreorderMember/:id", controller.GetNewPreorderByMemberID)
// 	r.POST("/preorders", controller.CreatePreorder)
// 	r.PATCH("/preorders", controller.UpdatePreorder)
// 	r.DELETE("/preorder/:id", controller.DeletePreorde)

// 	// Order Routes
// 	r.GET("/order/:id", controller.GetorderByID)
// 	r.GET("/orderMember/:id", controller.GetorderStatusByMemberID)
// 	r.GET("/newOrderMember/:id", controller.GetNeworderByMemberID)
// 	r.POST("/orders", controller.CreateOrder)
// 	r.PATCH("/orders", controller.Updateorder)

// 	// OrderMenu Routes
// 	r.POST("/orderMenus", controller.CreateOrderMenu)
// 	r.GET("/orderMenus/:id", controller.ListGetMenuOrdersByOrderID)
// 	r.DELETE("/orderMenu/:id", controller.DeleteOrderMenu)
// 	r.PATCH("/orderMenus", controller.UpdateOrderMenu)

// 	// Accounting Routes
// 	r.POST("/accountings", controller.CreateAccounting)
// 	r.GET("/lastaccountings", controller.GetLastAccounting)
// 	r.GET("/accountings/:id", controller.GetAccounting)
// 	r.PATCH("/accountings", controller.UpdateAccounting)
// 	r.DELETE("/accountings/:id", controller.DeleteAccounting)
// 	r.GET("/accountTypes", controller.ListAccountTypes)
// 	r.GET("/accountings", controller.ListAccounting)

// 	//GetPayment
// 	r.GET("/paymetMember/:id", controller.GetPaymentByMember)
// 	//get preorderStatusReceive
// 	// r.GET("/statusReceivesPreorder", controller.GetStatusReceives)
// 	// r.GET("/statusApprovesPreorder", controller.GetStatusApproves)
// 	r.GET("/preorderStatusReceive/member/:id", controller.GetPreorderStatusReciveByMemberID)
// 	//get preorderStatusApprove
// 	r.GET("/preorderStatusApprove/member/:id", controller.GetPreorderStatusApproveByMemberID)

// 	// PreoderMenu Routes
// 	r.POST("/preorderMenus", controller.CreatePreorderMenu)
// 	r.GET("/sweetnesses", controller.ListSweetnesses)
// 	r.GET("/menuSizes", controller.ListMenuSizes)
// 	r.GET("/drinkOptions", controller.ListDrinkOptions)
// 	r.GET("/preorderMenus/:id", controller.ListMenuPreordersByPreoderID)
// 	r.DELETE("/preorderMenu/:id", controller.DeletePreorderMenu)
// 	r.PATCH("/preorderMenus", controller.UpdatePreorderMenu)

// 	// Ball Routes
// 	r.GET("/managepreorders/preorders/get/:id", controller.GetPreOrderByID)
// 	r.GET("/managepreorders/get/:id", controller.GetPaymentBiID)
// 	r.GET("/managepreorders/status/get/:id", controller.GetStatusReveivesPreorderByPreorderID)
// 	r.GET("/managepreorders/statusrecive/list", controller.ListStatusReceive)
// 	r.GET("/managepreorders/statusapprove/list", controller.ListStatusApprove)
// 	r.GET("/managepreorders/paymentbypreorder/get/:id", controller.GetPaymentByPreorderID)
// 	r.PATCH("/managepreorders/preorders", controller.UpdatePreOrder)
// 	r.PATCH("/managepreorders/update_status_recive", controller.UpdatePreorderStatusRecive)
// 	r.PATCH("/managepreorders/update_status_approve", controller.UpdatePreorderStatusApprove)

// 	r.GET("/payment/getpromo/:code", controller.GetPromotionByCode)
// 	r.GET("/payment/getpreordermenu/:id", controller.GetPreorderMenuByPreorderID)
// 	r.GET("/payment/getemployee/:id", controller.GetEmployeeByID)
// 	r.GET("/payment/getpayment/:id", controller.GetPaymentByID)
// 	r.GET("/payment/listpaymentstatus", controller.ListPaymentStatus)
// 	r.GET("/payment/getpaymentstatus/:id", controller.GetPaymentStatus)
// 	r.GET("/payment/liststatuspayment", controller.ListStatusPayment)
// 	r.GET("/managepreorders/listPreorderStatusRecive", controller.ListPreorderStatusRecive)
// 	r.POST("/payments", controller.CreatePayment)
// 	r.POST("/payment/create_accounting", controller.CreateAccoutingByPayment)
// 	r.PATCH("/payment/update", controller.UpdatePayment)
// 	r.PATCH("/payment_status/update", controller.UpdatePaymentStatus)
// 	//Ball Routes

// 	// Promotion Routes
// 	r.GET("/promotions", controller.ListPromotion)
// 	r.GET("/promotion/:id", controller.GetPromotion)
// 	r.GET("/lastpromotions", controller.GetLastPromotion)
// 	r.POST("/promotions", controller.CreatePromotion)
// 	r.PATCH("/promotions", controller.UpdatePromotion)
// 	r.DELETE("/promotions/:id", controller.DeletePromotion)
// 	// Run the server

// 	// Statistics Routes
// 	r.GET("/countMember", controller.CountRowMembers)
// 	r.GET("/countIngredient", controller.CountRowIngredients)
// 	r.GET("/countPromotion", controller.CountRowPromotions)

// 	r.Run()
// }

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
