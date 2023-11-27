import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_DOMAIN}/api/`;
const TOKEN = localStorage.getItem("token");

// //const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;


// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// });

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});