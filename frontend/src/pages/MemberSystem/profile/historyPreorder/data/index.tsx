import react, {
  useEffect,
  useState,
} from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import "./data.css";
import { PreorderMenusInterface } from "../../../../../interfaces/IPreorderMenu"
import {
  GetMenuPreordersByPreoderID,
} from "../../../../../services/https/preoederMenu";
import { PreOrderInterface } from "../../../../../interfaces/IManagepreorder";

interface HistoryPreorderProps {
  onClosehistoryDatapopup: () => void;
  preorder: PreOrderInterface | undefined;
}
const HistoryPreorderData: React.FC<HistoryPreorderProps> = ({
  onClosehistoryDatapopup,
  preorder,
}) => {
  const [preordermenus, setrPeorderMenus] = useState<PreorderMenusInterface[]>(
    []
  );

  const getPreordersMenusByPreoderID = async (id: number) => {
    let res = await GetMenuPreordersByPreoderID(id);
    if (res) {
      setrPeorderMenus(res);
    }
  };

  useEffect(() => {
    getPreordersMenusByPreoderID(Number(preorder?.ID));
  }, []);

  return (
    <>
      <div className="history-crad">
        <div className="rat-closdhistory">
          <span
            className="icon-close-addmenu"
            onClick={() => {
              onClosehistoryDatapopup();
            }}
          >
            <IoRestaurantOutline />
          </span>
        </div>
        <div className="data-preorder">
          <h3>สินค้าทั้งหมด</h3>
          <div className="data-menu">
            {preordermenus.map(
              (preordermenudata: PreorderMenusInterface, index: number) => (
                <>
                  <div className="menu-data" key={index}>
                    <img
                      src={preordermenudata.Menu?.MenuImage}
                      alt=""
                      className="imge-item"
                    />
                    <h5 className="name-item">
                      {preordermenudata.Menu?.MenuName}
                      <br />
                      <span>{preordermenudata.Menu?.MenuNameEng}</span>
                    </h5>
                    <h5 className="size-item">
                      {preordermenudata.MenuSize?.Name}
                    </h5>
                    <h5 className="size-item">
                      {preordermenudata.Sweetness?.Name}
                    </h5>
                    <h5 className="size-item">
                      {preordermenudata.DrinkOption?.Name}
                    </h5>
                    <h5 className="quantity">
                      จำนวน {preordermenudata.Quantity}
                    </h5>
                    <h5 className="total-amount">
                      {preordermenudata.TotalCost !== undefined
                        ? preordermenudata.TotalCost.toFixed(2)
                        : "N/A"}
                      .-
                    </h5>
                  </div>
                  <hr />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default HistoryPreorderData;
