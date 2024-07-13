import { useEffect, useState } from "react";
import "./home.css";
import NavbarHome from "../../../components/navbarHome";
import { Link } from "react-router-dom";
import Login from "../formLoginRegister";
import Footer from "../../../components/footer";
import { PromotionInterface } from "../../../interfaces/IPromotion";
import { GetPromotion, GetReadyPromotion } from "../../../services/https/promotion";
import { Carousel } from "antd";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  function handleClick() {
    setLogin(!login);
  }
  const [promotions, setPromotions] = useState<PromotionInterface[]>([]);
  const getReadyPromotions = async () => {
    let res = await GetReadyPromotion();
    if (res) {
      setPromotions(res);
    }
  };

  useEffect(() => {
    getReadyPromotions();
  }, []);

  return (
    <div>
      {contextHolder}
      <div className="slide s1">
        <NavbarHome onOpen={() => setLogin(true)} />
        <div className={`${!login ? "content c1" : "content0"}`}>
          <div
            className="circle c1"
            onClick={() => {
              if (
                localStorage.getItem("token") == "" ||
                !localStorage.getItem("token")
              ) {
                messageApi.open({
                  type: "warning",
                  content: "กรุณาเข้าสู่ระบบสำเร็จ",
                });
                setLogin(true);
              } else {
                navigate("/menuPreorder");
              }
            }}
          >
            <div className="circle c2">
              <span>banna</span>
              <br />
              <p>09:00 - 17.00 น.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        style={{
          width: "100%",
          height: "12vh",
          backgroundColor: "#fff",
        }}
      ></div> */}
      <div className="slide s2">
        <div
          style={{
            width: "100%",
            height: "70vh",
          }}
        >
          {promotions.length != 0 ? (
            <Carousel autoplay>
              {promotions.map((promotion, index) => (
                <div key={index}>
                  <div
                    style={{
                      width: "auto",
                      height: "70vh",
                      backgroundImage: `url(${promotion.Image})`,
                      backgroundSize: "80%",
                      backgroundPosition: "center",
                      lineHeight: "160px",
                      display: "flex",
                      alignSelf: "center",
                    }}
                  ></div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundSize: "100%",
                lineHeight: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#fff",
                backgroundColor: "#181D31",
              }}
            >
              coming soon . . .
            </div>
          )}
        </div>
      </div>
      {/* <div
        style={{
          width: "100%",
          height: "20vh",
          backgroundColor: "#fff",
        }}
      ></div> */}
      <div className="slide s3">
        <div className="content s3 left">
          <span>
            b<br />a<br />n<br />n<br />a
          </span>
          <Link
            to={""}
            className="btn-menu m1"
            onClick={() => {
              if (
                localStorage.getItem("token") == "" ||
                !localStorage.getItem("token")
              ) {
                messageApi.open({
                  type: "warning",
                  content: "กรุณาเข้าสู่ระบบสำเร็จ",
                });
                setLogin(true);
              } else {
                navigate("/menuPreorder");
              }
            }}
          >
            menu
          </Link>
        </div>
        <div className="content s3 right">
          <h1>welcome</h1>
          <h2>
            to <span>banna</span>
          </h2>
        </div>
      </div>
      <span className="wordslide s4">bannabanna</span>
      <div className="slide s4">
        <div className="card c1">
          <div className="img-menu">
            <p>banna</p>
            <div className="coaster"></div>
            <div className="img-menu im i1"></div>
          </div>
          <span>เมนูผลไม้</span>
          <Link
            to={""}
            className="btn-menu m2"
            onClick={() => {
              if (
                localStorage.getItem("token") == "" ||
                !localStorage.getItem("token")
              ) {
                messageApi.open({
                  type: "warning",
                  content: "กรุณาเข้าสู่ระบบสำเร็จ",
                });
                setLogin(true);
              } else {
                navigate("/menuPreorder");
              }
            }}
          >
            เลือกเมนู
          </Link>
        </div>
        <div className="card c2">
          <div className="img-menu">
            <p>banna</p>
            <div className="coaster"></div>
            <div className="img-menu im i2"></div>
          </div>
          <span>เมนูกาแฟ</span>
          <Link
            to={""}
            className="btn-menu m2"
            onClick={() => {
              if (
                localStorage.getItem("token") == "" ||
                !localStorage.getItem("token")
              ) {
                messageApi.open({
                  type: "warning",
                  content: "กรุณาเข้าสู่ระบบสำเร็จ",
                });
                setLogin(true);
              } else {
                navigate("/menuPreorder");
              }
            }}
          >
            เลือกเมนู
          </Link>
        </div>
        <div className="card c3">
          <div className="img-menu">
            <p>banna</p>
            <div className="coaster"></div>
            <div className="img-menu im i3"></div>
          </div>
          <span>เมนูของทานเล่น</span>
          <Link
            to={""}
            className="btn-menu m2"
            onClick={() => {
              if (
                localStorage.getItem("token") == "" ||
                !localStorage.getItem("token")
              ) {
                messageApi.open({
                  type: "warning",
                  content: "กรุณาเข้าสู่ระบบสำเร็จ",
                });
                setLogin(true);
              } else {
                navigate("/menuPreorder");
              }
            }}
          >
            เลือกเมนู
          </Link>
        </div>
        <div className="card c4">
          <div className="img-menu">
            <p>banna</p>
            <div className="coaster"></div>
            <div className="img-menu im i4"></div>
          </div>
          <span>เมนูของทานเล่น</span>
          <Link
            to={""}
            className="btn-menu m2"
            onClick={() => {
              if (
                localStorage.getItem("token") == "" ||
                !localStorage.getItem("token")
              ) {
                messageApi.open({
                  type: "warning",
                  content: "กรุณาเข้าสู่ระบบสำเร็จ",
                });
                setLogin(true);
              } else {
                navigate("/menuPreorder");
              }
            }}
          >
            เลือกเมนู
          </Link>
        </div>
      </div>
      <div className="slide s5">
        <div className="content s5 left"></div>
        <div className="content s5 right">
          <span className="span s5-1">
            b<br />a<br />n<br />n<br />a
          </span>
          <div className="img-menu im i5"></div>
          <div className="text i5">
            <span className="span s5-2">coffee</span>
            <p>
              เปิดประสบการณ์ใหม่สำหรับประสบการณ์กาแฟที่หรูหรา
              <br />
              และประทับใจ ด้วยทุกเฟรเวอร์ของรสชาติที่ทันสมัย
              <br />
              ในแบบที่ทำให้คุณตื่นเต้นทุกสัมผัส
            </p>
            <Link
              to={""}
              className="btn-menu m1"
              onClick={() => {
                if (
                  localStorage.getItem("token") == "" ||
                  !localStorage.getItem("token")
                ) {
                  messageApi.open({
                    type: "warning",
                    content: "กรุณาเข้าสู่ระบบสำเร็จ",
                  });
                  setLogin(true);
                } else {
                  navigate("/menuPreorder");
                }
              }}
            >
              menu
            </Link>
          </div>
        </div>
      </div>
      <div className="slide s6">
        <Footer />
      </div>
      <div className={`${login ? "loginRegisteractive" : "loginRegister"}`}>
        {login && <Login onClose={handleClick} />}
      </div>
    </div>
  );
}
