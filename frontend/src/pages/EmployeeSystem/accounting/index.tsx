import { Button, Col, Divider, Modal, Row, Space, message, } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined, ScheduleOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { DeleteAccountingByID, GetAccounting } from "../../../services/https/accounting";
import { AccountingInterface } from "../../../interfaces/IAccounting";

function Accounting() {

    const columns: ColumnsType<AccountingInterface> = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
            render: (text, record, index) => index + 1,
        },
        {
            title: "วันที่", 
            dataIndex: "Date", 
            key: "date", 
            
        },
        {
            title: "ชื่อรายการ",
            dataIndex: "Name",
            key: "name",
        },
        {
            title: "จำนวนเงิน",
            dataIndex: "Amount",
            key: "amount",
            
        },
        {
            title: "คงเหลือ",
            dataIndex: "RemainAmount",
            key: "remainamount",
            
        },
        {
            title: "ประเภท",
            dataIndex: "AccountTypeID",
            key: "accounttype",
            
        },
        
        
        {
            title: "แก้ไข/ลบข้อมูล",
            dataIndex: "Manage",
            key: "manage",
            
        },
    ];


    const navigate = useNavigate();
    const [accountings, setAccountings] = useState<AccountingInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    // Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();

    const GetAccountings = async () => {
        let res = await GetAccounting();
        if (res) {
            setAccountings(res);
            console.log(res);
        }
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeleteAccountingByID(deleteId);
        if (res) {
            setOpen(false);
            messageApi.open({
                type: "success",
                content: "ลบข้อมูลสำเร็จ",
            });
            GetAccounting();
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
        GetAccountings();
    }, []);

    //Confirm
    const showModal = (val: AccountingInterface) => {
        setModalText(
            `คุณต้องการลบบันทึก "${val.Name}" หรือไม่ ?`
        );
        setDeleteId(val.ID);
        setOpen(true);
    };

    return (
        <>
            {contextHolder}
            <Row>
                <Col span={12}>
                    <h2>บันทึกรายรับรายจ่าย</h2>
                </Col>
                <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
                    <Space>
                        <Link to="/accounting/create">
                            <Button type="primary" icon={<PlusOutlined />} style={{ background: '#E48F44' }}>
                                เพิ่มบันทึก
                            </Button>
                        </Link>
                        <Link to="/history">
                            <Button type="primary" icon={<ScheduleOutlined />} style={{ background: '#ffff', color: '#E48F44', border: '1px solid #E48F44' }}>
                                ประวัติการบันทึก
                            </Button>
                        </Link>
                    </Space>
                </Col>
            </Row>
            <Divider />
            <div style={{ marginTop: 20 }}>
                <Table rowKey="ID" columns={columns} dataSource={accountings} />
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

export default Accounting;