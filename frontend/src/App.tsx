import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Home
import Home from "./pages/HomeSystem/home";

// Employee
import EmployeeLayout from "./layouts/employeeLayout";
import Mains from "./pages/EmployeeSystem/main";
import Menus from "./pages/EmployeeSystem/menu";
import MenuCreate from "./pages/EmployeeSystem/menu/create";
import MenuEdit from "./pages/EmployeeSystem/menu/edit";
import IngredientMenus from "./pages/EmployeeSystem/menu/ingredientMenu";
import IngredientMenuCreate from "./pages/EmployeeSystem/menu/ingredientMenuCreate";
import Members from "./pages/EmployeeSystem/member";
import MemberEdit from "./pages/EmployeeSystem/member/edit";
import Accounting from "./pages/EmployeeSystem/accounting";
import AccountingCreate from "./pages/EmployeeSystem/accounting/create";
// Employee by Pond
import Order from "./pages/EmployeeSystem/order";

// Employee by Nop
import Ingredient from "./pages/EmployeeSystem/ingredient";
import IngredientCreate from "./pages/EmployeeSystem/ingredient/create";
import IngredientEdit from "./pages/EmployeeSystem/ingredient/edit";
import History from "./pages/EmployeeSystem/history";
import Promotion from "./pages/EmployeeSystem/promotion";

// Owner
import MainsOwner from "./pages/OwnerSystem/main";
import OwnerLayout from "./layouts/ownerLayout";
import Employees from "./pages/OwnerSystem/employee";
import EmployeeCreate from "./pages/OwnerSystem/employee/create";
import EmployeeEdit from "./pages/OwnerSystem/employee/edit";

// Member by Tik
import MenuPreorder from "./pages/MemberSystem/preorder";

// Member Profile
import ProfileMember from "./pages/MemberSystem/profile";
import EditProfileMember from "./pages/MemberSystem/profile/edit";
import MemberLayout from "./layouts/memberLayout";
import PromotionCreate from "./pages/EmployeeSystem/promotion/create";
import PromotionEdit from "./pages/EmployeeSystem/promotion/edit";
import HistoryPreorder from "./pages/MemberSystem/profile/historyPreorder";
import ManagePreorderEdit from "./pages/EmployeeSystem/managepreorder/edit";
import ManagePreorder from "./pages/EmployeeSystem/managepreorder";
import Payment from "./pages/MemberSystem/payment/payment";
import PaymentEdit from "./pages/MemberSystem/payment/edit";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (!token || token === "") {
    return (
      <Router>
        <Routes>
          <Route>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    );
  } else if (localStorage.getItem("position") === "Member") {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MemberLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menuPreorder" element={<MenuPreorder />} />
            <Route path="/profileMember" element={<ProfileMember />} />
            <Route
              path="/profileMember/edit/:id"
              element={<EditProfileMember />}
            />
            <Route path="/preorder/history" element={<HistoryPreorder />} />
            <Route path="/payment/:id" element={<Payment />} />
            {/* <Route path="/payment/edit/:id" element={<PaymentEdit />} /> */}
          </Route>
        </Routes>
      </Router>
    );
  } else if (localStorage.getItem("position") === "Employee") {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeLayout />}>
            <Route path="/" element={<Mains />} />
            <Route path="/menu" element={<Menus />} />
            <Route path="/menu/create" element={<MenuCreate />} />
            <Route path="/menu/edit/:id" element={<MenuEdit />} />
            <Route
              path="/menu/ingredientMenu/:id"
              element={<IngredientMenus />}
            />
            <Route
              path="/menu/ingredientMenu/create/:id"
              element={<IngredientMenuCreate />}
            />
            <Route path="/Order" element={<Order />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/accounting/create" element={<AccountingCreate />} />
            <Route path="/member" element={<Members />} />
            <Route path="/member/edit/:id" element={<MemberEdit />} />
            <Route path="/ingredient" element={<Ingredient />} />
            <Route path="/ingredient/create" element={<IngredientCreate />} />
            <Route path="/ingredient/edit/:id" element={<IngredientEdit />} />
            <Route path="/history" element={<History />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/promotion/create" element={<PromotionCreate />} />
            <Route path="/promotion/edit/:id" element={<PromotionEdit />} />
            <Route path="/managepreorder" element={<ManagePreorder />} />
            <Route
              path="/managepreorder/edit/:id"
              element={<ManagePreorderEdit />}
            />
          </Route>
        </Routes>
      </Router>
    );
  } else if (localStorage.getItem("position") === "Owner") {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<OwnerLayout />}>
            <Route path="/mainOwner" element={<MainsOwner />} />
            <Route path="/employee" element={<Employees />} />
            <Route path="/employee/create" element={<EmployeeCreate />} />
            <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
          </Route>
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
      <Routes>
        <Route>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// --------------------------------------------------------------------------------------------

// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";

// //Home
// import Home from "./pages/HomeSystem/home";

// // For Employee
// // By Mean
// import EmployeeLayout from "./layouts/employeeLayout";
// import Mains from "./pages/EmployeeSystem/main";
// import Menus from "./pages/EmployeeSystem/menu";
// import MenuCreate from "./pages/EmployeeSystem/menu/create";
// import MenuEdit from "./pages/EmployeeSystem/menu/edit";
// import IngredientMenus from "./pages/EmployeeSystem/menu/ingredientMenu";
// import IngredientMenuCreate from "./pages/EmployeeSystem/menu/ingredientMenuCreate";
// import Members from "./pages/EmployeeSystem/member";
// import MemberEdit from "./pages/EmployeeSystem/member/edit";

// // By Nop
// import Ingredient from "./pages/EmployeeSystem/ingredient";
// import IngredientCreate from "./pages/EmployeeSystem/ingredient/create";
// import IngredientEdit from "./pages/EmployeeSystem/ingredient/edit";
// import History from "./pages/EmployeeSystem/history";
// import Promotion from "./pages/EmployeeSystem/promotion";
// import PromotionCreate from "./pages/EmployeeSystem/promotion/create";
// import PromotionEdit from "./pages/EmployeeSystem/promotion/edit";

// // For Owner
// import MainsOwner from "./pages/OwnerSystem/main";
// import OwnerLayout from "./layouts/ownerLayout";
// import Employees from "./pages/OwnerSystem/employee";
// import EmployeeCreate from "./pages/OwnerSystem/employee/create";
// import EmployeeEdit from "./pages/OwnerSystem/employee/edit";
// import MemberLayout from "./layouts/memberLayout";

// // For Member
// //Preorder
// import MenuPreorder from "./pages/MemberSystem/preorder";

// //Member Profile
// import ProfileMember from "./pages/MemberSystem/profile";
// import EditProfileMember from "./pages/MemberSystem/profile/edit";
// import ManagePreorder from "./pages/EmployeeSystem/managepreorder";
// import ManagePreorderEdit from "./pages/EmployeeSystem/managepreorder/edit";
// import Payment from "./pages/MemberSystem/payment/payment";
// import HistoryPreorder from "./pages/MemberSystem/profile/historyPreorder";
// // in now test...

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route index element={<Home />} />
//       <Route path="" element={<MemberLayout />}>
//         <Route path="/menuPreorder" element={<MenuPreorder />} />
//         <Route path="/profileMember" element={<ProfileMember />} />
//         <Route path="/profileMember/edit/:id" element={<EditProfileMember />} />
//         <Route path="/historyPreorder" element={<HistoryPreorder />} />
//       </Route>
//       <Route path="" element={<EmployeeLayout />}>
//         <Route path="/mainEmployee" element={<Mains />} />
//         <Route path="/menu" element={<Menus />} />
//         <Route path="/menu/create" element={<MenuCreate />} />
//         <Route path="/menu/edit/:id" element={<MenuEdit />} />
//         <Route path="/menu/ingredientMenu/:id" element={<IngredientMenus />} />
//         <Route
//           path="/menu/ingredientMenu/create/:id"
//           element={<IngredientMenuCreate />}
//         />
//         <Route path="/member" element={<Members />} />
//         <Route path="/member/edit/:id" element={<MemberEdit />} />
//         <Route path="/ingredient" element={<Ingredient />} />
//         <Route path="/ingredient/create" element={<IngredientCreate />} />
//         <Route path="/ingredient/edit/:id" element={<IngredientEdit />} />
//         <Route path="/history" element={<History />} />
//         <Route path="/managepreorder" element={<ManagePreorder />} />
//         <Route
//           path="/managepreorder/edit/:id"
//           element={<ManagePreorderEdit />}
//         />
//         <Route path="/promotion" element={<Promotion />} />
//         <Route path="/promotion/create" element={<PromotionCreate />} />
//         <Route path="/promotion/edit/:id" element={<PromotionEdit />} />
//       </Route>
//       <Route path="/payment/:pid" element={<Payment />} />
//       <Route path="" element={<OwnerLayout />}>
//         <Route path="/mainOwner" element={<MainsOwner />} />
//         <Route path="/employee" element={<Employees />} />
//         <Route path="/employee/create" element={<EmployeeCreate />} />
//         <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
//       </Route>
//     </Route>
//   )
// );

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
