import { PreordersInterface } from "../../../interfaces/IPreorder";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function CreatePreorder(data: PreordersInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorders`, requestOptions)
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

async function UpdatePreorder(data: PreordersInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorders`, requestOptions)
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

async function GetNewPreorderByMemberID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/newPreorderMember/${id}`, requestOptions)
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
async function GetPreorderStatusPaymentByMemberID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/preorderMember/${id}`, requestOptions)
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
async function GetMenusBYMenuTypeID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
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

async function GetMenusByName(name: string | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
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

async function GetPayMemtsByMemberID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
     'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/paymetMember/${id}`, requestOptions)
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

async function DeletePreorderByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/preorder/${id}`, requestOptions)
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
export {
  CreatePreorder,
  GetNewPreorderByMemberID,
  UpdatePreorder,
  GetMenusBYMenuTypeID,
  GetPreorderStatusPaymentByMemberID,
  GetMenusByName,
  GetPayMemtsByMemberID,
  DeletePreorderByID,
};
