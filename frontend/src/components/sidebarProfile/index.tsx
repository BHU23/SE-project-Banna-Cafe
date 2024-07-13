import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import "../sidebarMember/sidebarMenu.css";
import { NavLink } from "react-router-dom";

import { SidebarMemberData } from "./data";
import { MembersInterface } from "../../interfaces/IMember";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
interface SidebarProflieProps {
  onSelect: string;
  member: MembersInterface | null;
}

export default function SidebarProflie({
  onSelect,
  member,
}: SidebarProflieProps) {
  const [selected, setSelected] = useState(onSelect);
  const handleselectedClick = (selected: string) => {
    setSelected(selected);
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
            {SidebarMemberData.map((item, index) => {
              return (
                <NavLink to={item.path}>
                  <li className={item.cName}>
                    <div
                      key={index}
                      className={`menutype-item${
                        selected === item.title ? "active" : ""
                      }`}
                      onClick={() => handleselectedClick(item.title)}
                    >
                      <span>{item.title}</span>
                    </div>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bottom">
        <NavLink to="/profileMember">
          <div className="side-text profile bar">
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
