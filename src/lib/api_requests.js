import axios from "axios";

export async function login(email, password) {
    // await axios.get("/sanctum/csrf-cookie");
    const response = await axios.post("/api/login", {
        email,
        password,
    });

    const data = response.data;
    const access_token = data.access_token ? data.access_token : null;

    if (data.access_token) {
        localStorage.setItem('AUTH_TOKEN', data.access_token);
    }

    console.log(`LOGIN RESPONSE === ${JSON.stringify(data)}`);
    console.log(`TOKEN ====== ${access_token}`);
    

    return data;
}

export async function updateUser() {
    await axios.get("/sanctum/csrf-cookie");
    const response = await axios.post("/api/user/update");

    const data = response.data;

    console.log(`USER UPDATE RESPONSE === ${JSON.stringify(data)}`);

    return data;
}
