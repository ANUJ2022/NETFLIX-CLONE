import axios from "axios";
import { ENV_VAR } from "../Config/envVars.js";

export const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ENV_VAR.TMDB_API_KEY
        }
    };
    const response = await axios.get(url, options);
    
    if (response.status != 200) {
        throw new Error("Failed to fetch data from TMDB," + response.statusText);
    }
    return response.data;
}



