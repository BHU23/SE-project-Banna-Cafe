import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DatePickerProps } from 'antd';
import {
    Space,
    Button,
    Col,
    Row,
    Divider,
    Form,
    Input,
    Card,
    message,
    Upload,
    Select,
    DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AccountTypeInterface } from "../../../../interfaces/IAccounting";
import { AccountingInterface } from "../../../../interfaces/IAccounting";
import { CreateAccounting, GetAccountTypes, GetAccounting } from "../../../../services/https/accounting";


const { Option } = Select;
function AccountingCreate() {

    const navigate = useNavigate();
    const handleCancel = () => { navigate("/accounting"); };
    const [messageApi, contextHolder] = message.useMessage();
    const [accountTypes, setAccountTypes] = useState<AccountTypeInterface[]>([]);
    

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    const onFinish = async (values: AccountingInterface) => {
        
        let resAccounting = await CreateAccounting(values);
        if (resAccounting.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/accounting");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: "บันทึกข้อมูลไม่สำเร็จ",
            });
        }
        
        
        
    };

    useEffect(() => {
        GetAccountType();
    }, []);

    const GetAccountType = async () => {
        let res = await GetAccountTypes();
        if (res) {
            setAccountTypes(res);
        }
    }; // select menuType to use (combobox)

    
    
    return (
        <div>
            {contextHolder}
            <Card>
                <h2>เพิ่มรายการ</h2>
                <Divider />
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ชื่อบัญชี"
                                name="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกชื่อบัญชี !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="วันที่"
                                name="Date"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกวันที่ !",
                                    },
                                ]}
                            >
                                <DatePicker onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item name="AccountTypeID" label="ประเภทบัญชี" rules={[{ required: true, message: "กรุณาระบุประเภทบัญชี !", }]}>
                                <Select allowClear>
                                    {accountTypes.map((item) => (
                                        <Option value={item.ID} key={item.Name}>{item.Name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="จำนวนเงิน"
                                name="Amount"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกจำนวนเงิน !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    <br />
                            <Form.Item>
                                <Space>
                                    <Button htmlType="button" style={{ marginRight: "5px" }} onClick={handleCancel}>
                                        ยกเลิก
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={<PlusOutlined />}
                                        style={{ background: '#E48F44' }}
                                    >
                                        ยืนยัน
                                    </Button>
                                </Space>
                            </Form.Item>
                    </Row>
                </Form>
            </Card>
        </div>
    );
}

export default AccountingCreate;