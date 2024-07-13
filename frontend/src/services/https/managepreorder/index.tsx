import {
  PreOrderInterface,
  PreorderStatusApprovesInterface,
  PreorderStatusRecivesInterface,
} from "../../../interfaces/IManagepreorder";

//const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

/////////////GET////////////////////

export async function GetPreOrder() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/managepreorders`, requestOptions)
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

export async function GetPreOrderByID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers:{'Authorization': `Bearer ${jwt}`,"Content-Type": "application/json"},
  };

  let res = await fetch(
    `${apiUrl}/managepreorders/preorders/get/${id}`,
    requestOptions
  )
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

export async function GetManagePreOrders() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/managepreorders/list`, requestOptions)
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

export async function GetManagePreOrdersByID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
  };

  let res = await fetch(`${apiUrl}/managepreorders/get/${id}`, requestOptions)
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

export async function GetStatusReceivePreorderByPreorderID(
  id: Number | undefined
) {
  const requestOptions = {
    method: "GET",
    headers:{'Authorization': `Bearer ${jwt}`},
  };

  let res = await fetch(
    `${apiUrl}/managepreorders/status/get/${id}`,
    requestOptions
  )
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

export async function ListStatusReceive() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/managepreorders/statusrecive/list`, requestOptions)
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
export async function ListStatusApprove() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/managepreorders/statusapprove/list`, requestOptions)
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

export async function ListPreorderStatusRecives() {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/managepreorders/listPreorderStatusRecive`,
    requestOptions
  )
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
export async function GetPaymentByPreorderID(id: number) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/managepreorders/paymentbypreorder/get/${id}`,
    requestOptions
  )
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

//////////////GET////////////

/////////////PATCH///////////

export async function UpdatePreOrder(data: PreOrderInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { 'Authorization': `Bearer ${jwt}`,"Content-Type": "application/json", },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/managepreorders/preorders`, requestOptions)
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

export async function UpdatePreorderStatusRecives(
  data: PreorderStatusRecivesInterface
) {
  const requestOptions = {
    method: "PATCH",
    headers: { 'Authorization': `Bearer ${jwt}`,"Content-Type": "application/json", },
    body: JSON.stringify(data),
  };

  let res = await fetch(
    `${apiUrl}/managepreorders/update_status_recive`,
    requestOptions
  )
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

export async function UpdatePreorderStatusApprove(
  data: PreorderStatusApprovesInterface
) {
  const requestOptions = {
    method: "PATCH",
    headers: { 'Authorization': `Bearer ${jwt}`,"Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(
    `${apiUrl}/managepreorders/update_status_approve`,
    requestOptions
  )
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

/////////////PATCH////////////