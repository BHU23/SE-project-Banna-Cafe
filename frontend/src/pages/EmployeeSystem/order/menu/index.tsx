import { useState, useEffect } from "react";
import "./menu.css";
import { FaStar } from "react-icons/fa";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { GetMenusBYMenuTypeID } from "../../../../services/https/order";
import { MenuTypesInterface } from "../../../../interfaces/IMenuType";
import { GetRatings } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
interface MenuAllProps {
  onAddmenupop: () => void;
  menusSearch: MenusInterface[];
  selectedMenuType: MenuTypesInterface | null;
  searchText: string;
  onAddMenu: (menu: MenusInterface[]) => void;
  onchangeMenus: (menus: MenusInterface[]) => void;
}
function MenuAll({
  onAddmenupop,
  menusSearch,
  selectedMenuType,
  searchText,
  onAddMenu,
  onchangeMenus,
}: MenuAllProps) {
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [selectedMenutypeold, setSelectedMenutypeold] =
    useState<MenusInterface | null>();
  const [ratings, setRatings] = useState<RatingsInterface[]>([]);

  const getMenusMenuType = async () => {
    let res = await GetMenusBYMenuTypeID(Number(selectedMenuType?.ID));
    if (res) {
      setMenus(res);
      onchangeMenus(res);
    }
  };
  const getMenusRating = async () => {
    let res = await GetRatings();
    if (res) {
      setRatings(res);
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
    return sumRating / menuRatings.length;
  };

  useEffect(() => {
    getMenusRating();
    if (selectedMenuType !== selectedMenutypeold) {
      getMenusMenuType();
      setSelectedMenutypeold(selectedMenuType);
    }

    if (menusSearch.length !== 0 || searchText !== "") {
      setMenus(menusSearch);
    } else {
      getMenusMenuType();
    }
  }, [menusSearch, selectedMenuType]);
  return (
    <div className="menu-all">
      {menus.map((menu, index) => (
        <div className="menu-crad" key={menu.ID}>
          <div className="menu-crad menu-rating">
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
