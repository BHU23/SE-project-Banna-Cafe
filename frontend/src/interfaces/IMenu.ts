import { MenuTypesInterface } from "./IMenuType";

export interface MenusInterface {
  ID?: number;
  MenuID?: number;
  MenuName?: string;
  MenuNameEng?: string;
  MenuCost?: number;
  MenuImage?: string;
  MenuStatus?: number;
  
  MenuTypeID?: number;
  MenuType?: MenuTypesInterface;
}