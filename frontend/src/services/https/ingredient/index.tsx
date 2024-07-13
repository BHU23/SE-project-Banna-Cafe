// Update By Nop 2/12/2566
import { IngredientsInterface } from "../../../interfaces/IIngredient";
import { IngredientUnitsInterface } from "../../../interfaces/IIngredientUnit";

const apiUrl = "https://api.banna-cafe.store";
const jwt = localStorage.getItem("token");

async function GetIngredient() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredients`, requestOptions)
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

async function GetLastIngredient() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/lastingredients`, requestOptions)
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

async function GetIngredientTypes() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredientTypes`, requestOptions) // ok?
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

async function GetIngredientUnits() {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredientUnits`, requestOptions) // ok?
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

async function DeleteIngredientByID(id: Number | undefined) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredients/${id}`, requestOptions)
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

async function GetIngredientById(id: Number | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ingredient/${id}`, requestOptions)
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

async function CreateIngredient(data: IngredientsInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/ingredients`, requestOptions)
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

async function UpdateIngredient(data: IngredientsInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/ingredients`, requestOptions)
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
    GetIngredient,
    CreateIngredient,
    GetIngredientTypes,
    DeleteIngredientByID,
    GetIngredientById,
    UpdateIngredient,
    GetLastIngredient,
    GetIngredientUnits
};
