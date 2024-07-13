import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import moment from 'moment';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate, useParams } from "react-router-dom";
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
import { IngredientsInterface } from "../../../../interfaces/IIngredient";
import { ResourceInterface } from "../../../../interfaces/IResource";
import { ImageUpload } from "../../../../interfaces/IUpload";
import { IngredientTypesInterface } from "../../../../interfaces/IIngredientType";
import { IngredientUnitsInterface } from "../../../../interfaces/IIngredientUnit";
import { GetIngredientById, GetIngredientTypes, UpdateIngredient, GetIngredientUnits } from "../../../../services/https/ingredient";
import { GetResourceById, UpdateResource } from "../../../../services/https/resource";
import { HistoryInterface } from "../../../../interfaces/IHistory";
import { UpdateHistory } from "../../../../services/https/history";

const { Option } = Select;
function IngredientEdit() {

    useEffect(() => {
        GetIngredientsByID();
        GetResourcesByID();
        GetIngredientType();
        GetIngredientUnit();
    }, []);

    const navigate = useNavigate();
    const handleCancel = () => { navigate("/ingredient"); };
    const [messageApi, contextHolder] = message.useMessage();
    const [ingredient, setIngredient] = useState<IngredientsInterface>();
    const [resource, setResource] = useState<ResourceInterface>();
    const [ingredientimage, setIngredientImage] = useState<ImageUpload>();
    const [ingredientTypes, setIngredientTypes] = useState<IngredientTypesInterface[]>([]);
    const [ingredientUnits, setIngredientUnits] = useState<IngredientUnitsInterface[]>([]);

    dayjs.extend(customParseFormat);
    const dateTimeString = ingredient?.IngredientExpert;
    const formattedDate = moment(dateTimeString).format('YYYY-MM-DD');

    // รับข้อมูลจาก params
    let { id } = useParams();
    // อ้างอิง form กรอกข้อมูล
    const [form] = Form.useForm();

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    const onFinish = async (values: IngredientsInterface & ResourceInterface & HistoryInterface) => {
        values.IngredientImage = ingredientimage?.thumbUrl;
        values.Amount = parseInt(values.IngredientAmount!.toString(), 10);  // HistoryInterface
        values.IngredientAmount = parseInt(values.IngredientAmount!.toString(), 10);
        values.IngredientCost = parseFloat(values.IngredientCost!.toString());
        values.ID = ingredient?.ID
        values.IngredientID = ingredient?.ID // HistoryInterface

        if (!values.IngredientImage) {
            values.IngredientImage = prevIngredientImage;
        } // more

        let resIngredient = await UpdateIngredient(values);
        let resResource = await UpdateResource(values);
        let resHistory = await UpdateHistory(values);  // HistoryInterface
        if (resIngredient.status && resResource.status && resHistory.status) {  //  && resHistory.status
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
        console.log(values);
    };

    const GetIngredientsByID = async () => {
        let res = await GetIngredientById(Number(id));
        if (res) {
            setIngredient(res);
            seprevIngredientImage(res.IngredientImage); // more
            // set form ข้อมูลเริ่มของผู้ใช้ที่เราแก้ไข
            form.setFieldsValue({
                IngredientName: res.IngredientName,
                IngredientCost: res.IngredientCost,
                IngredientTypeID: res.IngredientTypeID,
                IngredientAmount: res.IngredientAmount,
                IngredientUnitID: res.IngredientUnitID
            });
        }
    };
    const GetResourcesByID = async () => {
        let res = await GetResourceById(Number(id));
        if (res) {
            setResource(res);
            // set form ข้อมูลเริ่มของผู้ใช้ที่เราแก้ไข
            form.setFieldsValue({
                Name: res.Name,
                Address: res.Address,
                Phone: res.Phone,
            });
        }
    };

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

    const [prevIngredientImage, seprevIngredientImage] = useState<string | undefined>(); // more

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
                <h2>แก้ไขข้อมูลวัตถุดิบ</h2>
                <Divider />
                <Form
                    name="basic"
                    form={form}
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
                                label="วันหมดอายุ (ต้องเพิ่มใหม่ทุกครั้งที่ทำการแก้ไข)"
                                name="IngredientExpert"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณาเลือกวันหมดอายุ !",
                                    },
                                ]}
                            >
                                <DatePicker defaultValue={dayjs(formattedDate, formattedDate)} onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Form.Item
                            label="รูปวัตถุดิบ"
                            name="IngredientImage" // -> ใส่มาก่อน เพราะ setup data มาไม่มี Image
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        // rules={[{ required: true, message: "กรุณาเพิ่มรูปภาพ !", }]}
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
                    <h2>แก้ไขข้อมูลข้อมูลการนำเข้า</h2>
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

export default IngredientEdit;