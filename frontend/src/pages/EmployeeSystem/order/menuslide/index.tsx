import React, { useEffect, useState } from "react";
import { MenusInterface } from "../../../../interfaces/IMenu";

import "../menuOrder.css";
interface MenuSlides {
  onAddmenupop: () => void;
  menus: MenusInterface[];
  onAddMenu: (menu: MenusInterface) => void;
  setMenushow: (menu: MenusInterface) => void;
}
function MenuSlide({
  onAddmenupop,
  menus,
  onAddMenu,
  setMenushow,
}: MenuSlides) {
  // const [indexStart, setIndexStart] = useState(0);
  // let indexEnd = indexStart + 3;
  // const menushow = menus.slice(indexStart, indexEnd);
  // if (indexEnd >= menus.length) {
  //   indexEnd = menus.length + 1;
  // }
  // if (indexStart < 0) {
  //   setIndexStart(0);
  // }
  const menusReady = menus.filter((menu) => menu.MenuStatus === 2);
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [index3, setIndex3] = useState(2);
  let menushow: MenusInterface[] = [];
  if (menus.length >= 3){
    menushow[0] = menusReady[index1];
    menushow[1] = menusReady[index2];
    menushow[2] = menusReady[index3];
    setMenushow(menushow[1]);
  }
  
  return (
    <>
      <div className="imge-slide">
        <button
          className="bnt-laft"
          onClick={() => {
            setIndex1(index1 - 1);
            setIndex2(index2 - 1);
            setIndex3(index3 - 1);
            
            if (index3 == 0) {
              setIndex3(menusReady.length - 1);
            }
            if (index2 == 0) {
              setIndex2(menusReady.length - 1);
            }
            if (index1 == 0) {
              setIndex1(menusReady.length - 1);
            }
            setMenushow(menushow[1]);
          }}
        ></button>
         <div className="block-item">
          {menushow.length > 0 && menushow.map((menu, index) => (
            <div key={index} className={`menu-imge i${index}`}>
              <img src={menu?.MenuImage} alt={`Menu Image ${index}`} />
            </div>
          ))}
        </div>
        <button
          className="bnt-right"
          onClick={() => {
            setIndex1(index1 + 1);
            setIndex2(index2 + 1);
            setIndex3(index3 + 1);
            if (index3 >= menusReady.length - 1) {
              setIndex3(0);
            }
            if (index2 >= menusReady.length - 1) {
              setIndex2(0);
            }
            if (index1 >= menusReady.length - 1) {
              setIndex1(0);
            }
            setMenushow(menushow[1]);
          }}
        ></button>
      </div>
      <div className="menu-name">
        {menushow.length > 0 && (
          <>
            <p>{menushow[1].MenuCost} bath.</p>
            <span>
              {menushow[1].MenuName}
              <span> </span>
              {menushow[1].MenuNameEng}
            </span>
            <button
              onClick={() => {
                onAddmenupop();
                onAddMenu(menushow[1]);
              }}
            >
              <span>+</span>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default MenuSlide;
