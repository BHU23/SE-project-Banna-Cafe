import react, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  InputHTMLAttributes,
} from "react";

import { IoRestaurantOutline } from "react-icons/io5";
import { message, Divider, List, Table, Card } from "antd";
import { DatePicker, Form, Input } from "antd";
import moment from "moment";
import "../addMenuPreorder/addMenuPreorder.css";
import "./editPreorder.css";

import { PreorderMenusInterface } from "../../../../interfaces/IPreorderMenu";
import { PreordersInterface } from "../../../../interfaces/IPreorder";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { StatusApprovePreordersInterface } from "../../../../interfaces/IStatusApprovePreorder";

import {
  DeletePreorderByID,
  GetNewPreorderByMemberID,
  GetPreorderStatusPaymentByMemberID,
  UpdatePreorder,
} from "../../../../services/https/preorder";
import { GetMenuById } from "../../../../services/https/menu";
import {
  DeletePreorderMenuByID,
  GetMenuPreordersByPreoderID,
  UpdatePreorderMenu,
} from "../../../../services/https/preoederMenu";

import EditMenuPreorder from "../editMenuPreorder";

import { useNavigate, useParams, NavLink } from "react-router-dom";
import { PaymentInterface } from "../../../../interfaces/IPayment";

interface EditPreorderProps {
  onClosebasketMenupop: () => void;
}
const EditPreorder: React.FC<EditPreorderProps> = ({
  onClosebasketMenupop,
}) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [preordermenus, setrPeorderMenus] = useState<PreorderMenusInterface[]>(
    []
  );
  const [preordermenu, setrPeorderMenu] = useState<PreorderMenusInterface>();
  const [preorder, setPreorder] = useState<PreordersInterface>();
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [menu, setMenu] = useState<MenusInterface>();
  const [editMenupop, setEditmenupop] = useState(false);
  const [deleteMenu, setDelete] = useState(false);
  const [preorder_payment_status, setPreorder_payment_status] =
    useState<PaymentInterface>();
  const [input, setInput] = useState<PreordersInterface>({
    ID: 0,
    TotalAmount: preorder?.TotalAmount || 0,
    MemberID: 1,
    PickUpDateTime: new Date(),
    Note: "",
    Respond: "",
  });
  const getNewPreoderByMember = async (
    id: number
  ): Promise<number | undefined> => {
    let res = await GetNewPreorderByMemberID(id);
    if (res) {
      setPreorder(res);
      setInput({
        ...input,
        ID: res.ID || 0,
        TotalAmount: res.TotalAmount || 0,
        MemberID: res.MemberID || 1,
        PickUpDateTime: new Date(),
        Note: res.Note || "",
        Respond: res.Respond || "",
      });
      getPreordersMenusByPreoderID(res.ID);
    }
    return undefined;
  };
  const getPreordersMenusByPreoderID = async (id: number) => {
    let res = await GetMenuPreordersByPreoderID(id);
    if (res) {
      setrPeorderMenus(res);
      getMenusByID(res);
    }
  };
  const getMenusByID = async (preorderMenus: PreorderMenusInterface[]) => {
    let getMenus: MenusInterface[] = [];

    for (let i = 0; i < preorderMenus.length; i++) {
      let res = await GetMenuById(preorderMenus[i].MenuID);

      if (res) {
        getMenus[i] = res;
      }
    }
    setMenus(getMenus);
  };
  const getPreoderStatusPaymentByMember = async (id: number) => {
    let res = await GetPreorderStatusPaymentByMemberID(id);
    if (res) {
      setPreorder_payment_status(res);
    }
  };
  useEffect(() => {
    getPreoderStatusPaymentByMember(Number(localStorage.getItem("id")));
    getNewPreoderByMember(Number(localStorage.getItem("id")));
    setDelete(false);
  }, [editMenupop, deleteMenu]);

  const onSubmitUpDatePreorderMenu = async (values: PreorderMenusInterface) => {
    if (values.Quantity && values.Quantity > 0) {
      values.TotalCost = values?.TotalCost
        ? parseFloat(values?.TotalCost.toFixed(2))
        : 0;
      let res = await UpdatePreorderMenu(values);
      if (res.status) {
        onSubmitUpDatePreorderByPreorderMenu();
        setTimeout(function () { }, 100);
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    } 
  };

  useEffect(() => {
    if (input.ID) {
      onSubmitUpDatePreorderByPreorderMenu();
    }
  }, [input.TotalAmount]);

  const onSubmitUpDatePreorderByPreorderMenu = async () => {
    let values: PreordersInterface = {
      IDPreorder: preorder?.IDPreorder,
      MemberID: Number(localStorage.getItem("id")),
      ID: preorder?.ID,
      PickUpDateTime: new Date(Date.now() + 50 * 60000),
      Note: preorder?.Note,
      Respond: preorder?.Respond,
      TotalAmount: input.TotalAmount,
    };
    values.TotalAmount = parseInt(((input.TotalAmount ?? 0) * 100).toFixed(0));
    values.TotalAmount = parseFloat(String(values.TotalAmount / 100));
    if (values.TotalAmount != 0) {
      let res = await UpdatePreorder(values);
      if (!res.status) {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    } 

  };

  const onSubmitUpDatePreorder = async (values: PreordersInterface) => {
    values.ID = preorder?.ID;
    values.MemberID = input.MemberID;
    values.Note = input.Note;
    values.Respond = input.Respond;
    values.IDPreorder = preorder?.IDPreorder;
    values.TotalAmount = parseInt(((input.TotalAmount ?? 0) * 100).toFixed(0));
    values.TotalAmount = parseFloat((values.TotalAmount / 100).toFixed(0));
    values.PickUpDateTime = new Date(values?.PickUpDateTime ?? 0);
      let res = await UpdatePreorder(values);
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกเมนูสำเร็จ",
        });
        setTimeout(function () {
          onClosebasketMenupop();
          navigate(`/payment/${preorder?.ID}`);
        }, 6000);
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
  };
  const onDeletePreorder = async (id: number) => {
    let res = await DeletePreorderByID(id);
    if (res.status) {
      onClosebasketMenupop();
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  }
  const onDeletePreorderMenu = async (
    id: number,
    values: PreorderMenusInterface
  ) => {
    let statusDeletePreorder = false
    if (
      values.Preorder?.TotalAmount != undefined &&
      values.Menu?.MenuCost != undefined &&
      values.MenuSize?.AddAmount != undefined &&
      (values.Preorder?.TotalAmount -
        (values.Menu?.MenuCost + values.MenuSize?.AddAmount) == 0)
    ) {
      statusDeletePreorder = true;
    }
    let res = await DeletePreorderMenuByID(id);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "ลบรายการสำเร็จ",
      });
       onSubmitUpDatePreorderByPreorderMenu();
      if (statusDeletePreorder) {
        onDeletePreorder(values.Preorder?.ID ?? 0);
      } 
      setTimeout(function () { }, 1000);
      
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const handleDecrease = (
    preordermenu: PreorderMenusInterface,
    index: number
  ) => {
    if (
      preordermenu.Quantity !== undefined &&
      preordermenu.Quantity > 0 &&
      preordermenu.Menu?.MenuCost !== undefined
    ) {
      const menuCost =
        (preordermenu.Menu.MenuCost ?? 0) +
        (preordermenu.MenuSize?.AddAmount ?? 0);
      const newQuantity = preordermenu.Quantity - 1;
      preordermenus[index].TotalCost = (preordermenu.TotalCost ?? 0) - menuCost;
      preordermenus[index].Quantity = newQuantity;
      const total = input.TotalAmount;
      if (total) {
        setInput({
          ...input,
          TotalAmount: parseFloat((total - menuCost).toFixed(2)),
        });
      }
    }
  };

  const handleIncrease = (
    preordermenu: PreorderMenusInterface,
    index: number
  ) => {
    if (
      preordermenu.Quantity !== undefined &&
      preordermenu.Quantity > 0 &&
      preordermenu.Quantity < 20 &&
      preordermenu.Menu?.MenuCost !== undefined
    ) {
      const menuCost =
        (preordermenu.Menu.MenuCost ?? 0) +
        (preordermenu.MenuSize?.AddAmount ?? 0);
      const newQuantity = preordermenu.Quantity + 1;
      preordermenus[index].TotalCost = (preordermenu.TotalCost ?? 0) + menuCost;
      preordermenus[index].Quantity = newQuantity;
      const total = input.TotalAmount;
      if (total) {
        setInput({
          ...input,
          TotalAmount: total + menuCost,
        });
      }
    } else if (
      preordermenu.Quantity !== undefined &&
      preordermenu.Quantity == 0 &&
      preordermenu.Menu?.MenuCost !== undefined &&
      preordermenu.MenuSize?.AddAmount !== undefined
    ) {
      const menuCost =
        preordermenu.Menu.MenuCost + preordermenu.MenuSize?.AddAmount;
      const newQuantity = preordermenu.Quantity + 1;
      preordermenus[index].TotalCost = (preordermenu.TotalCost ?? 0) + menuCost;
      preordermenus[index].Quantity = newQuantity;
      const total = input.TotalAmount ? input.TotalAmount : 0;
      if (total >= 0) {
        setInput({
          ...input,
          TotalAmount: parseFloat((total + menuCost).toFixed(2)),
        });
      }
    }
  };

  return (
    <>
      <Form
        name="basic"
        className="edit-crad"
        onFinish={onSubmitUpDatePreorder}
        autoComplete="off"
      >
        {contextHolder}
        <div className="rat-costEdit">
          <span
            className="icon-close-addmenu"
            onClick={() => {
              onClosebasketMenupop();
            }}
          >
            <IoRestaurantOutline />
          </span>
        </div>
        <div className="form-edit">
          <h3>ตะกร้าสินค้า</h3>
          <div className="basket-menu">
            {!preorder_payment_status &&
              preordermenus.map(
                (preordermenudata: PreorderMenusInterface, index: number) => (
                  <>
                    <div className="menu-data" key={index}>
                      <div className="imge-item">
                        <img src={menus[index]?.MenuImage} alt="" />
                      </div>
                      <h5 className="name-item">
                        {menus[index]?.MenuName}
                        <br />
                        <span>{menus[index]?.MenuNameEng}</span>
                      </h5>
                      <h5 className="size-item">
                        {preordermenudata.MenuSize?.Name}
                      </h5>
                      <h5 className="total-amount">
                        {preordermenudata.TotalCost !== undefined
                          ? preordermenudata.TotalCost.toFixed(2)
                          : "N/A"}
                        .-
                      </h5>
                      <h4 className="quantity">{preordermenudata.Quantity}</h4>
                      <div className="add-minus">
                        <div
                          className="btn-quantity minus"
                          onClick={() => {
                            handleDecrease(preordermenudata, index);
                            onSubmitUpDatePreorderMenu(preordermenudata);
                          }}
                        >
                          -
                        </div>
                        <div
                          className="btn-quantity add"
                          onClick={() => {
                            handleIncrease(preordermenudata, index);
                            onSubmitUpDatePreorderMenu(preordermenudata);
                          }}
                        >
                          +
                        </div>
                      </div>
                      {preordermenudata.Quantity == 0 ? (
                        <div
                          className="btn-deletePreordermenu"
                          onClick={(e) => {
                            onDeletePreorderMenu(
                              preordermenudata.ID ?? 0,
                              preordermenudata
                            );
                            setDelete(true);
                          }}
                        >
                          ลบรายการ
                        </div>
                      ) : (
                        <div
                          className="btn-description"
                          onClick={() => {
                            setMenu(menus[index]);
                            setEditmenupop(true);
                            setrPeorderMenu(preordermenudata);
                          }}
                        >
                          <h4>รายละเอียด</h4>
                        </div>
                      )}
                    </div>
                    <hr />
                  </>
                )
              )}
          </div>
          <hr />
          <div className="data-preOrder">
            <h4>วัน-เวลาที่รับ</h4>
            <Form.Item
              name="PickUpDateTime"
              className="datime-receivete"
              rules={[
                {
                  validator: async (rule, value) => {
                    if (!value) {
                      return Promise.reject(
                        <span style={{ fontSize: "12px" }}>
                          "Please select a pickup date and time."
                        </span>
                      );
                    }

                    const selectedTime = input.PickUpDateTime;
                    const startTime = moment("09:00", "HH:mm");
                    const endTime = moment("17:00", "HH:mm");

                    const selectedDateTime = moment(selectedTime);

                    // Create start and end times for the selected date
                    const selectedStartTime = moment(selectedTime).set({
                      hour: startTime.hours(),
                      minute: startTime.minutes(),
                    });

                    const selectedEndTime = moment(selectedTime).set({
                      hour: endTime.hours(),
                      minute: endTime.minutes(),
                    });

                    const today = moment().startOf("day");
                    const tomorrow = moment().add(1, "day").startOf("day");

                    if (
                      (selectedDateTime.isSameOrAfter(today) &&
                        selectedDateTime.isBefore(tomorrow)) ||
                      selectedDateTime.isSameOrAfter(tomorrow)
                    ) {
                      if (
                        selectedDateTime.isBetween(
                          selectedStartTime,
                          selectedEndTime
                        ) ||
                        selectedDateTime.isSame(selectedStartTime) ||
                        selectedDateTime.isSame(selectedEndTime)
                      ) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          <span style={{ fontSize: "12px" }}>
                            "Please select a time between 09:00 and 17:00."
                          </span>
                        );
                      }
                    } else {
                      return Promise.reject(
                        <span style={{ fontSize: "12px" }}>
                          "Please select today or tomorrow."
                        </span>
                      );
                    }
                  },
                },
              ]}
            >
              <DatePicker
                className="preorderInput"
                format="YYYY-MM-DD HH:mm"
                onChange={(date, dateString) => {
                  setInput({
                    ...input,
                    PickUpDateTime: new Date(dateString),
                  });
                }}
                showTime={{ use12Hours: true }}
              />
            </Form.Item>

            <h4>หมายเหตุ</h4>
            <label htmlFor="" className="datetime-recive">
              <Form.Item
                name="Note"
                rules={[
                  {
                    validator: (_, value) => {
                      let invalidWords = [];
                      if (/กู/i.test(value)) {
                        invalidWords.push("กู");
                      }
                      if (/มึง/i.test(value)) {
                        invalidWords.push("มึง");
                      }
                      if (/สัส/i.test(value)) {
                        invalidWords.push("สัส");
                      }
                      if (/เหี้ย/i.test(value)) {
                        invalidWords.push("เหี้ย");
                      }
                      if (/สันขวาน/i.test(value)) {
                        invalidWords.push("สันขวาน");
                      }
                      if (/ควย/i.test(value)) {
                        invalidWords.push("ควย");
                      }
                      if (/ไม่อร่อย/i.test(value)) {
                        invalidWords.push("ไม่อร่อย");
                      }
                      if (/โง่/i.test(value)) {
                        invalidWords.push("โง่");
                      }
                      if (invalidWords.length > 0) {
                        const invalidWordsString = invalidWords
                          .map((word) => `"${word}"`)
                          .join(", ");
                        return Promise.reject(
                          <span style={{ fontSize: "12px" }}>
                            "หมายเหตุไม่ควรมีคำว่า ${invalidWordsString}{" "}
                            กรุณาเปลี่ยนหมายเหตุ !""
                          </span>
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  className="preorderInput"
                  type="text"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      Note: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </label>
            <h4 className="total-amout-allMenu">
              <span>รวมราคา</span>
              {!preorder_payment_status && (
                <p>{input.TotalAmount?.toFixed(2) ?? "N/A"}.-</p>
              )}
            </h4>
          </div>{" "}
        </div>
        <button
          className="btn-addmenu"
          type="submit"
          // onClick={() => { navigate(`/payment/${preorder?.ID}`) }}
        >
          ชำระเงิน
        </button>
      </Form>
      {editMenupop && (
        <div className={`${editMenupop ? "edit-menuactive" : "edit-menu"}`}>
          <EditMenuPreorder
            onCloseAddmenupop={() => {
              setEditmenupop(false);
              getNewPreoderByMember(preorder?.ID ?? 0);
            }}
            editMenu={menu}
            preordermenus={preordermenu}
            preorder={preorder}
          />
        </div>
      )}
    </>
  );
};
export default EditPreorder;
