import React, { useState, useEffect, useId } from "react";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../../interfaces/IMenuType";
import { GetMenuTypes, GetMenuById, UpdateMenu, DeleteMenuByID } from "../../../../services/https/menu";
import { useNavigate, useParams } from "react-router-dom";
import { GetIngredientMenuById, UpdateIngredientMenu, GetIngredientUnits } from "../../../../services/https/ingredientMenu";
import { IngredientMenusInterface } from "../../../../interfaces/IIngredientMenu";
import { IngredientsInterface } from "../../../../interfaces/IIngredient";
import { GetIngredients } from "../../../../services/https/ingredientMenu";
import { GetIngredientById } from "../../../../services/https/ingredient";
import { ImageUpload } from "../../../../interfaces/IUpload";
import { IngredientUnitsInterface } from "../../../../interfaces/IIngredientUnit";

const { Option } = Select;

function MenuEdit() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [menu, setMenu] = useState<MenusInterface>();
  const [ingredientMenu, setIngredientMenu] = useState<IngredientMenusInterface>();
  const [menuTypes, setMenuTypes] = useState<MenuTypesInterface[]>([]);
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]);
  const [menuImage, setMenuImage] = useState<ImageUpload>()
  const [ingredientUnits, setIngredientUnits] = useState<IngredientUnitsInterface[]>([]);

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: MenusInterface & IngredientMenusInterface) => {
    values.ID = menu?.ID;
    // values.MenuCost = parseInt(values.MenuCost! .toString(), 10) // edit by saran :D
    values.MenuCost = parseFloat(values.MenuCost!.toString());
    values.MenuImage = menuImage?.thumbUrl;
    values.Amount = parseInt(values.Amount!.toString(), 10);
    values.MenuStatus = parseInt(values.MenuStatus!.toString(), 10);

    if(!values.MenuImage) {
      values.MenuImage = prevMenuImage;
    }

    let resMenu = await UpdateMenu(values);
    if (resMenu.status) {
      let resIngredientMenu = await UpdateIngredientMenu(values);
      if (resIngredientMenu.status) {
        messageApi.open({
          type: "success",
          content: "แก้ไขเมนูสำเร็จ",
        });
        setTimeout(function () {
          navigate("/menu");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: resIngredientMenu.message,
        });
      }
    } else {
      messageApi.open({
        type: "error",
        content: resMenu.message,
      });
    }
  };

  const getMenuType = async () => {
    let res = await GetMenuTypes();
    if (res) {
      setMenuTypes(res);
    }
  }; // select menuType to use (combobox)

  const getIngredientUnit = async () => {
    let res = await GetIngredientUnits();
    if (res) {
      setIngredientUnits(res);
    }
  };

  const getIngredient = async () => {
    let res = await GetIngredients();
    if (res) {
      setIngredients(res);
    }
  }; // select ingredient to use (combobox)

  const getMenuById = async () => {
    let res = await GetMenuById(Number(id));
    if (res) {
      setMenu(res);
      setPrevMenuImage(res.MenuImage);

      const initialFileList = res.MenuImage
      ? [
          {
            uid: '-1',
            name: 'thumbnail.jpg',
            status: 'done',
            url: res.MenuImage,
          },
        ]
      : [];
      setInitialFileList(initialFileList);

      // set form ข้อมูลเริ่มของผู้ใช้ที่เราแก้ไข
      form.setFieldsValue({ 
        MenuName: res.MenuName ,
        MenuNameEng: res.MenuNameEng ,
        MenuCost: res.MenuCost ,
        MenuTypeID: res.MenuTypeID ,
        MenuID: res.MenuID,
        MenuStatus: res.MenuStatus.toString(),
        MenuImage: initialFileList
      });
    }
  };

  const getIngredientMenuById = async () => {
    let res = await GetIngredientMenuById(Number(id));
    if (res) {
      setIngredientMenu(res);
      form.setFieldsValue({
        Amount: res.Amount,
        IngredientID: res.IngredientID,
        IngredientUnitID: res.IngredientUnitID,
      });
    }
  };

  useEffect(() => {
    getMenuType();
    getMenuById();
    getIngredient();
    getIngredientMenuById();
    getMenuById();
    getIngredientUnit();
  }, []);

  const [prevMenuImage, setPrevMenuImage] = useState<string | undefined>();
  const [initialFileList, setInitialFileList] = useState<any[]>([]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setMenuImage(e?.fileList[0])
    return e?.fileList;
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>แก้ไขข้อมูลเมนู</h2>
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
                label="ชื่อเมนู (TH)"
                name="MenuName"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "กรุณากรอกชื่อเมนู ! (ยาวไม่เกิน 30 ตัวอักษร)",
                  },
                  {
                    validator: (_, value) => {
                      if (/[!*&_+\-\/?%$#@^]/.test(value)) {
                        return Promise.reject("กรุณากรอกชื่อเมนู ที่ไม่มีอักษรพิเศษ");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อเมนู (ENG)"
                name="MenuNameEng"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "กรุณากรอกชื่อเมนู ! (ยาวไม่เกิน 30 ตัวอักษร)",
                  },
                  {
                    validator: (_, value) => {
                      if (/[\u0E00-\u0E7F]/.test(value)) {
                        return Promise.reject("กรุณากรอกชื่อเมนู เป็นภาษาอังกฤษเท่านั้น");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ราคาเมนู"
                name="MenuCost"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกราคาเมนู ! (เลขทศนิยมไม่เกิน 2 ตำแหน่ง)",
                  },
                  {
                    validator: (_, value) => {
                      if (value && /[ก-ฮA-Zเ-ไ]/.test(value)) {
                        return Promise.reject("กรุณากรอกราคาเมนูเป็นตัวเลข");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="MenuTypeID"
                label="ประเภทเมนู"
                rules={[{ required: true, message: "กรุณาระบุประเภทเมนู !" }]}
              >
                <Select allowClear>
                  {menuTypes.map((item) => (
                    <Option value={item.ID} key={item.TypeName}>
                      {item.TypeName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="สถานะเมนู"
                name="MenuStatus"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกสถานะเมนู !",
                  },
                ]}
              >
                <Select allowClear>
                  <Option value="1" renderOption={() => "พร้อมขาย"}>พร้อมขาย</Option>
                  <Option value="2" renderOption={() => "ไม่พร้อมขาย"}>ไม่พร้อมขาย</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientID" label="วัตถุดิบหลัก" 
                rules={[{
                  required: true,  message: "กรุณาระบุวัตถุดิบหลัก !",
                }]}>
                <Select allowClear>
                  {ingredients.map((item) => (
                    <Option value={item.ID} key={item.IngredientName}>{item.IngredientName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวนวัตถุดิบ"
                name="Amount"
                rules={[
                  { required: true, 
                    message: "กรุณากรอกจำนวนวัตถุดิบ ! (เลขไม่เกิน 4 หลัก)", 
                  },
                  {
                    pattern: /^(?!0)\d{1,4}$/,
                    message: "จำนวนไม่สามารถมีค่าเป็น 0 ได้ และจำนวนต้องไม่เกิน 4 หลัก",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientUnitID" label="หน่วย" rules={[{ required: true,  message: "กรุณาระบุหน่วยวัตถุดิบ !", }]}>
                <Select allowClear>
                  {ingredientUnits.map((item) => (
                    <Option value={item.ID} key={item.UnitName}>{item.UnitName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="รูปเมนู"
                name="MenuImage"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload maxCount={1} multiple={false} listType="picture-card"
                  defaultFileList={initialFileList}
                  showUploadList={{
                    showPreviewIcon: false, // ปิดไอคอนดูรูปภาพ
                    showRemoveIcon: false, // ปิดไอคอนลบ
                  }}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                  </div>
                </Upload>
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
                    style={{background: '#E48F44'}}
                  >
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="MenuID"></Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default MenuEdit;
