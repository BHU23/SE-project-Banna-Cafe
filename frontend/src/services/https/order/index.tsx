import { OrderInterface } from "../../../interfaces/IOrder";

const apiUrl = "http://localhost:8080";


async function CreateOrder(data: OrderInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/order`, requestOptions)
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

async function UpdateOrder(data: OrderInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/order`, requestOptions)
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

async function GetNewOrderByMemberID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  let res = await fetch(`${apiUrl}/newOrderMember/${id}`, requestOptions)
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
async function GetStatusOrderByMemberID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  let res = await fetch(`${apiUrl}/OrderMember/${id}`, requestOptions)
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
// use by Order
async function GetMenusBYMenuTypeID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  let res = await fetch(`${apiUrl}/menusByMenuType/${id}`, requestOptions)
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
// use by Order
async function GetMenuOrdersByOrderID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  let res = await fetch(`${apiUrl}/orderMenus/${id}`, requestOptions)
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
async function GetMenusByName(name: string | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/menus/${name}`, requestOptions)
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
  CreateOrder,
  GetNewOrderByMemberID,
  UpdateOrder,
  GetMenusBYMenuTypeID,
  GetStatusOrderByMemberID,
  GetMenusByName,
  GetMenuOrdersByOrderID,
};
