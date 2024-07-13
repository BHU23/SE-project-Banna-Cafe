import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message, Popover, Image } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetMembers, DeleteMemberByID } from "../../../services/https/member";
import { MembersInterface } from "../../../interfaces/IMember";
import { Link, useNavigate } from "react-router-dom";

function Members() {
  
  const columns: ColumnsType<MembersInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
        title: "รูปโปรไฟล์",
        dataIndex: "MemberImage",
        key: "memberimage",
        render: (text, record, index) => (
          <Popover content={<Image src={record.MemberImage} />} title="รูปโปรไฟล์">
            <img src={record.MemberImage} className="w3-left w3-circle w3-margin-right" width="50%" style={{ borderRadius: "25%" }}/>
          </Popover>
        )
      },
    {
      title: "ชื่อผู้ใช้งาน",
      dataIndex: "Username",
      key: "username",
    },
    {
      title: "อีเมล",
      dataIndex: "Email",
      key: "email",
    },
    {
        title: "รหัสผ่าน",
        dataIndex: "Password",
        key: "password",
        render: () => (
          <span>********</span>
        ),
      },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "Phone",
      key: "phone",
    },
    {
        title: "คะแนนสะสม",
        dataIndex: "Point",
        key: "point",
        render:(record)=>(
          <div>{(record)} พ้อยท์</div>
        )
      },
    {
      title: "แก้ไข/ลบสมาชิก",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button  onClick={() =>  navigate(`/member/edit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const navigate = useNavigate();

  const [members, setMembers] = useState<MembersInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getMembers = async () => {
    let res = await GetMembers();
    if (res) {
      setMembers(res);
    }
  };

  const showModal = (val: MembersInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูลสมาชิก "${val.Username}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteMemberByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบสมาชิกสำเร็จ",
      });
      getMembers();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลสมาชิก</h2>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={members} />
      </div>
      <Modal
        title="ลบสมาชิก"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

export default Members;
