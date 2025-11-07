import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // 3. Cấu hình header mặc định
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
