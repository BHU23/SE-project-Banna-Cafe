import { EmployeesInterface } from "../../../interfaces/IEmployee";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function GetEmployees() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employees`, requestOptions)
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

async function GetRoles() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/roles`, requestOptions)
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

async function GetGenders() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genders`, requestOptions)
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

async function DeleteEmployeeByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employees/${id}`, requestOptions)
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

async function GetEmployeeById(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employee/${id}`, requestOptions)
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


async function CreateEmployee(data: EmployeesInterface) {
  const requestOptions = {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/employees`, requestOptions)
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

async function UpdateEmployee(data: EmployeesInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { 
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/employees`, requestOptions)
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

async function GetRowEmployee() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/countEmployee`, requestOptions)
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

async function GetGenderMale() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genderMale`, requestOptions)
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

async function GetGenderFemale() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genderFemale`, requestOptions)
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

async function GetGenderOther() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genderOther`, requestOptions)
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

export {
  GetEmployees,
  CreateEmployee,
  GetRoles,
  GetGenders,
  DeleteEmployeeByID,
  GetEmployeeById,
  UpdateEmployee,
  GetRowEmployee,
  GetGenderMale,
  GetGenderFemale,
  GetGenderOther
};
