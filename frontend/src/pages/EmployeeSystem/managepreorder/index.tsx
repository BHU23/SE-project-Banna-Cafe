import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, Table, Button, Divider, message, Select, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import {
  PreorderStatusApprovesInterface,
  PreorderStatusRecivesInterface,
  StatusRecivePreorderInterface,
} from "../../../interfaces/IManagepreorder";
import {
  PaymentInterface,
  PaymentStatusInterface,
  StatusPaymentInterface,
} from "../../../interfaces/IPayment";
import { GetEmployeeByID, ListPaymentStatus, UpdatePayment } from "../../../services/https/payment";
import {
  ListPreorderStatusRecives,
  ListStatusReceive,
  UpdatePreorderStatusRecives,
} from "../../../services/https/managepreorder";
import { EmployeesInterface } from "../../../interfaces/IEmployee";

function ManagePreorder() {
  const navigate = useNavigate();
  let [data, SetData] = useState<PaymentStatusInterface[]>([]);
  const [employee, SetEmployee] = useState<EmployeesInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const [PSR, SetPSR] = useState<PreorderStatusRecivesInterface[]>([]);
  const [test, SetTest] = useState<string>();
  const [statusRecive, SetStatusRecive] = useState<
    StatusRecivePreorderInterface[]
  >([]);
  let PSR_DUMP: PreorderStatusRecivesInterface[] = PSR;

  const getData = async () => {
    let res2 = await ListStatusReceive();
    if (res2) {
      SetStatusRecive(res2);
    }
    let res3 = await ListPaymentStatus();
    if (res3) {
      SetData(res3);
    }
    let res4 = await ListPreorderStatusRecives();
    if (res4) {
      SetPSR(res4);
      PSR_DUMP = PSR;
    }
    let res5 = await GetEmployeeByID(Number(localStorage.getItem("id")));
    if (res5){
      SetEmployee(res5)
    }
  };
  const updatePayment = async (data:PaymentInterface)=>{
    await UpdatePayment(data)
  }
  const UpdatePSR = (id: number, e: any) => {
    PSR_DUMP[id - 1].StatusRecivePreorderID = e.target.selectedIndex + 1;
    PSR_DUMP[id - 1].StatusRecivePreorder =
      statusRecive[e.target.selectedIndex];
    SetPSR(PSR_DUMP);
    console.log(PSR_DUMP);
  };
  const UpdatePSR_databse = (id: number, status: string,PaymentStatusID:number) => {
    let p = data[PaymentStatusID-1].Payment
    if (p) {
      p.Employee = employee;
      p.EmployeeID = employee?.ID;
    }
    if (
      status === "การชำระเงินสำเร็จ" &&
      PSR[id - 1].StatusRecivePreorderID !== statusRecive[2].ID
    ) {
      UpdatePreorderStatusRecives(PSR[id - 1]);
      if(p){
        UpdatePayment(p)
      }
    } else if (
      status === "รอการยืนยัน" &&
      PSR[id - 1].StatusRecivePreorderID !== statusRecive[3].ID
    ) {
      UpdatePreorderStatusRecives(PSR[id - 1]);
      console.log(p)
      if(p){
        UpdatePayment(p)
      }
    } else if (
      status === "การชำระเงินไม่สำเร็จ" &&
      PSR[id - 1].StatusRecivePreorderID === statusRecive[2].ID
    ) {
      UpdatePreorderStatusRecives(PSR[id - 1]);
      if(p){
         UpdatePayment(p)
      }
    } else {
      messageApi.warning("โปรดตรวจสอบสถานะการชำระเงิน");
    }
    console.log("update :", id - 1, status);
  };

  useEffect(() => {
    getData();
    console.log("data: ", PSR_DUMP);
  }, []);

  const columns: ColumnsType<PaymentStatusInterface> = [
    {
      title: "ลำดับ",
      dataIndex: ["Payment", "ID"],
      key: "id",
    },
    {
      title: "เวลาที่รับ",
      dataIndex: ["Payment", "Preorder", "PickUpDateTime"],
      key: "pickuptime",
      render: (pickuptime: Date) =>{
        const date = new Date(pickuptime)
        const hours = ('0' + date.getUTCHours()).slice(-2);
        const minutes = ('0' + date.getUTCMinutes()).slice(-2);
        const year = date.getUTCFullYear();
        const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Months are zero-based, so we add 1
        const day = ('0' + date.getUTCDate()).slice(-2);
        return <span>{`${hours}:${minutes} - ${day}/${month}/${year}`}</span>
      }
    },
    {
      title: "ราคา",
      dataIndex: ["Payment", "TotalAmount"],
      key: "price",
    },
    {
      title: "สถานะการจอง",
      dataIndex: ["Payment", "Preorder", "PreorderStatusApproves",0,"StatusApprovePreorder","Name"],
      key: "respond",
      render: (respond: string) => (respond ? respond : "-"),
    },
    {
      title: "สถานะจ่ายเงิน",
      dataIndex: ["StatusPayment", "Name"],
      key: "paymentStatus",
    },
    {
      title: "หมายเหตุ",
      dataIndex: ["Payment", "Preorder", "Note"],
      key: "note",
      render: (note: string) => (note ? note : "-"),
    },
    {
      title: "รายละเอียด",
      dataIndex: [
        "Payment",
        "Preorder",
        "PreorderStatusApproves",
        0,
        "StatusApprovePreorder",
        "Name",
      ],
      key: "manage",
      render: (manage: string, s: PaymentStatusInterface, index) => {
        return (
          <label
            onClick={() =>
              manage != "อนุมัติการสั่งจอง"
                ? navigate(`/managepreorder/edit/${s.ID}`)
                : messageApi.warning("การชำระเงินถูกอนุมัติแล้ว")
            }
            style={{ color: "green", cursor: "pointer" }}
          >
            คลิกเพื่อจัดการ
          </label>
        );
      },
    },
    {
      title: "สถานะการรับสินค้า",
      dataIndex: [
        "Payment",
        "Preorder",
        "PreorderStatusRecives",
        0,
        "StatusRecivePreorder",
        "Name",
      ],
      key: "recivestatus",
      render: (recivestatus: string, s: PaymentStatusInterface) => {
        return (
          <div>
            <select
              defaultValue={recivestatus}
              onInput={(e: any) => {
                const PreorderStatusRecives = s.Payment?.Preorder
                  ?.PreorderStatusRecives as PreorderStatusRecivesInterface[];
                const id = PreorderStatusRecives[0].ID || 0;
                UpdatePSR(id, e);
              }}
            >
              <option>{statusRecive[0].Name}</option>
              <option>{statusRecive[1].Name}</option>
              <option>{statusRecive[2].Name}</option>
              <option>{statusRecive[3].Name}</option>
              <option>{statusRecive[4].Name}</option>
            </select>
            <Button
              onClick={(e: any) => {
                const PreorderStatusRecives = s.Payment?.Preorder
                  ?.PreorderStatusRecives as PreorderStatusRecivesInterface[];
                const id = PreorderStatusRecives[0].ID || 0;
                UpdatePSR_databse(id, s.StatusPayment?.Name || "",s.ID||0);
              }}
            >
              อัพเดท
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {contextHolder}
      <Card>
        <h2 style={{ textAlign: "center" }}>จัดการคำสั่งซื้อล่วงหน้า</h2>
        <Divider />
        <div style={{ marginTop: 20 }}>
          <Table rowKey="id" columns={columns} dataSource={data} />
        </div>
      </Card>
      <p></p>
    </>
  );
}
export default ManagePreorder;
