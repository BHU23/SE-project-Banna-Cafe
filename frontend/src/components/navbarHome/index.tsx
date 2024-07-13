import React from 'react'
import { NavLink, } from "react-router-dom";
import { NavbarHomeData } from './data';
import "./navbarHome.css";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
interface NavbatProps {
  onOpen: () => void;
}
const NavbarHome: React.FC<NavbatProps> = ({ onOpen }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  return (
    <nav className={"nav-home"}>
      {contextHolder}
      <ul className="nav-home-items">
        {NavbarHomeData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <NavLink to={item.path}>
                <span>{item.title}</span>
              </NavLink>
            </li>
          );
        })}
        <li
          className="nav-text"
          onClick={() => {
            if (
              localStorage.getItem("token") == "" ||
              !localStorage.getItem("token")
            ) {
              messageApi.open({
                type: "warning",
                content: "กรุณาเข้าสู่ระบบสำเร็จ",
              });
              onOpen();
            } else {
              navigate("/menuPreorder");
            }
          }}
        >
          <NavLink to={""}>
            <span>Shop Now</span>
          </NavLink>
        </li>
        <li className="nav-text" onClick={onOpen}>
          <NavLink to={"#"}>
            <span>Login</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default NavbarHome;