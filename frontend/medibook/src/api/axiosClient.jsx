import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");

      if (window.location.pathname !== "/auth") {
        window.location.href = "/auth";
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
