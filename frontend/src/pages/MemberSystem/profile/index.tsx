import { useState, useEffect } from "react";
import SidebarProflie from "../../../components/sidebarProfile";
import Footer from "../../../components/footer";
import { GetMemberById } from "../../../services/https/member";
import { MembersInterface } from "../../../interfaces/IMember";
import { NavLink } from "react-router-dom";
import { Layout, Row, Col, Card, Button, Typography, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function ProfileMember() {
  const [member, setMember] = useState<MembersInterface | null>(null);
  const [passwordHide, setPasswordHide] = useState(true);

  const getMemberByID = async (id: number) => {
    let res = await GetMemberById(id);
    if (res) {
      setMember(res);
    }
  };

  useEffect(() => {
    getMemberByID(Number(localStorage.getItem("id")));
  }, []);

  return (
    <Layout className="ProfileMember">
      <Layout className="sidebarProflie">
        <SidebarProflie onSelect={"ข้อมูล"} member={member} />
      </Layout>
      <Layout className="contentprofile">
        <Content
          style={{
            height: "100vh",
            width: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Content
            style={{
              height: "5vh",
              width: "100%",
              borderRadius: "20px",
            }}
          >
            {" "}
            <Content
              style={{
                background: "#E48F44",
                height: "100%",
                width: "100px auto",
                position: "relative",
                float: "right",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
              }}
            >
              <Text>
                <p>ผู้ใช้งาน : {member?.Username}</p>
              </Text>
            </Content>
          </Content>
          <Content
            style={{
              height: "90vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Content
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "20px",
                boxShadow:
                  "-4px 4px 4px 0px rgba(0, 0, 0, 0.25) inset, 4px -4px 4px 0px rgba(0, 0, 0, 0.25) inset",
                gap: "20px",
              }}
            >
              <Content
                style={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: "80vh",
                    gap: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Title
                    level={3}
                    style={{
                      height: "10%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ข้อมูลส่วนตัว
                  </Title>
                  <div
                    style={{
                      height: "20%",
                    }}
                  >
                    <Card
                      hoverable
                      style={{
                        width: "120px",
                        height: "120px",
                        overflow: "hidden",
                        borderRadius: "50%", // Make the entire Card circular
                      }}
                      cover={
                        <img alt="Member Image" src={member?.MemberImage} />
                      }
                    ></Card>
                  </div>
                  {member?.Username}
                  <hr className="hr-Profile" />
                  <Card
                    style={{
                      width: 300,
                      height: "55%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "#E6DDC4",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    <Space
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                        alignItems: "start",
                        padding: "0",
                      }}
                    >
                      <Row gutter={16}>
                        <Text
                          strong
                          style={{
                            paddingRight: 10,
                            width: 100,
                            display: "flex",
                            alignItems: "end",
                          }}
                        >
                          Name:
                        </Text>{" "}
                        {member?.Username}
                      </Row>
                      <Row gutter={12}>
                        <Text
                          strong
                          style={{
                            paddingRight: 10,
                            width: 100,
                            display: "flex",
                            alignItems: "end",
                          }}
                        >
                          Email:{" "}
                        </Text>{" "}
                        {member?.Email}
                      </Row>
                      <Row gutter={12}>
                        <Text
                          strong
                          style={{
                            paddingRight: 10,
                            width: 100,
                            display: "flex",
                            alignItems: "end",
                          }}
                        >
                          Phone:{" "}
                        </Text>{" "}
                        {member?.Phone}
                      </Row>
                      <Row gutter={12}>
                        <Text
                          strong
                          style={{
                            paddingRight: 10,
                            width: 100,
                            display: "flex",
                            alignItems: "end",
                          }}
                        >
                          Password:{" "}
                        </Text>{" "}
                        <span>
                          {passwordHide
                            ? member?.Password
                              ? "********"
                              : "********"
                            : "********"}
                        </span>
                      </Row>
                    </Space>
                  </Card>
                  <NavLink
                    to={`/profileMember/edit/${member?.ID}`}
                    style={{
                      height: "5%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      style={{
                        background: "#678983",
                        width: "100%",
                      }}
                      icon={<EditOutlined />}
                    >
                      แก้ไขข้อมูล
                    </Button>
                  </NavLink>
                </div>
              </Content>
            </Content>
          </Content>
        </Content>
      
        <footer>
          <Footer />
        </footer>
      </Layout>
    </Layout>
  );
}
