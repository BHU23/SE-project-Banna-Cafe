import { useEffect, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { message } from "antd";
import "../addMenuOrder/addMenuOrder.css";
import "./editOrder.css";
import { useForm } from "react-hook-form";
import { OrderMenuInterface } from "../../../../interfaces/IOrderMenu";
import { OrderInterface } from "../../../../interfaces/IOrder";
import { MenusInterface } from "../../../../interfaces/IMenu";
import {
  GetMenuOrdersByOrderID,
  GetNewOrderByMemberID,
  GetStatusOrderByMemberID,
  UpdateOrder,
} from "../../../../services/https/order";
import { GetMenuById } from "../../../../services/https/menu";
import { UpdateOrderMenu } from "../../../../services/https/orderMenu";
import EditMenuOrder from "../editMenuOrder";
import { StatusOrderInterface } from "../../../../interfaces/IStatusOrder";
interface EditOrderProps {
  onClosebasketMenupop: () => void;
}
const EditOrder: React.FC<EditOrderProps> = ({
  onClosebasketMenupop,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [ordermenus, setOrderMenus] = useState<OrderMenuInterface[]>(
    []
  );
  const [ordermenu, setOrderMenu] = useState<OrderMenuInterface>();
  const [order, setOrder] = useState<OrderInterface>();
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [menu, setMenu] = useState<MenusInterface>();
  const [editMenupop, setEditmenupop] = useState(false);
  const [statusorder, setStatusOrder] =
    useState<StatusOrderInterface>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderInterface>({
    defaultValues: {
      TotalAmount: order?.TotalAmount || 0,
      MemberID: 1,
      TimeOfCreate: new Date(),
      
    },
  });

  const getNewOrderByMember = async (
    id: number
  ): Promise<number | undefined> => {
    let res = await GetNewOrderByMemberID(id);
    if (res) {
      setOrder(res);
      setValue("TotalAmount", res.TotalAmount || 0);
      setValue("MemberID", res.MemberID || 1);
      setValue("TimeOfCreate", new Date(res.PickUpDateTime) || "");
      getOrdersMenusByOrderID(res.ID);
    }
    return undefined;
  };
  const getOrdersMenusByOrderID = async (id: number) => {
    let res = await GetMenuOrdersByOrderID(id);
    if (res) {
      setOrderMenus(res);
      getMenusByID(res);
    }
  };
  const getMenusByID = async (orderMenus: OrderMenuInterface[]) => {
    let getMenus: MenusInterface[] = [];

    for (let i = 0; i < orderMenus.length; i++) {
      let res = await GetMenuById(orderMenus[i].MenuID);

      if (res) {
        getMenus[i] = res;
      }
    }
    setMenus(getMenus);
  };
  const getStatusOrderByMember = async (id: number) => {
    let res = await GetStatusOrderByMemberID(id);
    if (res) {
      setStatusOrder(res);
    }
  };
  useEffect(() => {
    getStatusOrderByMember(1);
    getNewOrderByMember(1);
  }, []);
  const onSubmitUpDateOrderMenu = async (
    values: OrderMenuInterface & OrderInterface
  ) => {
    let res1 = await UpdateOrderMenu(values);
    values.ID = order?.ID;
    values.TimeOfCreate = order?.TimeOfCreate;
    values.TotalAmount = watch("TotalAmount");
    let res2 = await UpdateOrder(values);
    if (!res1.status && !res2.status) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด ไม่สามารถแก้ไขจำนวนได้",
      });
    }
  };
  const onSubmitUpDatePreorder = async (values: OrderInterface) => {
    values.ID = order?.ID;
    values.TimeOfCreate = new Date(values?.TimeOfCreate ?? 0);
    // const h = values.PickUpDateTime.getHours;
    // values.PickUpDateTime.setHours(h);
    console.log(values.TimeOfCreate);
    console.log("values");
    console.log(values);
    let res = await UpdateOrder(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกเมนูสำเร็จ",
      });
      setTimeout(function () {
        onClosebasketMenupop();
      }, 20000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const handleDecrease = (
    ordermenu: OrderMenuInterface,
    index: number
  ) => {
    if (
      ordermenu.Amount !== undefined &&
      ordermenu.Amount > 1 &&
      ordermenu.Menu?.MenuCost !== undefined
    ) {
      const menuCost = (ordermenu.Cost ?? 0) / ordermenu.Amount;
      const newAmount = ordermenu.Amount - 1;
      ordermenus[index].Cost = (ordermenu.Cost ?? 0) - menuCost;
      ordermenus[index].Amount = newAmount;
      setValue("TotalAmount", (watch("TotalAmount") ?? 0) - menuCost);
    }
  };
  const handleIncrease = (
    ordermenu: OrderMenuInterface,
    index: number
  ) => {
    if (
      ordermenu.Amount !== undefined &&
      ordermenu.Amount >= 1 &&
      ordermenu.Menu?.MenuCost !== undefined
    ) {
      const menuCost = (ordermenu.Cost ?? 0) / ordermenu.Amount;
      const newAmount = ordermenu.Amount + 1;
      ordermenus[index].Cost = (ordermenu.Cost ?? 0) + menuCost;
      ordermenus[index].Amount = newAmount;
      setValue("TotalAmount", (watch("TotalAmount") ?? 0) + menuCost);
    }
  };
  const pickUpDateTime = watch("TimeOfCreate");
  return (
    <>
      <form
        className="edit-crad"
        name="basic"
        onSubmit={handleSubmit((data) => onSubmitUpDatePreorder(data))}
        autoComplete="off"
      >
        {contextHolder}
        <div className="rat-costEdit">
          <span className="icon-close-addmenu" onClick={onClosebasketMenupop}>
            <IoRestaurantOutline />
          </span>
        </div>
        <div className="form-edit">
          <h4>ตะกร้าสินค้า</h4>
          <div className="basket-menu">
            {statusorder?.ID == 1 &&
              ordermenus.map(
                (ordermenu: OrderMenuInterface, index: number) => (
                  <>
                    <div className="menu-data" key={index}>
                      <img
                        src={menus[index]?.MenuImage}
                        alt=""
                        className="imge-item"
                      />
                      <h5 className="name-item">
                        {menus[index]?.MenuName}
                        <br />
                        <span>{menus[index]?.MenuNameEng}</span>
                      </h5>
                      <h5 className="size-item">
                        {ordermenu.MenuSize?.Name}
                      </h5>
                      <h5 className="total-amount">
                        {ordermenu.Cost !== undefined
                          ? ordermenu.Cost.toFixed(2)
                          : "N/A"}
                        .-
                      </h5>
                      <h5 className="amount">{ordermenu.Amount}</h5>
                      <div className="add-minus">
                        <div
                          className="btn-quantity minus"
                          onClick={() => {
                            handleDecrease(ordermenu, index);
                            onSubmitUpDateOrderMenu(ordermenu);
                          }}
                        >
                          -
                        </div>
                        <div
                          className="btn-quantity add"
                          onClick={() => {
                            handleIncrease(ordermenu, index);
                            onSubmitUpDateOrderMenu(ordermenu);
                          }}
                        >
                          +
                        </div>
                      </div>
                      <div
                        className="btn-description"
                        onClick={() => {
                          setMenu(menus[index]);
                          setEditmenupop(true);
                          setOrderMenu(ordermenu);
                        }}
                      >
                        <h6>รายละเอียด</h6>
                      </div>
                    </div>
                    <hr />
                  </>
                )
              )}
          </div>
          <hr />
          <div className="data-preOrder">
            <h5>วัน-เวลาที่รับ</h5>
            <label htmlFor="" className="datetime-recive">
              <input
                type="datetime-local"
                defaultValue={
                  pickUpDateTime instanceof Date
                    ? pickUpDateTime.toISOString().slice(0, 16)
                    : ""
                }
                {...register("TimeOfCreate", {
                  // required: { value: true, message: "This is required" },
                })}
              />
            </label>
            <h5>หมายเหตุ</h5>
            <label htmlFor="" className="datetime-recive">
              <input
                type="text"
              />
            </label>
            <h5 className="total-amout-allMenu">
              <span>รวมราคา</span>
              {statusorder?.ID == 1 && (
                <p>{watch("TotalAmount")?.toFixed(2) ?? "N/A"}.-</p>
              )}
            </h5>
          </div>
        </div>
        <button className="btn-addmenu" type="submit">
          ยืนยัน
        </button>
      </form>
      {editMenupop && (
        <div className={`${editMenupop ? "edit-menuactive" : "edit-menu"}`}>
          <EditMenuOrder
            onCloseAddmenupop={() => {
              setEditmenupop(false);
              getNewOrderByMember(1);
            }}
            editMenu={menu}
            ordermenus={ordermenu}
            order={order}
          />
        </div>
      )}
    </>
  );
};
export default EditOrder;
