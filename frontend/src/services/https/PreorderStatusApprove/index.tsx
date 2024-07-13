import { PreorderStatusApprovesInterface } from "../../../interfaces/IPreorderStatusApprove";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function CreatePreorderStatusApprove(
  data: PreorderStatusApprovesInterface
) {
  const requestOptions = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderStatusApproves`, requestOptions)
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

async function UpdatePreorderStatusApprove(
  data: PreorderStatusApprovesInterface
) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderStatusApproves`, requestOptions)
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

async function DeletePreorderStatusApproveByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/preorderStatusApprove/${id}`,
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

async function GetPreorderStatusApproveByMemberID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/preorderStatusApprove/member/${id}`,
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
// async function GetPreorderStatusApproves() {
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   let res = await fetch(`${apiUrl}/statusApprovesPreorder`, requestOptions)
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
  CreatePreorderStatusApprove,
  UpdatePreorderStatusApprove,
  DeletePreorderStatusApproveByID,
  GetPreorderStatusApproveByMemberID,
  // GetPreorderStatusApproves,
};
