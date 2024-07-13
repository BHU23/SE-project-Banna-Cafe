// Update By Nop 11/1/2567
import { PromotionInterface } from "../../../interfaces/IPromotion";
const apiUrl = "https://api.banna-cafe.store";
// const apiUrl = "http://localhost:8080";
const jwt = localStorage.getItem("token");
async function GetPromotion() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/promotions`, requestOptions)
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
async function GetReadyPromotion() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/promotions/ready`, requestOptions)
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

async function GetLastPromotion() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/lastpromotions`, requestOptions)
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

async function GetEmployee() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/employees`, requestOptions) // ok?
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

async function DeletePromotionByID(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/promotions/${id}`, requestOptions)
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

async function GetPromotionById(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/promotion/${id}`, requestOptions)
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

async function CreatePromotion(data: PromotionInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/promotions`, requestOptions)
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

async function UpdatePromotion(data: PromotionInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/promotions`, requestOptions)
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

export {
    GetPromotion,
    GetReadyPromotion,
    CreatePromotion,
    GetEmployee,
    DeletePromotionByID,
    GetPromotionById,
    UpdatePromotion,
    GetLastPromotion
};
