import React, { useEffect, useState } from "react";
import { PromotionInterface } from "../../../interfaces/IPromotion";
import { PlusOutlined, DeleteOutlined, EditOutlined, ScheduleOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Col, Divider, Modal, Row, Space, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DeletePromotionByID, GetPromotion } from "../../../services/https/promotion";

function Promotion() {

    const columns: ColumnsType<PromotionInterface> = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
            render: (text, record, index) => index + 1,
        },
        {
            title: "รหัสโปรโมชั่น",
            dataIndex: "Code",
            key: "code",
        },
        {
            title: "ชื่อ",
            dataIndex: "Name",
            key: "name",
        },
        {
            title: "รูปภาพ",
            dataIndex: "Image",
            key: "image",
            render: (text, record, index) => (
                <img src={record.Image} className="w3-left w3-circle w3-margin-right" width="50px" />
            )
        },
        {
            title: "เวลาเริ่ม",
            dataIndex: "TimeOfbegin",
            key: "timeofbegin",
            render: (text, record, index) => (
                <div>{text.substring(0, 10)}</div>
            )
        },
        {
            title: "เวลาสิ้นสุด",
            dataIndex: "TimeOfend",
            key: "timeofend",
            render: (text, record, index) => (
                <div>{text.substring(0, 10)}</div>
            )
        },
        {
            title: "จำนวนส่วนลด",
            dataIndex: "Discount",
            key: "discount",
            render: (record) => (
                <div>{(record).toFixed(2)} ฿</div>
            )
        },
        {
            title: "พนักงานที่รับผิดชอบ",
            dataIndex: "Employee",
            key: "employee",
            render: (item) => Object.values(item.FirstName),
        },
        {
            title: "แก้ไข/ลบข้อมูล",
            dataIndex: "Manage",
            key: "manage",
            render: (text, record, index) => (
                <>
                    <Button onClick={() => navigate(`/promotion/edit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
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
    const [promotions, setPromotions] = useState<PromotionInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    // Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();

    const GetPromotions = async () => {
        let res = await GetPromotion();
        if (res) {
            setPromotions(res);
            console.log(res);
        }
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeletePromotionByID(deleteId);
        if (res) {
            setOpen(false);
            messageApi.open({
                type: "success",
                content: "ลบข้อมูลสำเร็จ",
            });
            GetPromotions();
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
        GetPromotions();
    }, []);

    //Show Model
    const showModal = (val: PromotionInterface) => {
        setModalText(
            `คุณต้องการลบโปรโมชั่น "${val.Name}" หรือไม่ ?`
        );
        setDeleteId(val.ID);
        setOpen(true);
    };




    return (
        <>
            {contextHolder}
            <Row>
                <Col span={12}>
                    <h2>จัดการโปรโมชั่น</h2>
                </Col>
                <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
                    <Space>
                        <Link to="/promotion/create">
                            <Button type="primary" icon={<PlusOutlined />} style={{ background: '#E48F44' }}>
                                เพิ่มโปรโมชั่น
                            </Button>
                        </Link>
                    </Space>
                </Col>
            </Row>
            <Divider />
            <div style={{ marginTop: 20 }}>
                <Table rowKey="ID" columns={columns} dataSource={promotions} />
            </div >
            <Modal
                title="ลบข้อมูล ?"
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

export default Promotion;