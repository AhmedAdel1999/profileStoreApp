import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://myprofilesappapi.herokuapp.com/"
})
export default axiosInstance