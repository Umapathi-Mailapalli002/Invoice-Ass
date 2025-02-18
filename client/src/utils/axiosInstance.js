import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://invoice-ass-server.onrender.com/api/v1/",
    withCredentials: true,
});

export default axiosInstance;