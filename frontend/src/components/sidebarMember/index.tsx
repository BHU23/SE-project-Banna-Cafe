import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import "./sidebarMenu.css";
import { NavLink } from "react-router-dom";
import { MenuTypesInterface } from "../../interfaces/IMenuType";
import { GetMenuTypes } from "../../services/https/menu";
import { MembersInterface } from "../../interfaces/IMember";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
interface SidebarMemuProps {
  onSelectMenuType: (menuType: MenuTypesInterface) => void;
  member: MembersInterface | null;
}

export default function SidebarMemu({
  onSelectMenuType,
  member,
}: SidebarMemuProps) {
  const [menuTypes, setmenuTypes] = useState<MenuTypesInterface[]>([]);
  const [selectedMenuType, setSelectedMenuType] =
    useState<MenuTypesInterface>();
  const handleMenuTypeClick = (menuType: MenuTypesInterface) => {
    setSelectedMenuType(menuType);
    onSelectMenuType(menuType);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "คุณต้องการออกจากระบบหรือไม่ ?",
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      okButtonProps: { style: { background: "#333952", color: "white" } },
      cancelButtonProps: { style: { background: "white", color: "#333952" } },
      onOk: () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      },
    });
  };

  const getMenuTypes = async () => {
    let res = await GetMenuTypes();
    if (res) {
      setmenuTypes(res);
      onSelectMenuType(res[0]);
      setSelectedMenuType(res[0]);
    }
  };
  useEffect(() => {
    getMenuTypes();
  }, []);

  return (
    <div className="sidebar-menu1">
      <div className="top">
        <NavLink to="/menuPreorder">
          <div className="side-text home">Menu</div>
        </NavLink>
      </div>
      <div className="mid">
        <div className="side-menuType">
          <ul>
            {menuTypes.map((item, index) => {
              return (
                <li className="side-text">
                  <div
                    key={index}
                    className={`menutype-item${
                      selectedMenuType === item ? "active" : ""
                    }`}
                    onClick={() => handleMenuTypeClick(item)}
                  >
                    <span>{item.TypeName}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bottom">
        <NavLink to="/profileMember">
          <div className="side-text profile">
            <div className="side-text point">
              <span>{member?.Point}</span>
            </div>
            <p>Profile</p>
          </div>
        </NavLink>
        <NavLink to="#" className="logout" onClick={handleLogout}>
          <CiLogout />
          Logout
        </NavLink>
      </div>
    </div>
  );
}
