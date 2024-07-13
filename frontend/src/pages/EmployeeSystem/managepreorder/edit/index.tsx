import {
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Radio,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, ChangeEventHandler, useRef } from "react";
import {
  ManagePreOrderInterface,
  PreOrderInterface,
  PreorderStatusApprovesInterface,
  PreorderStatusRecivesInterface,
  StatusApprovePreorderInterface,
  StatusRecivePreorderInterface,
} from "../../../../interfaces/IManagepreorder";
import {UpdatePreOrder,ListStatusApprove,UpdatePreorderStatusApprove,} from "../../../../services/https/managepreorder";
import { AccountingInterface } from "../../../../interfaces/IAccounting";
import {
  PaymentInterface,
  PaymentStatusInterface,
  StatusPaymentInterface,
} from "../../../../interfaces/IPayment";
import {
  CreateAccountingFromPayment,
  GetEmployeeByID,
  GetPaymentByID,
  GetPaymentStatusByID,
  ListPaymentStatus,
  ListStatusPayment,
  UpdatePayment,
  UpdatePaymentStatus,
} from "../../../../services/https/payment";
import { EmployeesInterface } from "../../../../interfaces/IEmployee";
import { MembersInterface } from "../../../../interfaces/IMember";
import { GetMemberById, UpdateMember } from "../../../../services/https/member";
function ManagePreorderEdit() {
  const navigate = useNavigate();
  let [data, SetData] = useState<PaymentStatusInterface>();
  const [sap, SetSAP] = useState<StatusApprovePreorderInterface[]>([]);
  let { id } = useParams();
  const [account, SetAccount] = useState<AccountingInterface>();
  const [statusPayment, SetStatusPayment] = useState<StatusPaymentInterface[]>(
    []
  );
  const [employee,SetEmployee] = useState<EmployeesInterface>();
  let [member, setMember] = useState<MembersInterface>({});
  const getData = async () => {
    let res = await GetPaymentStatusByID(Number(id));
    if (res) {
      SetData(res);
      let res4 = await GetMemberById(res.Payment?.Preorder?.MemberID)
      if (res4){
        setMember(res4)
      }
    }
    let res1 = await ListStatusApprove();
    if (res1) {
      SetSAP(res1);
    }
    let res2 = await ListStatusPayment();
    if (res2) {
      SetStatusPayment(res2);
    }
    let res3 = await GetEmployeeByID(Number(localStorage.getItem("id")))
    if(res3){
      SetEmployee(res3)
    }
  };
  function cancel_button() {
    setTimeout(function () {
      navigate(`/managepreorder`);
    }, 250);
  }
  const formatedTime = ()=>{
    const d = data?.Payment?.Preorder?.PickUpDateTime
    if(d){

      const date = new Date(d)
      const hours = ('0' + date.getUTCHours()).slice(-2);
      const minutes = ('0' + date.getUTCMinutes()).slice(-2);
      const year = date.getUTCFullYear();
      const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Months are zero-based, so we add 1
      const day = ('0' + date.getUTCDate()).slice(-2);
      return `${hours}:${minutes} - ${day}/${month}/${year}`
    }
  }

  const onFinish = async (values: PreOrderInterface) => {
    if(data&&data.Payment){
      data.Payment.Employee = employee
      data.Payment.EmployeeID = employee?.ID
    }else{
      alert("employee assign fail")
    }
    values = data?.Payment?.Preorder || {
      PreorderStatusApproveID: 0,
      PreorderStatusRevivesID: 0,
    };
    let v: PaymentStatusInterface = data || {};
    v.StatusPaymentID = statusPayment[1]?.ID;
    v.StatusPayment = statusPayment[1];
    SetData(v);
    let res1 = await UpdatePreOrder(values);
    if (data?.Payment?.Preorder?.Respond === "อนุมัติการสั่งจอง") {
      let v: PaymentStatusInterface = data || {};
      v.StatusPaymentID = statusPayment[1]?.ID;
      v.StatusPayment = statusPayment[1];
      let x = await UpdatePaymentStatus(data)
      let value: PreorderStatusApprovesInterface = {};
      value.ID = data?.Payment?.Preorder?.PreorderStatusApproves?.[0]?.ID;
      value.StatusApprovePreorder = sap[1];
      value.StatusApprovePreorderID = sap[1].ID;
      let res2 = await UpdatePreorderStatusApprove(value);
      let acc: AccountingInterface = account || {};
      acc.PaymentID = data?.Payment?.ID;
      acc.Payment = data?.Payment;
      acc.Date = data?.Payment?.Time;
      acc.Amount = data?.Payment?.TotalAmount;
      acc.Name = "Payment number".concat(String(data?.Payment?.ID));
      acc.EmployeeID = data?.Payment?.EmployeeID;
      acc.Employee = data?.Payment?.Employee;
      SetAccount(acc);
      let pppoint = data.Payment.Promotion?.DiscountPoint||0
      let ppoint = data.Payment?.Point||0;
      let point = member?.Point||0;
      member.Point = (ppoint + point)-pppoint;
      let res7 = await UpdateMember(member);
      let res3 = await CreateAccountingFromPayment(account || acc);
      let res5 = await UpdatePaymentStatus(data);
      let res6 = await UpdatePayment(data.Payment)
      if (res3.status && res1.status && res2.status&&res5&&res6) {
        message.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
        setTimeout(function () {
          navigate("/ManagePreorder");
        }, 250);
      } else {
        const err = "error: ".concat(
          res1.message || "",
          res2.message || "",
          res3.message || "",
          res5.message || "",
          res6.message || "",
          res7.message
        );
        message.open({
          type: "error",
          content: err,
        });
      }
    } else if (data?.Payment?.Preorder?.Respond === "ไม่อนุมัติการสั่งจอง") {
      let v: PaymentStatusInterface = data || {};
      v.StatusPaymentID = statusPayment[2]?.ID;
      v.StatusPayment = statusPayment[2];
      let x = await UpdatePaymentStatus(data)
      let value: PreorderStatusApprovesInterface = {};
      value.ID = data?.Payment?.Preorder?.PreorderStatusApproves?.[0]?.ID;
      value.PreOrderID = data?.Payment.PreorderID;
      value.StatusApprovePreorderID = sap[2].ID;
      console.log("value", value);
      let res6 = await UpdatePayment(data.Payment)
      if (data?.Payment?.Preorder?.Note) {
        let res3 = await UpdatePreorderStatusApprove(value);
        if (res3.status && res1.message) {
          message.open({
            type: "success",
            content: "บันทึกข้อมูลสำเร็จ",
          });
          setTimeout(function () {
            navigate("/ManagePreorder");
          }, 250);
        } else if (!res1.status || !res1.status) {
          const err = "error: ".concat(res1.message || "", res3.message || "");
          message.open({
            type: "error",
            content: err,
          });
        }
      } else {
        message.open({
          type: "warning",
          content: "โปรดระบุสาเหตุการไม่อนุมัติ",
        });
      }
    }
  };

  const onInput = (e: any) => {
    let u : PaymentStatusInterface = data||{}
    let c: PaymentInterface = data?.Payment || {};
    let a: PreOrderInterface = data?.Payment?.Preorder || {
      PreorderStatusApproveID: 0,
      PreorderStatusRevivesID: 0,
    };
    a.Note = e.target.value;
    c.Preorder = a;
    u.Payment = c;
    console.log(u)
    SetData(u);
  };
  const onChange = (e: any) => {
    let c: PaymentStatusInterface = data || {};
    let u : PaymentInterface = data?.Payment||{}
    let a: PreOrderInterface = c?.Payment?.Preorder || {
      PreorderStatusApproveID: 0,
      PreorderStatusRevivesID: 0,
    };
    a.Respond = e.target.value;
    u.Preorder = a;
    c.Payment = u
    SetData(c);
  };

  useEffect(() => {
    getData();
    console.log(member);
  }, []);
  return (
    <div>
      <Card>
        <h2 style={{ textAlign: "center" }}>ข้อมูลคำสั่งซื้อล่วงหน้า</h2>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <p style={{ fontSize: "16px" }}>
              ลำดับ : {data?.Payment?.ID}
              <span></span>
            </p>
            <p style={{ fontSize: "16px" }}>
              {" "}
              <br />
              เวลาที่จะมารับ :{" "}
              <span style={{ fontWeight: "normal" }}>
                {formatedTime()}
              </span>
            </p>
            <p style={{ fontSize: "16px" }}>
              {" "}
              <br />
              ราคา :{" "}
              <span style={{ fontWeight: "normal" }}>
                {data?.Payment?.TotalAmount}
              </span>
            </p>
            <p style={{ fontSize: "16px" }}>
              {" "}
              <br />
              ชื่อผู้สั่ง :{" "}
              <span style={{ fontWeight: "normal" }}>
                {data?.Payment?.Preorder?.Member?.Username}
              </span>
            </p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <p style={{ fontSize: "16px" }}>
              หลักฐานการชำระเงิน:{" "}
              <div style={{ marginLeft: "50px" }}>
                <img width={350} src={data?.Payment?.Image}></img>
              </div>
            </p>
          </Col>
        </Row>
        <Divider />
        <Form layout="horizontal" autoComplete="off" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="หมายเหตุ"
                name="Note"
                initialValue={data?.Payment?.Preorder?.Note}
                rules={[
                  {
                    required: false,
                    message: "กรุณากรอกหมายเหตุ",
                  },
                ]}
              >
                <Input onInput={onInput} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="กรุณาเลือก"
                name="respond"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกยอมรับหรือไม่",
                  },
                ]}
              >
                <Radio.Group onChange={onChange}>
                  <Radio value={"อนุมัติการสั่งจอง"}>อนุมัติ</Radio>
                  <Radio value={"ไม่อนุมัติการสั่งจอง"}>ไม่อนุมัติ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Form.Item>
                <Button
                  style={{ marginRight: "40px", backgroundColor: "lightblue" }}
                  onClick={cancel_button}
                >
                  ยกเลิก
                </Button>
                <Button
                  htmlType="submit"
                  style={{ marginRight: "40px", backgroundColor: "orange" }}
                >
                  ตกลง
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
export default ManagePreorderEdit;