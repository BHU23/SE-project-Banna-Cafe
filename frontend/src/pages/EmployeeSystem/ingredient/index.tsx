import { Button, Col, Divider, Modal, Row, Space, message, } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined, ScheduleOutlined } from "@ant-design/icons";
import { IngredientsInterface } from "../../../interfaces/IIngredient";
import Table, { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { DeleteIngredientByID, GetIngredient } from "../../../services/https/ingredient";
import { DeleteHistoryByID } from "../../../services/https/history";

function Ingredient() {

    const columns: ColumnsType<IngredientsInterface> = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
            render: (text, record, index) => index + 1,
        },
        {
            title: "รูปวัตถุดิบ", // รูปไฟล์
            dataIndex: "IngredientImage", // Profile
            key: "ingredientimage", // profile
            render: (text, record, index) => (
                <img src={record.IngredientImage} className="w3-left w3-circle w3-margin-right" width="150px" />
            )
        },
        {
            title: "ชื่อวัตถุดิบ",
            dataIndex: "IngredientName",
            key: "ingredientname",
        },
        {
            title: "ประเภท",
            dataIndex: "IngredientType",
            key: "ingredienttype",
            render: (item) => Object.values(item.TypeName),
        },
        {
            title: "ราคา",
            dataIndex: "IngredientCost",
            key: "ingredientcost",
            render: (record) => (
                <div>{(record).toFixed(2)} ฿</div>
            )
        },
        {
            title: "จำนวน",
            dataIndex: "IngredientAmount",
            key: "ingredientamount",
        },
        {
            title: "หน่วย",
            dataIndex: "IngredientUnit",
            key: "ingredientunit",
            render: (item) => Object.values(item.UnitName),
        },
        {
            title: "วันหมดอายุ (Y/M/D)",
            dataIndex: "IngredientExpert",
            key: "ingredientexpert",
            render: (text, record, index) => (
                <div>{text.substring(0, 10)}</div>
            )
        },
        {
            title: "แก้ไข/ลบข้อมูล",
            dataIndex: "Manage",
            key: "manage",
            render: (text, record, index) => (
                <>
                    <Button onClick={() => navigate(`/ingredient/edit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
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
    const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    // Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();

    const GetIngredients = async () => {
        let res = await GetIngredient();
        if (res) {
            setIngredients(res);
            console.log(res);
        }
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeleteIngredientByID(deleteId);
        let resh = await DeleteHistoryByID(deleteId);
        if (res && resh) {
            setOpen(false);
            messageApi.open({
                type: "success",
                content: "ลบข้อมูลสำเร็จ",
            });
            GetIngredients();
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
        GetIngredients();
    }, []);

    //Show Model
    const showModal = (val: IngredientsInterface) => {
        setModalText(
            `คุณต้องการลบเมนู "${val.IngredientName}" หรือไม่ ?`
        );
        setDeleteId(val.ID);
        setOpen(true);
    };

    return (
        <>
            {contextHolder}
            <Row>
                <Col span={12}>
                    <h2>จัดการวัตถุดิบ</h2>
                </Col>
                <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
                    <Space>
                        <Link to="/ingredient/create">
                            <Button type="primary" icon={<PlusOutlined />} style={{ background: '#E48F44' }}>
                                เพิ่มวัตถุดิบ
                            </Button>
                        </Link>
                        <Link to="/history">
                            <Button type="primary" icon={<ScheduleOutlined />} style={{ background: '#ffff', color: '#E48F44', border: '1px solid #E48F44' }}>
                                ประวัติการนำเข้า
                            </Button>
                        </Link>
                    </Space>
                </Col>
            </Row>
            <Divider />
            <div style={{ marginTop: 20 }}>
                <Table rowKey="ID" columns={columns} dataSource={ingredients} />
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

export default Ingredient;