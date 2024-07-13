import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  HomeOutlined,
  MenuOutlined,
  CoffeeOutlined,
  BookOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Space, Table, Button, Col, Row, Divider, Modal, message, Card, Statistic} from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "../assets/logo.png";

import Mains from "../pages/EmployeeSystem/main";
import Menus from "../pages/EmployeeSystem/menu";
import MenuCreate from "../pages/EmployeeSystem/menu/create";
import MenuEdit from "../pages/EmployeeSystem/menu/edit";

import Ingredient from "../pages/EmployeeSystem/ingredient";
import IngredientCreate from "../pages/EmployeeSystem/ingredient/create";
import IngredientEdit from "../pages/EmployeeSystem/ingredient/edit";
import History from "../pages/EmployeeSystem/history";
import Promotion from "../pages/EmployeeSystem/promotion";
import PromotionCreate from "../pages/EmployeeSystem/promotion/create";

import "./mean.css"
import IngredientMenus from "../pages/EmployeeSystem/menu/ingredientMenu";
import IngredientMenuCreate from "../pages/EmployeeSystem/menu/ingredientMenuCreate";
import Members from "../pages/EmployeeSystem/member";
import MemberEdit from "../pages/EmployeeSystem/member/edit";
import PromotionEdit from "../pages/EmployeeSystem/promotion/edit";

import Order from "../pages/EmployeeSystem/order";

import ManagePreorder from "../pages/EmployeeSystem/managepreorder";
import ManagePreorderEdit from "../pages/EmployeeSystem/managepreorder/edit";
import { EmployeesInterface } from "../interfaces/IEmployee";
import { GetEmployeeById } from "../services/https/employee";

import Accounting from "../pages/EmployeeSystem/accounting";
import AccountingCreate from "../pages/EmployeeSystem/accounting/create";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("หน้าหลัก", "1", <DashboardOutlined />),
  getItem("สร้างคำสั่งซื้อ", "2", <ShoppingCartOutlined />),
  getItem("จัดการเมนูสินค้า", "3", <MenuOutlined />),
  getItem("จัดการโปรโมชั่น", "4", <ProfileOutlined />),
  getItem("จัดการสมาชิก", "5", <UserOutlined />),
  getItem("จัดการวัตถุดิบ", "6", <CoffeeOutlined />),
  getItem("บันทึกรายรับรายจ่าย", "7", <BookOutlined />),
  getItem("จัดการคำสั่งซื้อล่วงหน้า","8", <FileProtectOutlined />)
];

export default function EmployeeLayout() {
  const page = localStorage.getItem("page");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  const [isMouseOverLogo, setIsMouseOverLogo] = useState(false);
  const handleMouseEnter = () => {
    setIsMouseOverLogo(true);
  };
  const handleMouseLeave = () => {
    setIsMouseOverLogo(false);
  };

  const getEmployeeByID = async() => {
    let res = await GetEmployeeById(Number(localStorage.getItem("id")));
    if (res) {
      setEmployee(res);
    } else {
      console.log("Hello, World")
    }
    console.log(res);
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "คุณต้องการออกจากระบบหรือไม่ ?",
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      okButtonProps: {
        style: {
          background: "#E48F44",
          // borderColor: "#4cae4c",
        },
      },
      cancelButtonProps: {
        style: {
          color: "#E48F44",
          background: "white",
          borderColor: "#E48F44",
        },
      },
      onOk: () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      },
    });
  };

  const navigate = useNavigate();

  const [employee, setEmployee] = useState<EmployeesInterface>();

  const handleUserButtonClick = () => {
    Modal.info({
      title: "Message",
      content: "คุณกำลังเข้าสู่ระบบ ในฐานะพนักงาน",
      okButtonProps: {
        style: {
          background: "#E48F44",
        },
      },
    });
  };

  useEffect(() => {
    getEmployeeByID();
  }, []);

  return (
    <>
        <Layout style={{ minHeight: "100vh"}}>
          <Sider
            theme="dark"
            style={{
              backgroundColor: "#678983",
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
                transition: "transform 0.3s ease",
                transform: isMouseOverLogo ? "rotateY(180deg)" : "rotateY(0deg)",
                transformOrigin: "center",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "50%", borderRadius: "50%" }}
              />
            </div>
            <Menu
              theme="light"
              defaultSelectedKeys={[page ? page : "dashboard"]}
              mode="inline"
            >
              <Menu.Item key="main" onClick={() => setCurrentPage("main")}>
                <Link to="/">
                  <HomeOutlined />
                  <span>หน้าหลัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="Order"
                onClick={() => setCurrentPage("Order")}
              >
                <Link to="/Order">
                  <ShoppingCartOutlined />
                  <span>สร้างคำสั่งซื้อ</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="menu" onClick={() => setCurrentPage("menu")}>
                <Link to="/menu">
                  <MenuOutlined />
                  <span>จัดการเมนูสินค้า</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="promotion"
                onClick={() => setCurrentPage("promotion")}
              >
                <Link to="/promotion">
                  <ProfileOutlined />
                  <span>จัดการโปรโมชั่น</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="member" onClick={() => setCurrentPage("member")}>
                <Link to="/member">
                  <UserOutlined />
                  <span>จัดการสมาชิก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="ingredient"
                onClick={() => setCurrentPage("ingredient")}
              >
                <Link to="/ingredient">
                  <CoffeeOutlined />
                  <span>จัดการวัตถุดิบ</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="accounting"
                onClick={() => setCurrentPage("accounting")}
              >
                <Link to="/accounting">
                  <BookOutlined />
                  <span>บันทึกรายรับรายจ่าย</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="managepreorder"
                onClick={() => setCurrentPage("managepreorder")}
              >
                <Link to="/managepreorder">
                  <FileProtectOutlined />
                  <span>จัดการคำสั่งซื้อล่วงหน้า</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ display: 'flex', alignItems: 'center'}}/>
              <Row justify="end" align="middle" style={{ width: '100%' , paddingRight: '20px', backgroundColor: "white"}}>
                <Col span={12}>
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', backgroundColor: 'white', marginLeft: '20px'}}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FF5F5A', marginRight: '10px' }}></div>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FFBE2E', marginRight: '10px' }}></div>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#2ACA44' }}></div>
                  </div>
                </Col>
                <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
                  <Space>
                    <Button type="primary" style={{ background: "#E48F44" }} onClick={handleUserButtonClick}>
                      ผู้ใช้งาน : {employee?.Email}
                    </Button>
                    <Button
                      type="primary"
                      style={{
                        background: "#ffff",
                        color: "#E48F44",
                        border: "1px solid #E48F44",
                      }}
                      onClick={handleLogout}
                    >
                      ออกจากระบบ
                    </Button>
                  </Space>
                </Col>
              </Row>
            <Header/>  
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "10px 0" }} />
              <div
                style={{
                  padding: 24,
                  minHeight: "100%",
                  background: colorBgContainer,
                  // background: 'white',
                }}
              >
                <Routes>
                  <Route path="/" element={<Mains />} />
                  <Route path="/menu" element={<Menus />} />
                  <Route path="/menu/create" element={<MenuCreate />} />
                  <Route path="/menu/edit/:id" element={<MenuEdit />} />
                  <Route path="/menu/ingredientMenu/:id" element={<IngredientMenus />} />
                  <Route path="/menu/ingredientMenu/create/:id" element={<IngredientMenuCreate />} />
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
                  <Route path="/managepreorder/edit/:id" element={<ManagePreorderEdit />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/accounting" element={<Accounting />} />
                  <Route path="/accounting/create" element={<AccountingCreate />} />
                </Routes>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Banna Café</Footer>
          </Layout>
        </Layout>
    </>
  );
}
