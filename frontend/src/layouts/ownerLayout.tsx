import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  HomeOutlined,
  MenuOutlined,
  CoffeeOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Space, Table, Button, Col, Row, Divider, Modal, message, Card, Statistic} from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "../assets/logo.png";

import MainsOwner from "../pages/OwnerSystem/main";
import Employees from "../pages/OwnerSystem/employee";
import EmployeeCreate from "../pages/OwnerSystem/employee/create";
import EmployeeEdit from "../pages/OwnerSystem/employee/edit";
import { EmployeesInterface } from "../interfaces/IEmployee";
import { GetEmployeeById } from "../services/https/employee";
import "./mean.css"

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
  getItem("จัดการพนักงาน", "6", <TeamOutlined />),
  getItem("จัดการวัตถุดิบ", "7", <CoffeeOutlined />),
  getItem("บันทึกรายรับรายจ่าย", "8", <BookOutlined />),
];

export default function OwnerLayout() {
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
      content: "คุณกำลังเข้าสู่ระบบ ในฐานะเจ้าของร้าน",
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
        <Layout style={{ minHeight: "100vh" }}>
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
                key="employee"
                onClick={() => setCurrentPage("employee")}
              >
                <Link to="/employee">
                  <TeamOutlined />
                  <span>จัดการพนักงาน</span>
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
                  <Route path="/" element={<MainsOwner />} />
                  <Route path="/employee" element={<Employees />} />
                  <Route path="/employee/create" element={<EmployeeCreate />} />
                  <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
                </Routes>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Banna Café</Footer>
          </Layout>
        </Layout>
    </>
  );
}
