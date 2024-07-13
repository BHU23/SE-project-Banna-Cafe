import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  InputHTMLAttributes,
} from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Divider, List, Table, Card, message, Button } from "antd";
import { FaFileUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import {
  PaymentInterface,
  StatusPaymentInterface,
  PaymentStatusInterface,
  PromotionInterface,
} from "../../../interfaces/IPayment";
import * as service from "../../../services/https/payment";
import { GetPreOrderByID } from "../../../services/https/managepreorder";
import { PreorderMenusInterface } from "../../../interfaces/IPreorderMenu";
import { PreOrderInterface } from "../../../interfaces/IManagepreorder";
import { EmployeesInterface } from "../../../interfaces/IEmployee";

////////////////////add///////////////////
import SidebarMemu from "../../../components/sidebarMember";
import { MembersInterface } from "../../../interfaces/IMember";
import { GetMemberById, UpdateMember } from "../../../services/https/member";
import { MenuTypesInterface } from "../../../interfaces/IMenuType";
import Footer from "../../../components/footer";
import "../preorder/menuPreorder.css";
////////////////////add///////////////////

function Payment() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preorderMenu, SetPreorderMenu] = useState<PreorderMenusInterface[]>(
    []
  );
  const [payment, SetPayment] = useState<PaymentInterface>();
  let { id } = useParams();
  const [total, SetTotal] = useState<number>(3);
  const [fixed, SetFixed] = useState<number>(4);
  const [code, SetCode] = useState<string>(" ");
  const [promotion, SetPromotion] = useState<PromotionInterface>({});
  let c: PaymentInterface = payment || {};
  const [image, SetImage] = useState<string>();
  const [pd, SetPD] = useState<PreOrderInterface>();
  const [employee, SetEmployee] = useState<EmployeesInterface>();
  const [member, setMember] = useState<MembersInterface | null>(null);
  let cost: string;
  let dp: number;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        SetImage(imageUrl);
      };
      reader.readAsDataURL(selectedFile);
      message.open({
        type: "success",
        content: "อัพโหลดรูปสำเร็จ",
      });
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getCode = async () => {
    console.log(code)
    if (code !== undefined) {
      let res2 = await service.GetPromotionByCode(code);
      console.log(res2)
      if (res2) {
        console.log("1 check",dp," ",member?.Point)
        dp = res2.DiscountPoint
        if (
          (code !== promotion?.Code || total === fixed) &&
          (member?.Point||1 >= dp)
        ) {
          console.log("2 check",dp," ",member?.Point)
          SetPromotion(res2);
          c.Code = code;
          c.TotalAmount =
            fixed - res2.Discount <= 0 ? 1 : fixed - res2.Discount;
          SetPayment(c);
          SetTotal(c.TotalAmount);
          const msg = "กำลังใช้งานโค้ด".concat(res2?.Name);
          message.open({
            type: "success",
            content: msg,
          });
        } else if (member?.Point||2 < dp) {
          SetTotal(fixed);
          SetPromotion({});
          c.Code = "";
          c.TotalAmount = fixed;
          message.open({
            type: "warning",
            content: "Point ของคุณไม่พอสำหรับโปรโมชั่นนี้",
          });
        }
      } else {
        if (code !== promotion?.Code) {
          SetTotal(fixed);
          message.open({
            type: "error",
            content: "ไม่พบโค้ดส่วนลดปัจจุบัน",
          });
        }
        console.log("none");
      }
    } else {
      message.open({
        type: "warning",
        content: "กรุณากรอกโค้ดส่วนลดหรือดำเนินการต่อโดยไม่กรอกโค้ดส่วนลด",
      });
    }
  };

  const onFinish = async () => {
    let data: PaymentInterface = payment || {};
    data.Employee = employee;
    data.Preorder = pd;
    data.Promotion = promotion;
    data.TotalAmount = total;
    data.Point = Math.floor(Number(fixed / 100) * 5);
    data.Image = image;
    data.Code = promotion?.Code;
    data.EmployeeID = 0;
    data.PreorderID = pd?.ID;
    data.PromotionID = promotion?.ID;
    if (
      data.Image &&
      data.TotalAmount &&
      member?.Point||2 >= (promotion.DiscountPoint || 0)
    ) {
      let res = await service.CreatePayment(data);
      if (res.status) {
        message.open({
          type: "success",
          content: "ดำเนินการสำเร็จ",
        });
        setTimeout(function () {
          navigate(`/menuPreorder`);
        }, 250);
      } else {
        message.open({
          type: "error",
          content: "ดำเนินการไม่สำเร็จ",
        });
      }
    } else {
      message.open({
        type: "error",
        content: "กรุณาอัพโหลดหลักฐานการโอน",
      });
    }
  };
  const getMemberByID = async (id: Number) => {
    let res = await GetMemberById(id);
    if (res) {
      setMember(res);
    }
  };
  const getData = async () => {
    let res1 = await service.GetPreorderMenuByPreorderID(Number(id));
    if (res1) {
      SetPreorderMenu(res1);
    }
    let res2 = await service.GetEmployeeByID(1);
    if (res2) {
      SetEmployee(res2);
      console.log("employee:", res2);
    }
    let res3 = await GetPreOrderByID(Number(id));
    if (res3) {
      SetPD(res3);
      console.log("preorder:", res3);
      cost = res3?.TotalAmount?.toString() || "";
      console.log(Number(cost));
      SetTotal(Number(cost));
      SetFixed(Number(cost));
    }
  };

  const onInput = (e: any) => {
    SetCode(e.target.value || " ");
    console.log(e.target.values);
  };
  useEffect(() => {
    getData();
    getMemberByID(Number(localStorage.getItem("id")));
    console.log(member);
  }, []);

  const handleSelectMenuType = (menuType: MenuTypesInterface) => {};

  return (
    <div className="menuPreorder">
      <div className="sidebarMemu">
        <SidebarMemu onSelectMenuType={handleSelectMenuType} member={member} />
      </div>
      <div className="contentMenu">
        <main
          style={{
            margin: "20px",
            width: "87.5vw",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow:
              "4px 4px 4px 3px #678983 inset, -4px -4px 4px 3px #678983 inset",
            padding: "20px",
            backgroundColor: "#F0E9D2",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "87vw",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "25px",
                  borderBottom: "1px solid black",
                  width: "100%",
                }}
              >
                ชำระเงิน
              </p>
              <img
                style={{
                  width: "40%",
                  border: "1.5px solid black",
                  left: "20%",
                  marginTop: "6%",
                }}
                src="https://i.imgur.com/YZ0f7Vs.jpg"
                alt="qr code"
              />
              <p>
                Banna Cafe <br /> 670-238025-7 SCB
              </p>
              <div
                onClick={openFilePicker}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#c9c9c7",
                  alignItems: "center",
                  borderBlockStyle: "solid",
                  border: "2px solid black",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                กรุณาอัพโหลดหลักฐานการโอน
                <FaFileUpload size={25} />
              </div>
              <img
                src={image}
                alt="uploaded image"
                style={{
                  width: "25%",
                  marginTop: "3%",
                  display: image ? "flex" : "none",
                  border: "1px solid black",
                }}
              />
            </div>
            <div
              style={{
                backgroundColor: "#F0E9D2",
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                borderLeft: "1px solid black",
              }}
            >
              <p style={{ fontSize: "25px", borderBottom: "1px solid black" }}>
                รายการสินค้า
              </p>
              <ul
                style={{
                  height: "80%",
                  width: "85%",
                  overflowY: "scroll",
                  overflowX: "unset",
                  listStyle: "none",
                  marginTop: "1%",
                }}
              >
                {preorderMenu.map((m) => (
                  <li
                    key={m.ID}
                    style={{
                      borderTop: m.ID === 1 ? "none" : "1px solid grey",
                    }}
                  >
                    <p style={{ textAlign: "left", alignContent: "center" }}>
                      <img
                        style={{ width: "50px", marginRight: "15px" }}
                        src={m.Menu?.MenuImage}
                        alt={m.Menu?.MenuNameEng}
                      />
                      {m.Menu?.MenuName}
                      <p style={{ textAlign: "right", marginRight: "15px" }}>
                        จำนวน: {m.Quantity} ราคา: {m.TotalCost}
                      </p>
                    </p>
                  </li>
                ))}
              </ul>
              <p
                style={{
                  marginRight: "5%",
                  textAlign: "right",
                  borderBottom: "1px solid grey",
                  borderTop: "1px solid grey",
                }}
              >
                Total : {total}
              </p>
              <p>กรอกส่วนลดได้ที่นี่</p>
              <div
                style={{ width: "100%", display: "flex", marginBottom: "10%" }}
              >
                <input
                  onInput={onInput}
                  style={{
                    backgroundColor: "#F0E9D2",
                    textAlign: "center",
                    fontSize: "18px",
                    width: "60%",
                    marginLeft: "5%",
                  }}
                />
                <div
                  onClick={getCode}
                  style={{
                    backgroundColor: "orange",
                    border: "1px solid black",
                    cursor: "pointer",
                    color: "black",
                    marginLeft: "5%",
                  }}
                >
                  <FiSearch size={25} />
                </div>
              </div>
            </div>
          </div>
          <Button
            size="large"
            style={{
              position: "absolute",
              bottom: "10%",
              left: "45%",
              backgroundColor: "orange",
            }}
            onClick={onFinish}
          >
            เสร็จสิ้น
          </Button>
          <Button
            size="large"
            style={{
              position: "absolute",
              bottom: "10%",
              left: "38%",
              backgroundColor: "#678983",
            }}
            onClick={() => {
              navigate(`/menuPreorder`);
            }}
          >
            ยกเลิก
          </Button>
        </main>
        <footer
          style={{
            height: "400px",
          }}
        >
          <Footer />
        </footer>
      </div>
    </div>
  );
}
export default Payment;
