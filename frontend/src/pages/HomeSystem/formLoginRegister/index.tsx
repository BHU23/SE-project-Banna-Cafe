import { useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import Login from "./login";
import Register from "./register";
import "./login.css";
interface LoginLoginRegisterProps {
  onClose: () => void;
}
const LoginRegister: React.FC<LoginLoginRegisterProps> = ({ onClose }) => {
  const [registerslide, setRegisterslide] = useState(false);
  return (
    <div className="wrapper-login">
      <div className="card-login">
        <span className="icon-close" onClick={onClose}>
          <IoRestaurantOutline />
        </span>
        <div className="form-register">
          <Register slideRegisters={() => setRegisterslide(false)} />
        </div>
        <div className="form-login">
          <Login slideRegisters={() => setRegisterslide(true)} />
        </div>
        <div className={`${registerslide ? "logo-login2" : "logo-login1"}`}>
          <div className="circle l1">
            <span className="circle l2">banna</span>
          </div>
          <div className="text-login">
            <span>Let Me be Your Life.</span>
            <div className="img-leave"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginRegister;
