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
import { ImageUpload } from "../../../../interfaces/IUpload";
import { IngredientTypesInterface } from "../../../../interfaces/IIngredientType";
import { IngredientsInterface } from "../../../../interfaces/IIngredient";
import { ResourceInterface } from "../../../../interfaces/IResource";
import { IngredientUnitsInterface } from "../../../../interfaces/IIngredientUnit";
import { CreateIngredient, GetIngredientTypes, GetLastIngredient, GetIngredientUnits } from "../../../../services/https/ingredient";
import { CreateResource, GetLastResource } from "../../../../services/https/resource";
import { IngredientResourceInterface } from "../../../../interfaces/IIngredientResource";
import { CreateIngredientResource } from "../../../../services/https/ingredientResource";
import { HistoryInterface } from "../../../../interfaces/IHistory";
import { CreateHistory } from "../../../../services/https/history";

const { Option } = Select;
function IngredientCreate() {

    const navigate = useNavigate();
    const handleCancel = () => { navigate("/ingredient"); };
    const [messageApi, contextHolder] = message.useMessage();
    const [ingredientimage, setIngredientImage] = useState<ImageUpload>();
    const [ingredientTypes, setIngredientTypes] = useState<IngredientTypesInterface[]>([]);
    const [ingredientUnits, setIngredientUnits] = useState<IngredientUnitsInterface[]>([]);

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    const onFinish = async (values: IngredientsInterface & ResourceInterface) => {
        values.IngredientImage = ingredientimage?.thumbUrl;
        values.IngredientAmount = parseInt(values.IngredientAmount!.toString(), 10);
        values.IngredientCost = parseFloat(values.IngredientCost!.toString());
        let resIngredient = await CreateIngredient(values);
        let resResource = await CreateResource(values);
        if (resIngredient.status && resResource.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/ingredient");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: "บันทึกข้อมูลไม่สำเร็จ",
            });
        }
        let ingredientresource: any = {
            IngredientID: await GetLastIngredient(),
            ResourceID: await GetLastResource(),
        };
        let idIngredientResource: IngredientResourceInterface & HistoryInterface = {
            IngredientID: ingredientresource.IngredientID.ID,
            ResourceID: ingredientresource.ResourceID.ID,
            Amount: ingredientresource.IngredientID.IngredientAmount,   // history interface
            ImportDate: new Date(),
        }
        await CreateIngredientResource(idIngredientResource);
        await CreateHistory(idIngredientResource);  // history interface
        console.log(idIngredientResource);
        console.log(values);
    };

    useEffect(() => {
        GetIngredientType();
        GetIngredientUnit();
    }, []);

    const GetIngredientType = async () => {
        let res = await GetIngredientTypes();
        if (res) {
            setIngredientTypes(res);
        }
    }; // select menuType to use (combobox)

    const GetIngredientUnit = async () => {
        let res = await GetIngredientUnits();
        if (res) {
            setIngredientUnits(res);
        }
    }; // select Unit to use (combobox)

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        setIngredientImage(e?.fileList[0])
        return e?.fileList;
    };
    return (
        <div>
            {contextHolder}
            <Card>
                <h2>เพิ่มข้อมูลวัตถุดิบ</h2>
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
                                label="ชื่อวัตถุดิบ"
                                name="IngredientName"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกชื่อวัตถุดิบ !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ราคา (บาท)"
                                name="IngredientCost"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกราคา !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item name="IngredientTypeID" label="ประเภทวัตถุดิบ" rules={[{ required: true, message: "กรุณาระบุประเภทวัตถุดิบ !", }]}>
                                <Select allowClear>
                                    {ingredientTypes.map((item) => (
                                        <Option value={item.ID} key={item.TypeName}>{item.TypeName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="จำนวน"
                                name="IngredientAmount"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกจำนวนวัตถุดิบ !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item name="IngredientUnitID" label="หน่วย" rules={[{ required: true, message: "กรุณาระบุหน่วย !", }]}>
                                <Select allowClear>
                                    {ingredientUnits.map((item) => (
                                        <Option value={item.ID} key={item.UnitName}>{item.UnitName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="วันหมดอายุ"
                                name="IngredientExpert"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณาเลือกวันหมดอายุ !",
                                    },
                                ]}
                            >
                                <DatePicker onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Form.Item
                            label="รูปวัตถุดิบ"
                            name="IngredientImage" // -> ใส่มาก่อน เพราะ setup data มาไม่มี Image
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        // rules={[{ required: true,  message: "กรุณาเพิ่มรูปภาพ !", }]}
                        >
                            <Upload maxCount={1} multiple={false} listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Row>
                    <br />
                    <h2>เพิ่มข้อมูลการนำเข้า</h2>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ชื่อบริษัท/แหล่งที่นำเข้า"
                                name="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกชื่อบริษัท/แหล่งที่นำเข้า !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ที่อยู่"
                                name="Address"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกรายละเอียดที่อยู่ !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="หมายเลขโทรศัพท์"
                                name="Phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกหมายเลขโทรศัพท์ !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Col style={{ marginTop: "40px" }}>
                            <Form.Item>
                                <Space>
                                    <Button htmlType="button" style={{ marginRight: "10px" }} onClick={handleCancel}>
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
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
}

export default IngredientCreate;