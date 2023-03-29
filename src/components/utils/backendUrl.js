import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://profilestoreapi.onrender.com/"
})
export default axiosInstance