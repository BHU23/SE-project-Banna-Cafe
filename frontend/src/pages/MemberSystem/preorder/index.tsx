import { useState, useEffect } from "react";
import { PiBasketFill } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import SidebarMemu from "../../../components/sidebarMember";
import PromotionSlide from "./promotion";
import MenuAll from "./menu";
import AddMenuPreorder from "./addMenuPreorder";
import EditPreorder from "./editPreorder";
import MenuSlide from "./menuslide";
import Footer from "../../../components/footer";
import { GetMenusByName } from "../../../services/https/preorder";
import { MenusInterface } from "../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../interfaces/IMenuType";
import "./menuPreorder.css";
import { RatingsInterface } from "../../../interfaces/IRating";
import { GetRatings } from "../../../services/https/rating";
import { MembersInterface } from "../../../interfaces/IMember";
import { GetMemberById } from "../../../services/https/member";
import ReviewMenu from "./reviewMenu";

export default function MenuPreorder() {
  const [addMenupop, setAddmenupop] = useState(false);
  const [basketMenupop, setBasketMenupop] = useState(false);
  const [selectedMenuType, setSelectedMenuType] =
    useState<MenuTypesInterface | null>(null);

  const handleSelectMenuType = (menuType: MenuTypesInterface) => {
    setSelectedMenuType(menuType);
  };
  const [searchText, setSearchText] = useState(String);
  const [menusSearch, setMenusSearch] = useState<MenusInterface[]>([]);
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [menuslide, setMenuSlide] = useState<MenusInterface>();
  const [menu, setMenu] = useState<MenusInterface>();
  const [ratings, setRatings] = useState<RatingsInterface[]>([]);
  const [reviewPopup, setReviewPopup] = useState(false);

  const getMenusRating = async () => {
    let res = await GetRatings();
    if (res) {
      setRatings(res);
    }
  };
  const getMenusRatingByMenuId = (id: number | undefined): number => {
    if (id === undefined) {
      return 0;
    }
    const menuRatings = ratings.filter((r) => r.MenuID === id);
    if (menuRatings.length === 0) {
      return 0;
    }
    let sumRating = 0;
    for (let i = 0; i < menuRatings.length; i++) {
      sumRating += menuRatings[i].Score || 0;
    }
    return sumRating / menuRatings.length;
  };

  const getMenusByMenuName = async (e: string) => {
    if (
      !(
        e.includes("/") ||
        e.includes("\\") ||
        e.includes("#") ||
        e.includes(".") ||
        e.includes("?") ||
        e.includes("%") ||
        !e.trim()
      )
    ) {
      let res = await GetMenusByName(e);
      if (res) {
        setMenusSearch(res);
      }
    } else {
      setSearchText(searchText.length != 1 ? searchText : "");
    }
    if (e == "") {
      setSearchText("");
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    e.preventDefault();
    getMenusByMenuName(e.target.value);
  };
  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getMenusByMenuName(searchText);
  };
  const [member, setMember] = useState<MembersInterface | null>(null);
  const getMemberByID = async (id: Number) => {
    let res = await GetMemberById(id);
    if (res) {
      setMember(res);
    }
  };
  useEffect(() => {
    getMemberByID(Number(localStorage.getItem("id")));
  }, []);
  useEffect(() => {
    getMenusRating();
  }, [reviewPopup]);
  return (
    <div className="menuPreorder">
      <div className="sidebarMemu">
        <SidebarMemu onSelectMenuType={handleSelectMenuType} member={member} />
      </div>
      <div className="contentMenu">
        <header>
          <form className="search-menu">
            <label htmlFor="">
              <IoSearch className="icon-search" />
              <input
                className="search-input"
                placeholder="search for menu"
                value={searchText}
                onChange={handleInputChange}
              />
              <button onClick={handleSearchButtonClick}>search</button>
            </label>
          </form>
          <div
            className="basket-preorder"
            onClick={() => setBasketMenupop(true)}
          >
            <PiBasketFill className="basket-icon" />
          </div>
        </header>
        <main>
          <div className="menu-recomment">
            <div className="menu-slide">
              <MenuSlide
                onAddmenupop={() => setAddmenupop(true)}
                onAddMenu={(menu) => setMenu(menu)}
                menus={menus}
                setMenushow={(menu) => setMenuSlide(menu)}
              />
            </div>
            <div className="munu-slide-information">
              <div className="information-text">Information</div>
              <div className="information-img">
                {menuslide?.MenuImage && (
                  <img src={menuslide?.MenuImage} alt={`Menu`} />
                )}
              </div>
              <div className="name-information">
                {menuslide?.MenuNameEng} <span>{menuslide?.MenuName}</span>
              </div>
              <div className="cost-information">
                ราคา <span>{menuslide?.MenuCost} bath.</span>
              </div>
              <div className="rating-information">
                {Array.from(
                  { length: getMenusRatingByMenuId(menuslide?.ID) },
                  (_, index) => (
                    <FaStar key={index} />
                  )
                )}
              </div>
            </div>
            <div className="munu-promotion">
              <div className="information-text">Promotion & Recommend</div>
              <div className="imges-promotion">
                <PromotionSlide></PromotionSlide>
              </div>
            </div>
          </div>
          <div className="menu-block">
            <div className="menu-text">Menu</div>
            <MenuAll
              onAddmenupop={() => setAddmenupop(true)}
              menusSearch={menusSearch}
              searchText={searchText}
              ratings={ratings}
              selectedMenuType={selectedMenuType}
              onAddMenu={(menu) => setMenu(menu[0])}
              onchangeMenus={(munus) => setMenus(munus)}
              setReviewPopup={() => setReviewPopup(true)}
            />
            <br />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>

      {addMenupop && (
        <div className="add-menu">
          <AddMenuPreorder
            onCloseAddmenupop={() => {
              setAddmenupop(false);
            }}
            addMenu={menu}
            setReviewPopup={() => setReviewPopup(true)}
          />
        </div>
      )}
      {basketMenupop && (
        <div className="edit-basketes">
          <EditPreorder
            onClosebasketMenupop={() => {
              setBasketMenupop(false);
            }}
          />
        </div>
      )}
      {reviewPopup && (
        <div className="review-menu">
          <ReviewMenu
            onCloseReviewMenupop={() => {
              setReviewPopup(false);
            }}
            reviewMenu={menu}
            member={member}
            ratings={ratings}
          />
        </div>
      )}
    </div>
  );
}
