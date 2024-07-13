import { PreorderStatusRecivesInterface } from "../../../interfaces/IPreorderStatusRecive";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");
async function CreatePreorderStatusRecive(
  data: PreorderStatusRecivesInterface
) {
  const requestOptions = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderStatusRecives`, requestOptions)
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

async function UpdatePreorderStatusRecive(data: PreorderStatusRecivesInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderStatusRecives`, requestOptions)
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

async function DeletePreorderStatusReciveByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/preorderStatusRecive/${id}`, requestOptions)
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

async function GetPreorderStatusReceiveByMemberID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/preorderStatusReceive/member/${id}`,
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

// async function GetPreorderStatusReceives() {
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   let res = await fetch(`${apiUrl}/statusReceivesPreorder`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

export {
  CreatePreorderStatusRecive,
  UpdatePreorderStatusRecive,
  DeletePreorderStatusReciveByID,
  GetPreorderStatusReceiveByMemberID,
  // GetPreorderStatusReceives,
};
