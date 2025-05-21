import axiosInstance from "../../api/axiosInstance"

export const getTrendingContent = async(type)=>{
    const response = await axiosInstance.get(`/${type}/trending`);
    return response.data.content;
}