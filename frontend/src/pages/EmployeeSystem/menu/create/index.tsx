import React, { useState, useEffect } from "react";
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
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../../interfaces/IMenuType";
import { IngredientMenusInterface } from "../../../../interfaces/IIngredientMenu";
import { IngredientsInterface } from "../../../../interfaces/IIngredient";
import { ImageUpload } from "../../../../interfaces/IUpload";
import { CreateMenu, DeleteMenuByID, GetMenuTypes } from "../../../../services/https/menu";
import { CreateIngredientMenu, DeleteIngredientMenuByID, GetIngredients, GetIngredientUnits } from "../../../../services/https/ingredientMenu";
import { useNavigate } from "react-router-dom";
import { IngredientUnitsInterface } from "../../../../interfaces/IIngredientUnit";
import { GetLatestMenuID } from "../../../../services/https/menu";

const { Option } = Select;

function MenuCreate() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };
  
  const [messageApi, contextHolder] = message.useMessage();
  const [menuTypes, setMenuTypes] = useState<MenuTypesInterface[]>([]);
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]);
  const [menuImage, setMenuImage] = useState<ImageUpload>()
  const [ingredientUnits, setIngredientUnits] = useState<IngredientUnitsInterface[]>([]);
  const [latestMenuID, setLatestMenuID] = useState<number | undefined>(undefined);
  console.log (menuTypes);

  const onFinish = async (values: MenusInterface & IngredientMenusInterface) => {
    
    let lastestID = await GetLatestMenuID();
    if (lastestID == false) {
      values.MenuID = 1;
    } else if (lastestID !== false) {
      lastestID += 1;
      values.MenuID = lastestID;
    } else {
      messageApi.open({
        type: "error",
        content: "Error Krub :("
      })
      return;
    }
    console.log()
    values.MenuImage = menuImage?.thumbUrl;
    // values.MenuCost = parseInt(values.MenuCost! .toString(), 10); // edit by saran :D
    values.MenuCost = parseFloat(values.MenuCost!.toString());
    values.Amount = parseInt(values.Amount!.toString(), 10);
    values.MenuStatus = parseInt(values.MenuStatus!.toString(), 10);
    
    console.log(values.MenuID);

    // CreateMenu
    let resMenu = await CreateMenu(values);
    if (resMenu.status) {
      let resIngredientMenu = await CreateIngredientMenu(values);
      if (resIngredientMenu.status) {
        messageApi.open({
          type: "success",
          content: "เพิ่มเมนูสำเร็จ",
        });
        setTimeout(function () {
          navigate("/menu");
        }, 2000);
      } else {
        await DeleteMenuByID(values.MenuID);
        messageApi.open({
          type: "error",
          content: resIngredientMenu.message,
        });
      }
    } else {
      await DeleteIngredientMenuByID(values.MenuID);
      await DeleteMenuByID(values.MenuID);
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
  }; // select menuUnit to use (combobox)

  const getIngredient = async () => {
    let res = await GetIngredients();
    if (res) {
      setIngredients(res);
    }
  }; // select ingredient to use (combobox)

  useEffect(() => {
    getMenuType();
    getIngredient();
    getIngredientUnit();
    const fetchLatestMenuID = async () => {
      const latestID = await GetLatestMenuID();
      setLatestMenuID(latestID); // Set the latest menu ID retrieved from the backend
    };
    fetchLatestMenuID();
  }, []);

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
        <h2>เพิ่มข้อมูลเมนู</h2>
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
                      let invalidWords = [];
                      if (/[!*&_+\-\/?%$#@^]/.test(value)) {
                        return Promise.reject("กรุณากรอกชื่อเมนู ที่ไม่มีอักษรพิเศษ");
                      }
                      if (/กู/i.test(value)) {
                        invalidWords.push("กู");
                      }
                      if (/มึง/i.test(value)) {
                        invalidWords.push("มึง");
                      }
                      if (/สัส/i.test(value)) {
                        invalidWords.push("สัส");
                      }
                      if (/เหี้ย/i.test(value)) {
                        invalidWords.push("เหี้ย");
                      }
                      if (invalidWords.length > 0) {
                        const invalidWordsString = invalidWords.map(word => `"${word}"`).join(', ');
                        return Promise.reject(`ชื่อเมนูไม่ควรมีคำว่า ${invalidWordsString} กรุณาเปลี่ยนชื่อเมนู`);
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
                    whitespace: true,
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
              <Form.Item name="MenuTypeID" label="ประเภทเมนู" 
              rules={[{ required: true,  message: "กรุณาระบุประเภทเมนู !", }]}
              >
                <Select allowClear>
                  {menuTypes.map((item) => (
                    <Option value={item.ID} key={item.ID?.toString()}>{item.TypeName}</Option> // P'Joo
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
                    whitespace: true,
                    message: "กรุณากรอกสถานะเมนู !",
                  },
                ]}
              >
                <Select allowClear>
                  <Option value="1">พร้อมขาย</Option>
                  <Option value="2">ไม่พร้อมขาย</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientID" label="วัตถุดิบหลัก" 
              rules={[{ required: true,  message: "กรุณาระบุวัตถุดิบหลัก !", }]}
              >
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
                    whitespace: true, 
                    message: "กรุณากรอกจำนวนวัตถุดิบ ! (เลขไม่เกิน 4 หลัก)", 
                  },
                  {
                    validator: (_, value) => {
                      const numericValue = parseFloat(value);
                      if (numericValue == 0) {
                        return Promise.reject("จำนวนไม่สามารถมีค่าเป็น 0 ได้")
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
              <Form.Item name="IngredientUnitID" label="หน่วย" 
              rules={[{ required: true,  message: "กรุณาระบุหน่วยวัตถุดิบ !", }]}
              >
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
                <Upload maxCount={1} multiple={false} listType="picture-card">
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
        </Form>
      </Card>
    </div>
  );
}

export default MenuCreate;
