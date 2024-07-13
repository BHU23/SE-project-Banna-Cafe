import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { MembersInterface } from "../../../../interfaces/IMember";
import "../login.css";
import { LoginMember } from "../../../../services/https/member";
import { MenusInterface } from "../../../../interfaces/IMenu";
interface LoginProps {
  slideRegisters: () => void;
}
const Login: React.FC<LoginProps> = ({ slideRegisters }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<MembersInterface>({
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const onSubmitLogin = async () => {
    const values = {
      Email: watch("Email"),
      Password: watch("Password"),
    };
    const res = await LoginMember(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "เข้าสู่ระบบสำเร็จ",
      });
      if (res.message) {
        localStorage.setItem("token", res.message.token);
        localStorage.setItem("id", res.message.id);
        localStorage.setItem("position", res.message.position);
      }
      console.log(localStorage);
      setTimeout(() => {
        if (res.message.position == "Member") {
          window.location.reload();
        } else if (res.message.position == "Employee") {
          window.location.reload();
        } else {
          window.location.reload();
        }
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  return (
    <form
      name="basic"
      // onSubmit={handleSubmit((data) => onSubmitLogin(data))}
      autoComplete="off"
      className="form-box login"
    >
      {contextHolder}
      <h2>Login</h2>
      <div className="input-box">
        <span className="icon">
          <MdOutlineMail />
        </span>
        <input
          type="text"
          aria-autocomplete="none"
          {...register("Email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
        />
        <label>Email</label>
      </div>
      {errors.Email && <p className="errorMsg">{errors.Email.message}</p>}
      <div className="input-box">
        <span className="icon">
          <MdOutlineLock />
        </span>
        <input
          type="password"
          aria-autocomplete="none"
          defaultValue={""}
          {...register("Password", {
            required: true,
            validate: {
              checkLength: (value) => value && value.length >= 8,
              matchPattern: (value) =>
                value
                  ? // ? /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(value)
                  : false,
            },
          })}
        />
        <label>Password</label>
      </div>
      {errors.Password?.type === "required" && (
        <p className="errorMsg">Password is required.</p>
      )}
      {errors.Password?.type === "checkLength" && (
        <p className="errorMsg">Password should be at-least 8 characters.</p>
      )}
      <div className="remember-forgot">
        <label>
          <input type="checkbox" /> ReMember me
        </label>
        <Link to="#">Forgot Password?</Link>
      </div>
      <div onClick={onSubmitLogin} className="btn">
        Login
      </div>
      <div className="login-register">
        <p>
          Don't have account?{" "}
          <Link to="#" className="register-link" onClick={slideRegisters}>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};
export default Login;
