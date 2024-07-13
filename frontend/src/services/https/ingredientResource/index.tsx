import { IngredientResourceInterface } from "../../../interfaces/IIngredientResource";

const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function GetIngredientResource() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredientresources`, requestOptions)
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

async function GetResource() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/resources`, requestOptions) // ok?
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

async function DeleteIngredientResourceByID(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredientresources/${id}`, requestOptions)
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

async function GetIngredientResourceById(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredientresource/${id}`, requestOptions)
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


async function CreateIngredientResource(data: IngredientResourceInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/ingredientresources`, requestOptions)
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

async function UpdateIngredientResource(data: IngredientResourceInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/ingredientresources`, requestOptions)
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
    GetIngredientResource,
    GetIngredient,
    GetResource,
    DeleteIngredientResourceByID,
    GetIngredientResourceById,
    CreateIngredientResource,
    UpdateIngredientResource
};
