import axios from "axios";

export const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject((error.response && error.response.data) || "Ocurrio un error desconocido")
);