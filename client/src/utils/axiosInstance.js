import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://invoice-ass-server.vercel.app/",
    //baseURL: "https://invoice-ass-server.onrender.com/api/v1",
   // baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    withCredentials: true,
});

export default axiosInstance;