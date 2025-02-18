import axios from "axios";
const axiosInstance = axios.create({
    //baseURL: "https://invoice-ass-server.vercel.app/",
    baseURL: "https://invoice-ass-server.onrender.com/",
    //baseURL: import.meta.env.VITE_APP_API_BASE_URL,
   // baseURL: "https://86d0-2402-8100-21ff-c00-3da3-465d-608e-1c92.ngrok-free.app/",
    withCredentials: true,
});

export default axiosInstance;