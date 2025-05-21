import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4040/api/v1",
    withCredentials: true
})

export default axiosInstance;