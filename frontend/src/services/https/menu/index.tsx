import { MenusInterface } from "../../../interfaces/IMenu";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function GetMenus() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/menus`, requestOptions)
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

async function GetMenuTypes() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/menuTypes`, requestOptions) // ok?
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

async function DeleteMenuByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/menus/${id}`, requestOptions)
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

async function GetMenuById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/menu/${id}`, requestOptions)
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

async function CreateMenu(data: MenusInterface) {
  const requestOptions = {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/menus`, requestOptions)
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

async function UpdateMenu(data: MenusInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { 
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/menus`, requestOptions)
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

async function GetMenusBYType() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/menusByTypes`, requestOptions) // ok?
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

async function GetLatestMenuID() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/latestMenuID`, requestOptions)
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

async function GetActiveMenu() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/listActiveMenu`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data.length;
      } else {
        return false;
      }
    });

  return res;
}

async function GetNoActiveMenu() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/listNoActiveMenu`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data.length;
      } else {
        return false;
      }
    });

  return res;
}

async function GetRowMenu() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/countMenu`, requestOptions)
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

export {
  GetMenus,
  CreateMenu,
  GetMenuTypes,
  DeleteMenuByID,
  GetMenuById,
  UpdateMenu,
  GetMenusBYType,
  GetLatestMenuID,
  GetActiveMenu,
  GetNoActiveMenu,
  GetRowMenu
};
