import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://invoice-ass-server.onrender.com",
    withCredentials: true,
});

export default axiosInstance;