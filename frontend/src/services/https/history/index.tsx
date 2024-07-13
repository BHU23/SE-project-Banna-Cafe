import { HistoryInterface } from "../../../interfaces/IHistory";

const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function GetHistory() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/histories`, requestOptions)
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

async function GetIngredient() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredients`, requestOptions) // ok?
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

async function DeleteHistoryByID(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/histories/${id}`, requestOptions)
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

async function GetHistoryById(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/history/${id}`, requestOptions)
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

async function CreateHistory(data: HistoryInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/histories`, requestOptions)
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

async function UpdateHistory(data: HistoryInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/histories`, requestOptions)
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
    GetHistory,
    GetIngredient,
    DeleteHistoryByID,
    GetHistoryById,
    CreateHistory,
    UpdateHistory
};
