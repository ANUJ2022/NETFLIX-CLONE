import axiosInstance from "../../api/axiosInstance.js"

export const signUpUser = async (userData) => {
    const response = await axiosInstance.post("/auth/signUp", userData);
    return response.data.user;
}

export const checkAuthUser = async () => {
    const response = await axiosInstance.get("/auth/checkAuth");
    return response.data.user;
}

export const logoutAPI = async () => {
    return await axiosInstance.post("/auth/logout");
};

export const loginAPI = async (userData) => {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data.user;
}