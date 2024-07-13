import React, { useEffect, useState } from "react";
import { HistoryInterface } from "../../../interfaces/IHistory";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Divider, Form, Row, Space, Table, message } from "antd";
import { GetHistory } from "../../../services/https/history";
import { ColumnsType } from "antd/es/table";

function History() {

    const columns: ColumnsType<HistoryInterface> = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
        },
        {
            title: "ไอดีวัตถุดิบ",
            dataIndex: "IngredientID",
            key: "ingredientID",
        },
        {
            title: "ชื่อวัตถุดิบ",
            dataIndex: "Ingredient",
            key: "ingredient",
            render: (item) => Object.values(item.IngredientName),
        },
        {
            title: "วันที่นำเข้า",
            dataIndex: "ImportDate",
            key: "importdate",
            render: (text, record, index) => (
                <div>{text.substring(0, 10)}</div>
            ),
        },
        {
            title: "วันหมดอายุ",
            dataIndex: "Ingredient",
            key: "ingredient",
            render: (item, text) => Object.values(item.IngredientExpert.substring(0, 10)),
        },
        {
            title: "จำนวนที่นำเข้า",
            dataIndex: "Amount",
            key: "amount",
        }
    ];

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [histories, setHistories] = useState<HistoryInterface[]>([]);
    // Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();
    const handleCancel = () => { navigate("/ingredient"); };
    const GetHistories = async () => {
        let res = await GetHistory();
        if (res) {
            setHistories(res);
        }
    };

    useEffect(() => {
        GetHistories();
    }, []);

    return (
        <>
            {contextHolder}
            <Row>
                <Col span={12}>
                    <h2>ประวัติการนำเข้าวัตถุดิบ</h2>
                </Col>
            </Row>
            <Divider />
            <div style={{ marginTop: 20 }}>
                <Table rowKey="ID" columns={columns} dataSource={histories} />
            </div>
        </>
    );
}

export default History;