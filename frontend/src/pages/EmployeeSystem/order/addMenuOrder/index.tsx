import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { message } from "antd";
import "./addMenuOrder.css";
import { OrderMenuInterface } from "../../../../interfaces/IOrderMenu";
import {
  CreateOrderMenu,
  GetDrinkOptions,
  GetMenuSize,
  GetSweetnesses,
} from "../../../../services/https/orderMenu";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { OrderInterface } from "../../../../interfaces/IOrder";
import { GetRatingsByMenuID } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
import { MenuSizesInterface } from "../../../../interfaces/IMenuSize";
import { SweetnessesInterface } from "../../../../interfaces/ISweetness";
import { DrinkOptionsInterface } from "../../../../interfaces/IDrinkOption";
import {
  CreateOrder,
  GetNewOrderByMemberID,
  GetStatusOrderByMemberID,
  UpdateOrder,
} from "../../../../services/https/order";
import { StatusOrderInterface } from "../../../../interfaces/IStatusOrder";
interface AddMenuOrderProps {
  onCloseAddmenupop: () => void;
  addMenu: MenusInterface | undefined;
}
const AddMenuOrder: React.FC<AddMenuOrderProps> = ({
  onCloseAddmenupop,
  addMenu,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [rating, setRating] = useState<number | string>("");
  const [menuSize, setMenuSize] = useState<MenuSizesInterface[]>([]);
  const [sweetness, setSweetness] = useState<SweetnessesInterface[]>([]);
  const [drinkOption, setDrinkOption] = useState<DrinkOptionsInterface[]>([]);
  const [order, setOrder] = useState<OrderInterface>();
  const [statusorder, setStatusOrder] =
    useState<StatusOrderInterface>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<
      OrderMenuInterface &
      OrderInterface &
      StatusOrderInterface 
  >({
    defaultValues: {
      Amount: 1,
      Cost: addMenu?.MenuCost,
      MenuID: addMenu?.ID,
      OrderID: 1,
      MenuSizeID: 1,
      SweetnessID: 1,
      DrinkOptionID: 1,
      DrinkOptionStatus: 1,
      SweetnessStatus: 1,
      MenuSizeStatus: 1,
      TotalAmount: 0,
      MemberID: 1,
      TimeOfCreate: new Date(),
      Note: "",
      StatusID: 1,
    },
  });

  const onSubmitAddMenuOrder = async (
    values: OrderMenuInterface & OrderInterface
  ) => {
    if (statusorder?.ID === 2 || order === undefined) {
      const TotalAmount = (watch("Cost") ?? 0).toFixed(2);
      values.TotalAmount = parseFloat(TotalAmount);
      let res1 = await CreateOrder(values);
      if (!res1.status) {
        messageApi.open({
          type: "error",
          content: res1.message,
        });
        return;
      }
    } else {
      values.ID = order?.ID;
      const TotalAmount = (watch("Cost") ?? 0).toFixed(2);
      values.TotalAmount = parseFloat(TotalAmount);
      values.TotalAmount = values.TotalAmount + (order.TotalAmount ?? 0);
      const localtime = new Date();
      values.TimeOfCreate = new Date(localtime.getTime());
      console.log("values");
      console.log(values);
      let res1 = await UpdateOrder(values);
      if (!res1.status) {
        messageApi.open({
          type: "error",
          content: res1.message,
        });
        return;
      }
    }
    values.OrderID = (await getIDOrderByMember(1)) ?? 0;

    let res2 = await CreateOrderMenu(values);
    if (res2.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกเมนูสำเร็จ",
      });
      setTimeout(function () {
        onCloseAddmenupop();
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: res2.message,
      });
    }
  };
  const getMenusRating = async () => {
    let res = await GetRatingsByMenuID(addMenu?.ID);
    if (res) {
      setRating(setMenuRatingByMenuID(res));
    } else {
      setRating("+");
    }
  };
  const setMenuRatingByMenuID = (rat: RatingsInterface[]): number | string => {
    if (rat.length === 0) {
      return "+";
    }
    let sumRating = 0;
    for (let i = 0; i < rat.length; i++) {
      sumRating += rat[i].Score || 0;
    }
    return sumRating / rat.length;
  };

  const getMenuSizes = async () => {
    let res = await GetMenuSize();
    if (res) {
      setMenuSize(res);
    }
  };
  const getSweetnesses = async () => {
    let res = await GetSweetnesses();
    if (res) {
      setSweetness(res);
    }
  };
  const getDrinkOptions = async () => {
    let res = await GetDrinkOptions();
    if (res) {
      setDrinkOption(res);
    }
  };
  const getStatusOrderByMember = async (id: number) => {
    let res = await GetStatusOrderByMemberID(id);
    if (res) {
      setStatusOrder(res);
    }
  };
  const getNewOrderByMember = async (id: Number) => {
    let res = await GetNewOrderByMemberID(id);
    if (res) {
      setOrder(res);
      setValue("TotalAmount", res.TotalAmount);
    }
  };
  const getIDOrderByMember = async (
    id: number
  ): Promise<number | undefined> => {
    let res = await GetNewOrderByMemberID(id);
    if (res) {
      return res.ID;
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getMenusRating(),
        getMenuSizes(),
        getDrinkOptions(),
        getSweetnesses(),
        getNewOrderByMember(1),
        getStatusOrderByMember(1),
      ]);
    };
    fetchData();
  }, [addMenu?.ID]);

  const amount = watch("Amount");

  const handleDecrease = () => {
    if (
      amount !== undefined &&
      amount > 1 &&
      addMenu?.MenuCost !== undefined
    ) {
      const newAmount = amount - 1;
      setValue("Amount", newAmount);
      setValue("Cost", newAmount * addMenu.MenuCost);
    }
  };

  const handleIncrease = () => {
    if (
      amount !== undefined &&
      amount >= 1 &&
      addMenu?.MenuCost !== undefined
    ) {
      const newAmount = amount + 1;
      setValue("Amount", newAmount);
      setValue("Cost", newAmount * addMenu.MenuCost);
    }
  };
  return (
    <form
      className="add-crad"
      name="basic"
      onSubmit={handleSubmit((data) => onSubmitAddMenuOrder(data))}
      autoComplete="off"
    >
      {contextHolder}
      <div className="rat-costadd">
        <div className="addmenu-rating">
          <FaStar /> <span>{rating}</span>
        </div>
        <span className="icon-close-addmenu" onClick={onCloseAddmenupop}>
          <IoRestaurantOutline />
        </span>
      </div>
      <div className="form-add">
        <div className="addmenu-imge">
          <img src={addMenu?.MenuImage} alt="Menu Image" />
        </div>
        <div className="addmenu-name">
          {addMenu?.MenuName} <br />
          <span>{addMenu?.MenuNameEng} </span>
        </div>
        <div className="menu-amount">
          <div className="btn-amount minus" onClick={handleDecrease}>
            -
          </div>
          <span>{amount}</span>
          <div className="btn-amount plus" onClick={handleIncrease}>
            +
          </div>
        </div>
        <h5>
          ขนาด
          <div className="menu-size">
            {menuSize.map((menuSize: MenuSizesInterface, index: number) => (
              <label key={index} className={watch("MenuSizeID") == index+1 ? "active":"-"}>
                <input
                  type="checkbox"
                  {...register("MenuSizeStatus", {
                    required: { value: true, message: "this is required" },
                  })}
                  onClick={() => {
                    const newMenuSizeID = menuSize.ID;
                    setValue("MenuSizeID", newMenuSizeID);
                  }}
                  checked={menuSize.ID === watch("MenuSizeID")}
                />
                {menuSize.Quantity} ml.
              </label>
            ))}
          </div>
          {errors.MenuSizeID && (
            <p className="errorMsg">{errors.MenuSizeID.message}</p>
          )}
        </h5>
        <h5>
          ความหวาน
          {sweetness.map((sweetness, index) => (
            <div className="menu-sweetness">
              <label>
                <input
                  type="checkbox"
                  {...register("SweetnessStatus", {
                    required: { value: true, message: "this is require" },
                  })}
                  onClick={() => {
                    const newMenuSweetnessID = sweetness.ID;
                    setValue("SweetnessID", newMenuSweetnessID);
                  }}
                  checked={watch("SweetnessID") === sweetness.ID}
                />
                {sweetness.Name} <span>{sweetness.Value}%</span>
              </label>
            </div>
          ))}
        </h5>
        <h5>
          รูปแบบ
          {drinkOption.map((drinkOption, index) => (
            <div className="menu-option">
              <label>
                <input
                  type="checkbox"
                  {...register("DrinkOptionStatus", {
                    required: { value: true, message: "this is require" },
                  })}
                  onClick={() => {
                    const newDrinkOptionID = drinkOption.ID;
                    setValue("DrinkOptionID", newDrinkOptionID);
                  }}
                  checked={watch("DrinkOptionID") === drinkOption.ID}
                />
                {drinkOption.Name}
              </label>
            </div>
          ))}
        </h5>
        <div className="menu-total">
          <span>ราคา</span>
          <p>{watch("Cost")?.toFixed(2) ?? "N/A"}-.</p>
        </div>
      </div>
      <button className="btn-addmenu" type="submit">
        +เพิ่ม
      </button>
    </form>
  );
};
export default AddMenuOrder;
