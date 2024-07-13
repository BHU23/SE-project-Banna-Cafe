import { useState, useEffect } from "react";
import SidebarProflie from "../../../../components/sidebarProfile";
import Footer from "../../../../components/footer";
import "../profileMember.css";
import { GetMemberById, UpdateMember } from "../../../../services/https/member";
import { MembersInterface } from "../../../../interfaces/IMember";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { ImageUpload } from "../../../../interfaces/IUpload";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Upload, Form, Input } from "antd";
import { Layout, Row, Col, Card, Typography, Space } from "antd";
import { CheckCircleOutlined, RollbackOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Meta } = Card;
const { Title, Text } = Typography;

export default function EditProfileMember() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<MembersInterface | null>(null);
  const [memberImage, setMemberImage] = useState<ImageUpload>();
  const [prevMenuImage, setPrevMemberImage] = useState<string | undefined>();
  const [initialFileList, setInitialFileList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setMemberImage(e?.fileList[0]);
    console.log(memberImage);
    return e?.fileList;
  };

  const onSubmitEditProfileMember = async (values: MembersInterface) => {
    values.ID = member?.ID;
    values.MemberImage = memberImage?.thumbUrl
      ? memberImage?.thumbUrl
      : prevMenuImage;
    let res = await UpdateMember(values);
    if (res.status) {
      message.success("แก้ไขข้อมูลสำเร็จ");
      setTimeout(function () {
        navigate("/profileMember");
      }, 1000);
    } else {
      message.error(res.message);
    }
  };
  const getMemberByID = async (id: Number) => {
    let res = await GetMemberById(id);
    if (res) {
      setMember(res);
      console.log(res);
      setPrevMemberImage(res.MemberImage);
      const initialFileList = res.MemberImage
        ? [
            {
              uid: "-1",
              name: "thumbnail.jpg",
              status: "done",
              url: res.MenuImage,
            },
          ]
        : [];
      setInitialFileList(initialFileList);
      form.setFieldsValue({
        Username: res.Username,
        Password: "",
        Email: res.Email,
        Phone: res.Phone,
        MemberImage: initialFileList,
      });
    }
  };
  useEffect(() => {
    getMemberByID(Number(id));
  }, []);

  return (
    <Layout className="ProfileMember">
      <Layout className="sidebarProflie">
        <SidebarProflie onSelect={"ข้อมูล"} member={member} />
      </Layout>
      <Layout className="contentprofile">
        <Content
          style={{
            height: "auto",
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
              height: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Content
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "20px",
                boxShadow:
                  "-4px 4px 4px 0px rgba(0, 0, 0, 0.25) inset, 4px -4px 4px 0px rgba(0, 0, 0, 0.25) inset",
              }}
            >
              <Form
                name="basic"
                form={form}
                layout="vertical"
                onFinish={onSubmitEditProfileMember}
                autoComplete="off"
                style={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                  flexWrap:"wrap"
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: "83vh",
                    gap: "20px",
                    display: "flex",
                    justifyContent: "center",
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
                    แก้ไขข้อมูลส่วนตัว
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
                  <Form.Item
                    name="MemberImage"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    style={{
                      width: 300,
                      height: "70%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      backgroundColor: "#F0E9D2",
                      color: "#181D31",
                    }}
                  >
                    <Upload
                      maxCount={1}
                      multiple={false}
                      listType="picture-card"
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 6,
                            color: "#181D31",
                          }}
                        >
                          เปลี่ยนรูปภาพ
                        </div>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
                <Card
                  style={{
                    width: 300,
                    height: "80vh",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px",
                    gap: "20px",
                    
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "80%",
                    }}
                  >
                    <Row gutter={[15, 15]}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item
                          label="Name:"
                          name="Username"
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "กรุณากรอกชื่อ !",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item
                          label="Email:"
                          name="Email"
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "กรุณากรอกอีเมล !",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item
                          label="Phone:"
                          name="Phone"
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "กรุณาหมายเลขโทรศัพท์ !",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item
                          label="Password:"
                          name="Password"
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "กรุณากรอกรหัสผ่าน !",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      height: "20%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="custom-primary-btn"
                      style={{
                        background: "#678983",
                        width: "100%",
                      }}
                      icon={<CheckCircleOutlined />}
                    >
                      ยืนยันข้อมูล
                    </Button>
                    <NavLink
                      to={`../profileMember`}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Button
                        type="primary"
                        style={{
                          background: "#181D31",
                          width: "100%",
                        }}
                        icon={<RollbackOutlined />}
                      >
                        ยกเลิก
                      </Button>
                    </NavLink>
                  </div>
                </Card>
              </Form>
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
