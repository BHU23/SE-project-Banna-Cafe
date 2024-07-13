import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message, Card, Statistic} from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetEmployees, DeleteEmployeeByID, GetEmployeeById } from "../../../services/https/employee";
import { EmployeesInterface } from "../../../interfaces/IEmployee";
import { Link, useNavigate } from "react-router-dom";
import { GetRowEmployee, GetGenderMale, GetGenderFemale, GetGenderOther } from "../../../services/https/employee";
import "./meanny.css"

function MainsOwner() {
  const columns: ColumnsType<EmployeesInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ชื่อ",
      dataIndex: "FirstName",
      key: "firstname",
    },
    {
      title: "นามสกุล",
      dataIndex: "LastName",
      key: "lastname",
    },
    {
      title: "ตำแหน่ง",
      dataIndex: "Role",
      key: "role",
      render: (item) => Object.values(item.RoleName),
    },
    {
      title: "อีเมล",
      dataIndex: "Email",
      key: "email",
    },
  ];

  const [employee, setEmployee] = useState<EmployeesInterface>();
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
        localStorage.setItem("id", "0");
        navigate("/");
      },
    });
  };

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

  const navigate = useNavigate();

  const [employees, setEmployees] = useState<EmployeesInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();
  const [genderMale, setGenderMale] = useState<number | undefined>(0);
  const [genderFemale, setGenderFemale] = useState<number | undefined>(0);
  const [genderOther, setGenderOther] = useState<number | undefined>(0);
  const [rowEmployee, setRowEmployee] = useState<number | undefined>(0);

  const getEmployees = async () => {
    let res = await GetEmployees();
    if (res) {
      setEmployees(res);
    }
  };

  const getGenderMale = async () => {
    let res = await GetGenderMale();
    if (res) {
      setGenderMale(res);
    }
  };

  const getGenderFemale = async () => {
    let res = await GetGenderFemale();
    if (res) {
      setGenderFemale(res);
    }
  };

  const getGenderOther = async () => {
    let res = await GetGenderOther();
    if (res) {
      setGenderOther(res);
    }
  };

  const getRowEmployee = async () => {
    let res = await GetRowEmployee();
    if (res) {
      setRowEmployee(res);
    }
  };

  // const [userName, setUserName] = useState<string>("Owner"); // กำหนดชื่อผู้ใช้งาน

  useEffect(() => {
    getEmployees();
    getGenderMale();
    getGenderFemale();
    getGenderOther();
    getRowEmployee();
    getEmployeeByID();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ระบบจัดการหลังบ้าน Banna Café</h2>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนพนักงาน (ทั้งหมด)"
                    value={`${rowEmployee} คน`}
                    prefix={<TeamOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนพนักงาน (เพศชาย)"
                    value={`${genderMale} คน`}
                    valueStyle={{ color: "#00BFFF" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนพนักงาน (เพศหญิง)"
                    value={`${genderFemale} คน`}
                    valueStyle={{ color: "#FF00FF" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนพนักงาน (เพศอื่น ๆ)"
                    value={`${genderOther} คน`}
                    valueStyle={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)', animation: 'rainbowAnimation 4s linear infinite'}}
                    prefix={<UserOutlined className="rainbow-icon"/>}
                    className="rainbow-text"
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Col span={12}>
          <h2>รายชื่อพนักงาน</h2>
        </Col>
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={employees} />
      </div>
    </>
  );
}

export default MainsOwner;
