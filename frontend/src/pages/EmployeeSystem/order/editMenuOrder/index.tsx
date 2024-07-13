import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "../addMenuOrder/addMenuOrder.css";
import { OrderMenuInterface } from "../../../../interfaces/IOrderMenu";
import {
  CreateOrderMenu,
  GetDrinkOptions,
  GetMenuSize,
  GetSweetnesses,
  UpdateOrderMenu,
} from "../../../../services/https/orderMenu";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { OrderInterface } from "../../../../interfaces/IOrder";
import { GetRatingsByMenuID } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
import { MenuSizesInterface } from "../../../../interfaces/IMenuSize";
import { SweetnessesInterface } from "../../../../interfaces/ISweetness";
import { DrinkOptionsInterface } from "../../../../interfaces/IDrinkOption";
import { UpdateOrder } from "../../../../services/https/order";

interface EditMenuOrderProps {
  onCloseAddmenupop: () => void;
  editMenu: MenusInterface | undefined;
  ordermenus: OrderMenuInterface | undefined;
  order: OrderInterface | undefined;
}
const EditMenuOrder: React.FC<EditMenuOrderProps> = ({
  onCloseAddmenupop,
  editMenu,
  ordermenus,
  order,
}) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [rating, setRating] = useState<number | string>("");
  const [menuSize, setMenuSize] = useState<MenuSizesInterface[]>([]);
  const [sweetness, setSweetness] = useState<SweetnessesInterface[]>([]);
  const [drinkOption, setDrinkOption] = useState<DrinkOptionsInterface[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderMenuInterface & OrderInterface>({
    defaultValues: {
      Amount: ordermenus?.Amount,
      Cost: ordermenus?.Cost,
      MenuID: editMenu?.ID,
      OrderID: ordermenus?.OrderID,
      MenuSizeID: ordermenus?.MenuSizeID,
      SweetnessID: ordermenus?.SweetnessID,
      DrinkOptionID: ordermenus?.DrinkOptionID,
      DrinkOptionStatus: 1,
      SweetnessStatus: 1,
      MenuSizeStatus: 1,
      TotalAmount: 0,
    },
  });

  const onSubmitEditMenuOrder = async (values: OrderMenuInterface) => {
    values.ID = ordermenus?.ID;
    values.OrderID = ordermenus?.OrderID;
    const newTotalCost = values.Cost;
    let res1 = await UpdateOrderMenu(values);
    if (res1.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกเมนูสำเร็จ",
      });
      setTimeout(function () {
        onCloseAddmenupop();
      }, 2000);
      onSubmitUpDateOrder(values, newTotalCost ?? 0);
    } else {
      messageApi.open({
        type: "error",
        content: res1.message,
      });
    }
  };
  const onSubmitUpDateOrder = async (
    values: OrderInterface,
    newTotalCost: number,
  ) => {
    values.ID = order?.ID;
    values.MemberID = order?.MemberID;
    const oldTotolCost = ordermenus?.Cost;
    const addTotalCost = newTotalCost - (oldTotolCost ?? 0);
    values.TotalAmount = addTotalCost + (order?.TotalAmount ?? 0);
    const localtime = new Date();
    values.TimeOfCreate = new Date(localtime.getTime());
    let res1 = await UpdateOrder(values);
    if (!res1.status) {
      messageApi.open({
        type: "error",
        content: res1.message,
      });
      return;
    }
  };
  const getMenusRating = async () => {
    let res = await GetRatingsByMenuID(editMenu?.ID);
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

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getMenusRating(),
        getMenuSizes(),
        getDrinkOptions(),
        getSweetnesses(),
      ]);
    };
    fetchData();
  }, [editMenu?.ID]);

  const amount = watch("Amount");

  const handleDecrease = () => {
    if (
      amount !== undefined &&
      amount > 1 &&
      editMenu?.MenuCost !== undefined
    ) {
      const newAmount = amount - 1;
      setValue("Amount", newAmount);
      setValue("Cost", newAmount * editMenu.MenuCost);
    }
  };

  const handleIncrease = () => {
    if (
      amount !== undefined &&
      amount >= 1 &&
      editMenu?.MenuCost !== undefined
    ) {
      const newAmount = amount + 1;
      setValue("Amount", newAmount);
      setValue("Cost", newAmount * editMenu.MenuCost);
    }
  };
  return (
    <form
      className="add-crad"
      name="basic"
      onSubmit={handleSubmit((data) => onSubmitEditMenuOrder(data))}
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
          <img src={editMenu?.MenuImage} alt="Menu Image" />
        </div>
        <div className="addmenu-name">
          {editMenu?.MenuName} <br />
          <span>{editMenu?.MenuNameEng} </span>
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
              <label
                key={index}
                className={watch("MenuSizeID") == index + 1 ? "active" : "-"}
              >
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
        ยืนยันการแก้ไข
      </button>
    </form>
  );
};
export default EditMenuOrder;
