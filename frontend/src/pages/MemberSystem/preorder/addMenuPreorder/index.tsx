import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { message } from "antd";
import "./addMenuPreorder.css";
import { PreorderMenusInterface } from "../../../../interfaces/IPreorderMenu";
import {
  CreatePreorderMenu,
  GetDrinkOptions,
  GetMenuSize,
  GetSweetnesses,
} from "../../../../services/https/preoederMenu";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { PreordersInterface } from "../../../../interfaces/IPreorder";
import { GetRatingsByMenuID } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
import { MenuSizesInterface } from "../../../../interfaces/IMenuSize";
import { SweetnessesInterface } from "../../../../interfaces/ISweetness";
import { DrinkOptionsInterface } from "../../../../interfaces/IDrinkOption";
import {
  CreatePreorder,
  GetNewPreorderByMemberID,
  GetPreorderStatusPaymentByMemberID,
  UpdatePreorder,
} from "../../../../services/https/preorder";
import { StatusApprovePreordersInterface } from "../../../../interfaces/IStatusApprovePreorder";
import { PreorderStatusApprovesInterface } from "../../../../interfaces/IPreorderStatusApprove";
import { PreorderStatusRecivesInterface } from "../../../../interfaces/IPreorderStatusRecive";
import { PaymentInterface } from "../../../../interfaces/IPayment";
interface AddMenuPreorderProps {
  onCloseAddmenupop: () => void;
  addMenu: MenusInterface | undefined;
  setReviewPopup: () => void;
}
const AddMenuPreorder: React.FC<AddMenuPreorderProps> = ({
  onCloseAddmenupop,
  addMenu,
  setReviewPopup,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [rating, setRating] = useState<number | string>("");
  const [menuSize, setMenuSize] = useState<MenuSizesInterface[]>([]);
  const [sweetness, setSweetness] = useState<SweetnessesInterface[]>([]);
  const [drinkOption, setDrinkOption] = useState<DrinkOptionsInterface[]>([]);
  const [preorder, setPreorder] = useState<PreordersInterface>();
  const [menuCost, setMenuCost] = useState(addMenu?.MenuCost);
  const [preorder_payment_status, setPreorder_payment_status] =
    useState<PaymentInterface>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<
    PreorderMenusInterface &
      PreordersInterface &
      PreorderStatusApprovesInterface &
      PreorderStatusRecivesInterface
  >({
    defaultValues: {
      Quantity: 1,
      TotalCost: addMenu?.MenuCost,
      MenuID: addMenu?.ID,
      PreorderID: 1,
      MenuSizeID: 1,
      SweetnessID: 1,
      DrinkOptionID: 1,
      DrinkOptionStatus: 1,
      SweetnessStatus: 1,
      MenuSizeStatus: 1,

      IDPreorder:'',
      TotalAmount: 0,
      MemberID: Number(localStorage.getItem("id")),
      PickUpDateTime: new Date(),
      Note: "",
      Respond: "",

      StatusApprovePreorderID: 1,
      StatusRecivePreorderID: 1,
    },
  });

  const onSubmitAddMenuPreorder = async (
    values: PreorderMenusInterface & PreordersInterface
  ) => {
    if (preorder_payment_status || preorder === undefined) {
      const TotalAmount = (watch("TotalCost") ?? 0).toFixed(2);
      values.TotalAmount = parseFloat(TotalAmount);
      values.TotalAmount = values?.TotalAmount
        ? parseFloat(values?.TotalAmount.toFixed(2))
        : 0;
      const localtime = new Date();
      values.PickUpDateTime = new Date(localtime.getTime() + 50 * 60000);
      console.log("values1");
      console.log(values);
      let res1 = await CreatePreorder(values);
      if (!res1.status) {
        messageApi.open({
          type: "error",
          content: res1.message,
        });
        return;
      }
    } else {
      values.ID = preorder?.ID;
      values.IDPreorder = preorder.IDPreorder;
      const totalCost = watch("TotalCost") ?? 0;
      values.TotalAmount = parseFloat(totalCost.toFixed(2));
      values.TotalAmount += preorder.TotalAmount ?? 0;
      values.TotalAmount = parseFloat(values.TotalAmount.toFixed(2));
      values.PickUpDateTime = new Date(Date.now() + 50 * 60000);
      console.log("values3");
      console.log(values);
      let res1 = await UpdatePreorder(values);
      if (!res1.status) {
        messageApi.open({
          type: "error",
          content: res1.message,
        });
        return;
      }
    }
    values.PreorderID = (await getIDPreoderByMember(Number(localStorage.getItem("id")))) ?? 0;
    console.log(values);
    let res2 = await CreatePreorderMenu(values);
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
  const getPreoderStatusPaymentByMember = async (id: number) => {
    let res = await GetPreorderStatusPaymentByMemberID(id);
    if (res) {
      setPreorder_payment_status(res);
    }
  };
  const getNewPreoderByMember = async (id: Number) => {
    let res = await GetNewPreorderByMemberID(id);
    if (res) {
      setPreorder(res);
      setValue("TotalAmount", res.TotalAmount);
    }
  };
  const getIDPreoderByMember = async (
    id: number
  ): Promise<number | undefined> => {
    let res = await GetNewPreorderByMemberID(id);
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
        getNewPreoderByMember(Number(localStorage.getItem("id"))),
        getPreoderStatusPaymentByMember(Number(localStorage.getItem("id"))),
      ]);
    };
    fetchData();
  }, [addMenu?.ID]);

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
      setMenuCost((addMenu?.MenuCost ?? 0) + menucost);
      setValue("TotalCost", quantity * menuCost);
    }
  };
  return (
    <>
      <form
        className="add-crad"
        name="basic"
        onSubmit={handleSubmit((data) => onSubmitAddMenuPreorder(data))}
        autoComplete="off"
      >
        {contextHolder}
        <div className="rat-costadd">
          <div className="addmenu-rating" onClick={setReviewPopup}>
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
            <span>{quantity}</span>
            <div className="btn-amount plus" onClick={handleIncrease}>
              +
            </div>
          </div>
          {addMenu?.MenuType?.ID == 1 ||
          addMenu?.MenuType?.ID == 2 ||
          addMenu?.MenuType?.ID == 3 ? (
            <>
              <h5>
                ขนาด
                <div className="menu-size">
                  {menuSize.map(
                    (menuSize: MenuSizesInterface, index: number) => (
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
                            required: {
                              value: true,
                              message: "this is required",
                            },
                          })}
                          checked={menuSize.ID === watch("MenuSizeID")}
                        />
                        {menuSize.Quantity}{" "}{ menuSize.UnitOfQuantity}.
                      </label>
                    )
                  )}
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
          +เพิ่ม
        </button>
      </form>
    </>
  );
};
export default AddMenuPreorder;
