import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoRestaurantOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "../addMenuPreorder/addMenuPreorder.css";
import { PreorderMenusInterface } from "../../../../interfaces/IPreorderMenu";
import {
  GetDrinkOptions,
  GetMenuSize,
  GetSweetnesses,
  UpdatePreorderMenu,
} from "../../../../services/https/preoederMenu";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { PreordersInterface } from "../../../../interfaces/IPreorder";
import { MenuSizesInterface } from "../../../../interfaces/IMenuSize";
import { SweetnessesInterface } from "../../../../interfaces/ISweetness";
import { DrinkOptionsInterface } from "../../../../interfaces/IDrinkOption";
import { UpdatePreorder } from "../../../../services/https/preorder";

interface EditMenuPreorderProps {
  onCloseAddmenupop: () => void;
  editMenu: MenusInterface | undefined;
  preordermenus: PreorderMenusInterface | undefined;
  preorder: PreordersInterface | undefined;
}
const EditMenuPreorder: React.FC<EditMenuPreorderProps> = ({
  onCloseAddmenupop,
  editMenu,
  preordermenus,
  preorder,
}) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [menuSize, setMenuSize] = useState<MenuSizesInterface[]>([]);
  const [sweetness, setSweetness] = useState<SweetnessesInterface[]>([]);
  const [drinkOption, setDrinkOption] = useState<DrinkOptionsInterface[]>([]);
  const [menuCost, setMenuCost] = useState(
    (editMenu?.MenuCost ?? 0) + (preordermenus?.MenuSize?.AddAmount ?? 0)
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PreorderMenusInterface & PreordersInterface>({
    defaultValues: {
      Quantity: preordermenus?.Quantity,
      TotalCost: preordermenus?.TotalCost,
      MenuID: editMenu?.ID,
      PreorderID: preordermenus?.PreorderID,
      MenuSizeID: preordermenus?.MenuSizeID,
      SweetnessID: preordermenus?.SweetnessID,
      DrinkOptionID: preordermenus?.DrinkOptionID,
      DrinkOptionStatus: 1,
      SweetnessStatus: 1,
      MenuSizeStatus: 1,
      TotalAmount: 0,
    },
  });

  const onSubmitEditMenuPreorder = async (
    values: PreorderMenusInterface & PreordersInterface
  ) => {
    values.ID = preordermenus?.ID;
    values.PreorderID = preordermenus?.PreorderID;
    values.TotalCost = values?.TotalCost
      ? parseFloat(values?.TotalCost.toFixed(2))
      : 0;
    const newTotalCost = values.TotalCost;
    console.log(values);
    let res1 = await UpdatePreorderMenu(values);
    if (res1.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกเมนูสำเร็จ",
      });
      setTimeout(function () {
        onCloseAddmenupop();
      }, 2000);
      onSubmitUpDatePreorder(values, newTotalCost ?? 0);
    } else {
      messageApi.open({
        type: "error",
        content: res1.message,
      });
    }
  };
  const onSubmitUpDatePreorder = async (
    values: PreordersInterface,
    newTotalCost: number
  ) => {
    values.ID = preorder?.ID;
    values.IDPreorder = preorder?.IDPreorder
    values.MemberID = preorder?.MemberID;
    const oldTotolCost = preordermenus?.TotalCost;
    console.log("oldTotolCost");
    console.log(oldTotolCost);
    console.log(newTotalCost);
    const addTotalCost = parseFloat((newTotalCost - (oldTotolCost ?? 0)).toFixed(2));
    console.log(addTotalCost);
    console.log(preorder?.TotalAmount);
    values.TotalAmount = addTotalCost + (preorder?.TotalAmount ?? 0);
    console.log(values.TotalAmount);
    values.TotalAmount = values?.TotalAmount
      ? parseFloat(values?.TotalAmount.toFixed(2))
      : 0;
    const localtime = new Date();
    values.PickUpDateTime = new Date(localtime.getTime() + 50 * 60000);
    console.log(values)
    let res1 = await UpdatePreorder(values);
    if (!res1.status) {
      messageApi.open({
        type: "error",
        content: res1.message,
      });
      return;
    }
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
      await Promise.all([getMenuSizes(), getDrinkOptions(), getSweetnesses()]);
    };
    fetchData();
  }, [editMenu?.ID]);

  const quantity = watch("Quantity");

  const handleDecrease = () => {
    if (quantity !== undefined && quantity > 1 && menuCost !== undefined) {
      const newQuantity = quantity - 1;
      setValue("Quantity", newQuantity);
      setValue("TotalCost", newQuantity * menuCost);
    }
  };

  const handleIncrease = () => {
    if (quantity !== undefined && quantity >= 1 && menuCost !== undefined) {
      const newQuantity = quantity + 1;
      setValue("Quantity", newQuantity);
      setValue("TotalCost", newQuantity * menuCost);
    }
  };
  const handleCost = (menucost: number) => {
    if (quantity !== undefined && quantity >= 1 && menuCost !== undefined) {
      setMenuCost((editMenu?.MenuCost ?? 0) + menucost);
      setValue("TotalCost", quantity * menuCost);
    }
  };
  return (
    <form
      className="add-crad"
      name="basic"
      onSubmit={handleSubmit((data) => onSubmitEditMenuPreorder(data))}
      autoComplete="off"
    >
      {contextHolder}
      <div className="rat-costadd">
        <div className="addmenu-rating"></div>
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
          <span>{quantity}</span>
          <div className="btn-amount plus" onClick={handleIncrease}>
            +
          </div>
        </div>
        {editMenu?.MenuType?.ID == 1 ||
        editMenu?.MenuType?.ID == 2 ||
        editMenu?.MenuType?.ID == 3 ? (
          <>
            <h5>
              ขนาด
              <div className="menu-size">
                {menuSize.map((menuSize: MenuSizesInterface, index: number) => (
                  <label
                    key={index}
                    className={
                      watch("MenuSizeID") == index + 1 ? "active" : "-"
                    }
                    onClick={() => {
                      const newMenuSizeID = menuSize.ID;
                      setValue("MenuSizeID", newMenuSizeID);
                      handleCost(menuSize?.AddAmount ?? 0);
                      handleCost(menuSize?.AddAmount ?? 0);
                    }}
                  >
                    <input
                      type="checkbox"
                      {...register("MenuSizeStatus", {
                        required: { value: true, message: "this is required" },
                      })}
                      checked={menuSize.ID === watch("MenuSizeID")}
                    />
                    {menuSize.Quantity} {menuSize.UnitOfQuantity}.
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
            </h5>{" "}
          </>
        ) : (
          <>
            <h5>
              <div className="menu-size"> </div>
            </h5>
            <h5>
              <div className="menu-size"> </div>
            </h5>
            <h5>
              <div className="menu-size"> </div>
            </h5>
            <h5>
              <div className="menu-size"> </div>
            </h5>
            <h5>
              <div className="menu-size"> </div>
            </h5>
          </>
        )}
        <div className="menu-total">
          <span>ราคา</span>
          <p>{watch("TotalCost")?.toFixed(2) ?? "N/A"}-.</p>
        </div>
      </div>
      <button className="btn-addmenu" type="submit">
        ยืนยันการแก้ไข
      </button>
    </form>
  );
};
export default EditMenuPreorder;
