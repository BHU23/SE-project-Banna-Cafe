import { useState, useEffect } from "react";
import "./menu.css";
import { FaStar } from "react-icons/fa";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { GetMenusBYMenuTypeID } from "../../../../services/https/preorder";
import { MenuTypesInterface } from "../../../../interfaces/IMenuType";
import { GetRatings } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
interface MenuAllProps {
  onAddmenupop: () => void;
  setReviewPopup: () => void;
  menusSearch: MenusInterface[];
  selectedMenuType: MenuTypesInterface | null;
  searchText: string;
  ratings:RatingsInterface[];
  onAddMenu: (menu: MenusInterface[]) => void;
  onchangeMenus: (menus: MenusInterface[]) => void;
}
function MenuAll({
  onAddmenupop,
  menusSearch,
  selectedMenuType,
  searchText,
  onAddMenu,
  ratings,
  onchangeMenus,
  setReviewPopup,
}: MenuAllProps) {
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [selectedMenutypeold, setSelectedMenutypeold] =
    useState<MenusInterface | null>();
  const getMenusMenuType = async () => {
    let res = await GetMenusBYMenuTypeID(Number(selectedMenuType?.ID));
    if (res) {
      setMenus(res);
      onchangeMenus(res);
    }
  };
  const getMenusRatingByMenuId = (id: number | undefined): number | string => {
    if (id === undefined) {
      return 0;
    }
    const menuRatings = ratings.filter((r) => r.MenuID === id);
    if (menuRatings.length === 0) {
      return "+";
    }
    let sumRating = 0;
    for (let i = 0; i < menuRatings.length; i++) {
      sumRating += menuRatings[i].Score || 0;
    }
    let avg = (sumRating / menuRatings.length).toFixed(0);
    return Number(avg);
  };

  useEffect(() => {
    if (selectedMenuType !== selectedMenutypeold) {
      getMenusMenuType();
      setSelectedMenutypeold(selectedMenuType);
    }
    if (searchText.length == 0) {
      getMenusMenuType();
    } else if (searchText !== "") {
      setMenus(menusSearch);
    }
  }, [menusSearch, selectedMenuType, searchText]);
  const menusReady = menus.filter((menu) => menu.MenuStatus === 1);
return (
  <div className="menu-all">
    {menusReady.map((menu, index) => (
      <div className="menu-crad" key={menu.ID}>
        <div
          className="menu-crad menu-rating"
          onClick={() => {
            setReviewPopup();
            onAddMenu([menu]);
          }}
        >
          <FaStar />
          <span>{getMenusRatingByMenuId(menu.ID)}</span>
        </div>
        <div className="menu-item">
          <div className="menu-imge">
            <img src={menu.MenuImage} alt="Menu Image" />
          </div>
          <div className="manu-name">
            {menu.MenuName} <br />
            <span>{menu.MenuNameEng}</span>
          </div>
          <div className="cost-btn">
            <div className="menu-cost">
              {menu.MenuCost?.toFixed(2) ?? "N/A"}-.
            </div>
            <button
              className="btn-add"
              onClick={() => {
                onAddMenu([menu]);
                onAddmenupop();
              }}
            >
              +เพิ่ม
            </button>
          </div>
        </div>
      </div>
    ))}
    
  </div>
);
}
export default MenuAll;
