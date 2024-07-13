import { useState, useEffect } from "react";
import { PiBasketFill } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import SidebarMemu from "../../../components/sidebarMember";
import MenuAll from "./menu";
import AddMenuOrder from "./addMenuOrder";
import EditOrder from "./editOrder";
import MenuSlide from "./menuslide";
import Footer from "../../../components/footer";
import { GetMenus, DeleteMenuByID } from "../../../services/https/menu";
import { GetMenusByName } from "../../../services/https/order";
import { MenusInterface } from "../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../interfaces/IMenuType";
import Table, { ColumnsType } from "antd/es/table";
import "./menuOrder.css";
import { RatingsInterface } from "../../../interfaces/IRating";
import { GetRatings } from "../../../services/https/rating";
import { MembersInterface } from "../../../interfaces/IMember";
import { GetMemberById } from "../../../services/https/member";
import { Button, Col, Divider, Modal, Row, Space, message,Card,Popover,Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined, DeleteOutlined, EditOutlined, ScheduleOutlined } from "@ant-design/icons";

export default function MenuOrder() {
  const columns: ColumnsType<MenusInterface> = [
    {
        title: "ลำดับ",
        dataIndex: "ID",
        key: "id",
        render: (text, record, index) => index + 1,
    },
    {
        title: "รูปเมนู", 
        dataIndex: "MenuImage", 
        key: "menuimage",
        render: (text, record, index) => (
          <Popover content={<Image src={record.MenuImage} />} title="รูปเมนู">
            <img src={record.MenuImage} className="w3-left w3-circle w3-margin-right" width="50%"/>
          </Popover>
        ) 
        
    },
    {
        title: "ชื่อเมนู",
        dataIndex: "MenuName",
        key: "menuname",
        
    },
    {
        title: "ประเภท", 
        dataIndex: "MenuType",
        key: "menutype",
        render: (item) => Object.values(item.TypeName),
        
    },
    {
        title: "ราคา",
        dataIndex: "MenuCost",
        key: "menucost",
        render:(record)=>(
          <div>{(record).toFixed(2)} ฿</div>
        )
    },
    { render:() =>
      <Button  onClick={() =>  navigate(`/order`)} shape="circle" icon={<PlusOutlined />} size={"large"} />
    },
    
    
]; 
  const navigate = useNavigate();
  const [addMenupop, setAddmenupop] = useState(false);
  const [basketMenupop, setBasketMenupop] = useState(false);
  const [selectedMenuType, setSelectedMenuType] =
    useState<MenuTypesInterface | null>(null);

  const handleSelectMenuType = (menuType: MenuTypesInterface) => {
    setSelectedMenuType(menuType);
  };
  const [searchText, setSearchText] = useState(String);
  const [menusSearch, setMenusSearch] = useState<MenusInterface[]>([]);
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [menuslide, setMenuSlide] = useState<MenusInterface>();
  const [menu, setMenu] = useState<MenusInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const [ratings, setRatings] = useState<RatingsInterface[]>([]);

  const getMenusRating = async () => {
    let res = await GetRatings();
    if (res) {
      setRatings(res);
    }
  };
  const getMenus = async () => {
    let res = await GetMenus();
    if (res) {
      setMenus(res);
    }
  };
  const getMenusRatingByMenuId = (id: number | undefined): number  => {
    if (id === undefined) {
      return 0;
    }
    const menuRatings = ratings.filter((r) => r.MenuID === id);
    if (menuRatings.length === 0) {
      return 0;
    }
    let sumRating = 0;
    for (let i = 0; i < menuRatings.length; i++) {
      sumRating += menuRatings[i].Score || 0;
    }
    return sumRating / menuRatings.length;
  };

  const getMenusByMenuName = async (e: string) => {
    
    if (
      !(
        e.includes("/") ||
        e.includes("\\") ||
        e.includes("#") ||
        e.includes(".") ||
        e.includes("?") ||
        e.includes("%") ||
        !e.trim() 
      )
    ) {
      let res = await GetMenusByName(e);
      if (res) {
        setMenusSearch(res);
      }
    } else {
      setSearchText(searchText.length != 1 ? searchText : "");
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    e.preventDefault();
    getMenusByMenuName(e.target.value);
  };
  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getMenusByMenuName(searchText);
  };
  const [member, setMember] = useState<MembersInterface | null>(null);
  const getMemberByID = async (id: Number) => {
    let res = await GetMemberById(id);
    if (res) {
      setMember(res);
    }
  };
  useEffect(() => {
    getMemberByID(Number(localStorage.getItem("id")));
  }, []);
  useEffect(() => {
    getMenusRating();
    getMenus();
  }, []);
  return (
    <div>
      {contextHolder}
            <Row>
                <Col span={12}>
                    <h2>สร้างคำสั่งซื้อ</h2>
                </Col>
                <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
                   
                </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
    <Col span={14}>
      <Card 
      style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
      title="รายการเมนู" bordered={false}>  
         <div style={{ marginTop: 20 }}>
                <Table rowKey="ID" columns={columns} dataSource={menus} />
                
            </div >
      </Card>
    </Col>
    <Col span={10}>
      <Card title="รายการออเดอร์" bordered={false}>
        
      </Card>
    </Col>
  </Row>
    </div>
  );
}

