import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://invoice-ass-server.vercel.app/",
    withCredentials: true,
});

export default axiosInstance;