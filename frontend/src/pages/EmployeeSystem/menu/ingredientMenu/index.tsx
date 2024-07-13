import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetMenus, DeleteMenuByID, GetMenuById } from "../../../../services/https/menu";
import { DeleteIngredientMenuByID, GetIngredientMenus } from "../../../../services/https/ingredientMenu";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IngredientMenusInterface } from "../../../../interfaces/IIngredientMenu";
import { GetIngredient } from "../../../../services/https/ingredient";
import { IngredientsInterface } from "../../../../interfaces/IIngredient";

function IngredientMenus() {
  
  const columns: ColumnsType<IngredientMenusInterface> = [
    {
      title: "วัตถุดิบ",
      dataIndex: "Ingredient",
      key: "ingredient",
      render: (item) => Object.values(item.IngredientName),
    },
    {
      title: "จำนวน",
      dataIndex: "Amount",
      key: "amount",
    },
    {
      title: "หน่วย",
      dataIndex: "IngredientUnit",
      key: "ingredientunit",
      render: (item) => Object.values(item.UnitName),
    },
    {
      title: "ลบวัตถุดิบ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
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

  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [ingredientMenus, setIngredientMenus] = useState<IngredientMenusInterface[]>([]);
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([])

  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  let { id } = useParams();
  console.log(id);

  const getMenus = async () => {
    let res = await GetMenus();
    if (res) {
      setMenus(res);
    }
  };

  const getIngredients = async () => {
    let res = await GetIngredient();
    if (res) {
      setIngredients(res);
    }
  };

  const getIngredientMenus = async () => {
    let res = await GetIngredientMenus(Number(id));
    if (res) {
      setIngredientMenus(res);
    }
  };

  const showModal = (val: IngredientMenusInterface) => {
    setModalText(
      `คุณต้องการลบวัตถุดิบหรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let resIngredient = await DeleteIngredientMenuByID(deleteId);
    if (resIngredient) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบวัตถุดิบสำเร็จ",
      });
      getIngredientMenus();
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

  const [menuName, setMenuName] = useState<string>("");

  useEffect(() => {
    getIngredientMenus();
    const fetchMenuName = async () => {
      const res = await GetMenuById(Number(id)); // เรียกใช้งาน API หรือฟังก์ชันที่เรียกชื่อเมนูจาก ID
      if (res) {
        setMenuName(res.MenuName); // ตั้งค่าชื่อเมนูที่ได้จากการเรียก API
      }
    };
  
    fetchMenuName();
  }, [id]);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการวัตถุดิบเมนู - {menuName}</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to={`/menu/ingredientMenu/create/${id}`}>
              <Button type="primary" icon={<PlusOutlined />} style={{ background: '#E48F44' }}>
                เพิ่มวัตถุดิบ
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={ingredientMenus} />
      </div >
      <Modal
        title="ลบวัตถุดิบ"
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

export default IngredientMenus;