import { ResourceInterface } from "../../../interfaces/IResource";

const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function GetResource() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/resources`, requestOptions)
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

async function GetLastResource() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/lastresources`, requestOptions)
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

async function DeleteResourceByID(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/resources/${id}`, requestOptions)
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

async function GetResourceById(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/resource/${id}`, requestOptions)
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


async function CreateResource(data: ResourceInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/resources`, requestOptions)
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

async function UpdateResource(data: ResourceInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/resources`, requestOptions)
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
    GetResource,
    CreateResource,
    GetLastResource,
    DeleteResourceByID,
    GetResourceById,
    UpdateResource
}
