import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  InputHTMLAttributes,
} from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Divider, List, Table, Card, message, Button } from "antd";
import { FaFileUpload } from "react-icons/fa";
import { GetPreorderMenuByPreorderID } from "../../../../services/https/payment";
import { PaymentInterface } from "../../../../interfaces/IPayment";
import { PreorderMenusInterface } from "../../../../interfaces/IPreorderMenu";
import { PreOrderInterface } from "../../../../interfaces/IManagepreorder";
import { UpdatePayment } from "../../../../services/https/payment";
import { GetPaymentByID } from "../../../../services/https/payment";
import { IoRestaurantOutline } from "react-icons/io5";
interface PaymentEditPreorderProps {
  onClosEditSlippopup: () => void;
  Payment: PaymentInterface | undefined;
}
const PaymentEdit: React.FC<PaymentEditPreorderProps> = ({
  onClosEditSlippopup,
  Payment,
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  //   let { id } = useParams();
  //   const [Payment, SetPayment] = useState<PaymentInterface>();
  const [PreorderMenu, SetPreorderMenu] = useState<PreorderMenusInterface[]>(
    []
  );
  const [Preorder, SetPreorder] = useState<PreOrderInterface>();
  const [Image, SetImage] = useState<string>("");

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

  //   const getdata = async () => {
  //     let res1 = await GetPaymentByID(Number(id));
  //     if (res1) {
  //       SetPayment(res1);
  //     }
  //     let res2 = await GetPreorderMenuByPreorderID(res1?.PreorderID);
  //     if (res2) {
  //       SetPreorderMenu(res2);
  //     }
  //   };

  const onFinish = async () => {
    let data = Payment || {};
    data.Image = Image;
    let res1 = await UpdatePayment(data);
    if (res1) {
      message.open({
        type: "success",
        content: "อัพเดทข้อมูลสำเร็จ",
      });
    }
  };

  //   useEffect(() => {
  //     getdata();
  //   }, []);
  return (
    <>
      <div className="history-crad">
        <div className="rat-closdhistory">
          <span
            className="icon-close-addmenu"
            onClick={() => {
              onClosEditSlippopup();
            }}
          >
            <IoRestaurantOutline />
          </span>
        </div>
        <div
          style={{
            width: "auto",
            height: "88.8%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3>แก้ไขสลิป</h3>
          <div
            style={{
              width: "100%",
              height: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* <div style={{width:"100%",height:"90%",display:"flex",flexDirection:"row"}}> */}
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ marginLeft: "5%" }}>
                {" "}
                หมายเลขการชำระเงิน : {Payment?.ID}
                <p>หลักฐานการโอน : </p>
                <img
                  style={{ width: "auto", height: "200px" }}
                  src={Payment?.Image}
                  alt="หลักฐานการโอน"
                />{" "}
              </p>
            </div>
            {/* <div style={{width:"49%",height:"100%",marginTop:"1%",marginLeft:"0.5%",display:"flex",flexDirection:"column"}}>
                    <ul style={{height:"100%",width:"90%",listStyle:"none",overflow:"auto"}}>{PreorderMenu.map((m) =>
                        <li key={m.ID}>
                            <div>
                                <img width={"15%"} style={{marginRight:"5%"}} src={m.Menu?.MenuImage} alt={m.Menu?.MenuNameEng}/>
                                {m.Menu?.MenuName} ราคา : {m.Menu?.MenuCost} จำนวน : {m.Quantity}
                            </div>
                        </li> 
                    )}
                    </ul>
                </div> */}
            {/* </div> */}
            <div
              style={{
                width: "100%",
                height: "50%",
                marginTop: "0.5%",
                marginLeft: "0.5%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column-reverse",
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  width: "100%",
                  height: "75%",
                }}
              >
                <img
                  property="100,100"
                  src={Image}
                  alt="new image"
                  style={{
                    display: Image ? "flex" : "none",
                    width: "auto",
                    height: "150px",
                  }}
                />
              </div>
              <div
                onClick={openFilePicker}
                style={{
                  marginTop: "2%",
                  backgroundColor: "#c9c9c7",
                  alignItems: "center",
                  borderBlockStyle: "solid",
                  border: "2px solid black",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "25%",
                  height: "25%",
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
                <br />
                <FaFileUpload size={25} />
              </div>
            </div>
          </div>
        </div>
        <button className="btn-addmenu" type="submit" onClick={onFinish}>
          แก้ไข
        </button>
      </div>
    </>
  );
};
export default PaymentEdit;
