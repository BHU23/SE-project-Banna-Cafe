import React, { useEffect, useState } from "react";
import SidebarProflie from "../../../../components/sidebarProfile";
import Footer from "../../../../components/footer";
import "../profileMember.css";
import "./history.css";
import { GetMemberById } from "../../../../services/https/member";
import { MembersInterface } from "../../../../interfaces/IMember";
import { Layout, Row, Col, Card, Typography, Space } from "antd";
import { GetPayMemtsByMemberID } from "../../../../services/https/preorder";
import { PaymentInterface } from "../../../../interfaces/IPayment";
import { GetPreorderStatusReceiveByMemberID } from "../../../../services/https/PreorderstatusRecive";
import { GetPreorderStatusApproveByMemberID } from "../../../../services/https/PreorderStatusApprove";
import { PreorderStatusApprovesInterface } from "../../../../interfaces/IPreorderStatusApprove";
import { PreorderStatusRecivesInterface } from "../../../../interfaces/IPreorderStatusRecive";
import HistoryPreorderData from "./data";
import { PreOrderInterface } from "../../../../interfaces/IManagepreorder";
import PaymentEdit from "../../payment/edit";
const { Content } = Layout;
const { Text } = Typography;

export default function HistoryPreorder() {
  const [member, setMember] = useState<MembersInterface | null>(null);
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  const [historyDatapopup, setHistoryDatapopup] = useState(false);  
  const [editSlippopup, setEditSlippopup] = useState(false);  
  const [preorder, setPreorder] = useState<PreOrderInterface>();  
  const [paymentEdit, setPaymentEdit] = useState<PaymentInterface>();  

  const getMemberByID = async (id: Number) => {
    let res = await GetMemberById(id);
    if (res) {
      setMember(res);
    }
  };
  const getPaymentByMemberID = async (id: Number) => {
    let res = await GetPayMemtsByMemberID(id);
    if (res) {
      setPayment(res);
    }
  };

  const [preorderStatusApprove, setPreorderStatusApprove] = useState<
    PreorderStatusApprovesInterface[]
  >([]);
  const [preorderStatusReceive, setPreorderStatusReceive] = useState<
    PreorderStatusRecivesInterface[]
  >([]);

  const [paymentReady, setPaymentReady] = useState<PaymentInterface[]>([]);

  const getPreorderStatusAproveByMemberID = async (id: number) => {
    let res = await GetPreorderStatusApproveByMemberID(id);
    if (res) {
      setPreorderStatusApprove(res);
    }
  };

  const getPreorderStatusReceiveByMemberID = async (id: number) => {
    let res = await GetPreorderStatusReceiveByMemberID(id);
    if (res) {
      setPreorderStatusReceive(res);
    }
  };
  const getNameStatusAprovePreorderByPreorderID = (
    payment: PaymentInterface
  ): string => {
    const nameStatusAprovePreorder = preorderStatusApprove.filter(
      (item) => item.PreorderID === payment?.Preorder?.ID
    );
    if (
      nameStatusAprovePreorder.length == 1 &&
      nameStatusAprovePreorder[0].StatusApprovePreorder?.Name
    ) {
      return nameStatusAprovePreorder[0].StatusApprovePreorder?.Name;
    }
    return "none";
  };
  const getNameStatusReceivePreorderByPreorderID = (
    payment: PaymentInterface
  ): string => {
    const nameStatusReceivePreorder = preorderStatusReceive.filter(
      (item) => item.PreorderID === payment?.Preorder?.ID
    );
    if (
      nameStatusReceivePreorder.length == 1 &&
      nameStatusReceivePreorder[0].StatusRecivePreorder?.Name
    ) {
      return nameStatusReceivePreorder[0].StatusRecivePreorder?.Name;
    }
    return "none";
  };

  useEffect(() => {
    getMemberByID(Number(localStorage.getItem("id")));
    getPaymentByMemberID(Number(localStorage.getItem("id")));
    getPreorderStatusAproveByMemberID(Number(localStorage.getItem("id")));
    getPreorderStatusReceiveByMemberID(Number(localStorage.getItem("id")));
  }, [Number(localStorage.getItem("id"))]);

  useEffect(() => {
    // Ensure that preorderStatusApprove is an array before using forEach
    if (Array.isArray(preorderStatusApprove)) {
      // Extract unique PreorderIDs from preorderStatusApprove and preorderStatusReceive
      const approvePreorderIDs = new Set();
      preorderStatusApprove.forEach((item) =>
        approvePreorderIDs.add(item.PreorderID)
      );

      const receivePreorderIDs = new Set();
      preorderStatusReceive.forEach((item) =>
        receivePreorderIDs.add(item.PreorderID)
      );

      // Filter payments that have PreorderID present in both approve and receive sets
      const filteredPayments = payment.filter(
        (item) =>
          approvePreorderIDs.has(item.PreorderID) &&
          receivePreorderIDs.has(item.PreorderID)
      );
      const reversed = [...filteredPayments].reverse();
      setPaymentReady(reversed);
    } else {
      console.error(
        "Invalid data for preorderStatusApprove:",
        preorderStatusApprove
      );
      // Handle the case where preorderStatusApprove is not an array
    }
  }, [preorderStatusApprove, preorderStatusReceive, payment]);

  const formattedDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    // กำหนด offset เวลาเป็น -7 ชั่วโมง
    const offset = -7 * 60; // แปลงเป็น นาที
    const formattedDate = new Date(date.getTime() + offset * 60 * 1000);

    const thaiDateTimeFormat = new Intl.DateTimeFormat("th-TH", options);
    return thaiDateTimeFormat.format(formattedDate);
  };


  console.log("payment");
  console.log(payment);
  console.log("paymentReady");
  console.log(paymentReady);
  console.log("preorderStatusReceive");
  console.log(preorderStatusReceive);
  console.log("preorderStatusApprove");
  console.log(preorderStatusApprove);
  return (
    <Layout className="ProfileMember">
      <Layout className="sidebarProflie">
        <SidebarProflie onSelect={"ประวิติการ สั่งจอง"} member={member} />
      </Layout>
      <Layout className="contentprofile">
        <Content
          style={{
            height: "100vh",
            width: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Content
            style={{
              height: "5vh",
              width: "100%",
              borderRadius: "20px",
            }}
          >
            {" "}
            <Content
              style={{
                background: "#E48F44",
                height: "100%",
                width: "100px auto",
                position: "relative",
                float: "right",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
              }}
            >
              <Text>
                <p>ผู้ใช้งาน : {member?.Username}</p>
              </Text>
            </Content>
          </Content>
          <Content
            style={{
              height: "90vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Content
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "20px 20px 40px 20px",
                boxShadow:
                  "-4px 4px 4px 0px rgba(0, 0, 0, 0.25) inset, 4px -4px 4px 0px rgba(0, 0, 0, 0.25) inset",
              }}
            >
              <Content
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "20px",

                  gap: "20px",
                  overflowY: "scroll",
                }}
              >
                {paymentReady.map((payment, index) => (
                  <Card
                    style={{
                      height: "200px auto",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#F0E9D2",
                      borderRadius: "10px",
                      padding: "20px",
                      gap: 10,
                      // flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        padding: 0,
                      }}
                    >
                      <div>
                        <h3>ID:{payment.Preorder?.IDPreorder}</h3>{" "}
                      </div>
                      <div
                        style={{
                          color: "#678983",
                        }}
                      >
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          {/* {Math.floor(Number(payment.TotalAmount) / 100) * 5}{" "} */}
                          +{payment.Point} p.
                        </span>{" "}
                        &nbsp; &nbsp;23/02/2598
                      </div>
                    </div>
                    <div
                      style={{
                        height: "130px auto",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 0,
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          height: "130px auto",
                          width: "44%",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            height: "110px auto",
                            width: "70%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            padding: "10px 0",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              height: "25% auto",
                              width: "100%",
                              display: "flex",
                              justifyContent: "start",
                              alignItems: "start",
                              flexDirection: "row",
                              gap: "10px",
                              flexWrap: "wrap",
                              marginBottom: "5px",
                            }}
                          >
                            <span
                              className={`status-history ${
                                getNameStatusAprovePreorderByPreorderID(
                                  payment
                                ) === "รออนุมัติการสั่งจอง"
                                  ? ""
                                  : getNameStatusAprovePreorderByPreorderID(
                                      payment
                                    ) === "อนุมัติการสั่งจอง"
                                  ? "s1"
                                  : getNameStatusAprovePreorderByPreorderID(
                                      payment
                                    ) === "ไม่อนุมัติการสั่งจอง"
                                  ? "s2"
                                  : ""
                              }`}
                            >
                              {getNameStatusAprovePreorderByPreorderID(payment)}
                            </span>
                            <span
                              className={`status-history ${
                                getNameStatusAprovePreorderByPreorderID(
                                  payment
                                ) === "รออนุมัติการสั่งจอง"
                                  ? ""
                                  : getNameStatusAprovePreorderByPreorderID(
                                      payment
                                    ) === "รับสินค้าแล้วเรียบร้อย"
                                  ? "s1"
                                  : getNameStatusAprovePreorderByPreorderID(
                                      payment
                                    ) === "ยังไม่ได้รับสินค้า"
                                  ? "s2"
                                  : ""
                              }`}
                            >
                              {getNameStatusReceivePreorderByPreorderID(
                                payment
                              )}
                            </span>
                          </div>
                          <div
                            style={{
                              height: "75%",
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "start",
                              flexDirection: "row",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: "55%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                                flexDirection: "column",
                                paddingLeft: "15px",
                              }}
                            >
                              <span>สถานะการชำระเงิน:</span>
                              <span>ส่วนลด:</span>
                              <span>ราคาที่ชำระ:</span>
                            </div>
                            <div
                              style={{
                                height: "100%",
                                width: "45%",
                                display: "flex",
                                alignItems: "start",
                                justifyContent: "space-between",
                                padding: 0,
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  color: "green",
                                }}
                              >
                                ชำระแล้ว
                              </span>
                              <span
                                style={{
                                  color: "gray",
                                }}
                              >
                                {" "}
                                {payment.Promotion?.Discount
                                  ? payment.Promotion?.Discount
                                  : "-"}
                              </span>
                              <span
                                style={{
                                  color: "#E48F44",
                                }}
                              >
                                {payment.TotalAmount
                                  ? payment.TotalAmount
                                  : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            height: "130px",
                            width: "35%",
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            padding: 0,
                          }}
                        >
                          <img
                            style={{
                              height: "100%",
                              width: "auto",
                            }}
                            src={payment?.Image}
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          height: "130px",
                          width: "0.1%",
                          margin: "0 2.5%",
                          border: "1px solid #181D31",
                        }}
                      />
                      <div
                        style={{
                          height: "130px auto",
                          width: "44%",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            height: "130px auto",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            padding: "10px 0",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              height: "25%",
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              gap: "10px",
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              className="status-history discription"
                              onClick={() => {
                                setHistoryDatapopup(true);
                                setPreorder(payment?.Preorder);
                              }}
                            >
                              ดูรายละเอียด
                            </span>
                            <span
                              className="status-history discription"
                              onClick={() => {
                                setEditSlippopup(true);
                                setPaymentEdit(payment);
                              }}
                            >
                              แก้ไขการโอนเงิน
                            </span>
                          </div>
                          <div
                            style={{
                              height: "75%",
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "start",
                              flexDirection: "row",
                              marginBottom: "5px",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: "30%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                                flexDirection: "column",
                              }}
                            >
                              <span>วันที่รับบริการ :</span>
                              <span>หมายเหตุ :</span>
                              <span>ข้อความตอบกลับ :</span>
                            </div>
                            <div
                              style={{
                                height: "100% ",
                                width: "70%",
                                display: "flex",
                                alignItems: "start",
                                justifyContent: "space-between",
                                padding: 0,
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  color: "green",
                                }}
                              >
                                {formattedDateTime(
                                  new Date(
                                    String(payment.Preorder?.PickUpDateTime)
                                  )
                                )}
                              </span>
                              <span
                                style={{
                                  color: "gray",
                                }}
                              >
                                {" "}
                                {payment.Preorder?.Note
                                  ? payment.Preorder?.Note
                                  : "-"}
                              </span>
                              <span
                                style={{
                                  color: "#181D31",
                                }}
                              >
                                {payment.Preorder?.Respond
                                  ? payment.Preorder?.Respond
                                  : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </Content>
            </Content>
          </Content>
        </Content>
        <footer>
          <Footer />
        </footer>
      </Layout>
      {historyDatapopup && (
        <div className="history-datapop">
          <HistoryPreorderData
            onClosehistoryDatapopup={() => {
              setHistoryDatapopup(false);
            }}
            preorder={preorder}
          />
        </div>
      )}
      {editSlippopup && (
        <div className="history-datapop">
          <PaymentEdit
            onClosEditSlippopup={() => {
              setEditSlippopup(false);
            }}
            Payment={paymentEdit}
          />
        </div>
      )}
    </Layout>
  );
}
