import { PreorderMenusInterface } from "../../../interfaces/IPreorderMenu";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function CreatePreorderMenu(data: PreorderMenusInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderMenus`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function UpdatePreorderMenu(data: PreorderMenusInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderMenus`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function DeletePreorderMenuByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/preorderMenu/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res && res.data) {
         return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function GetPreorderMenus() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/preorderMenus`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetPreorderMenuById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/preorderMenu/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res && res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetMenuSize() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/menuSizes`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetDrinkOptions() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/drinkOptions`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetSweetnesses() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/sweetnesses`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
// use by Preoder
async function GetMenuPreordersByPreoderID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/preorderMenus/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res && res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
export {
  CreatePreorderMenu,
  UpdatePreorderMenu,
  DeletePreorderMenuByID,
  GetPreorderMenus,
  GetPreorderMenuById,
  GetSweetnesses,
  GetDrinkOptions,
  GetMenuSize,
  GetMenuPreordersByPreoderID,
};
