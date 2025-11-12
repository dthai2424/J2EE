import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor (Bộ đánh chặn) Request
 * Tự động thêm 'Authorization: Bearer <token>' vào header
 * cho MỌI request GỬI ĐI.
 */
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ sessionStorage (nơi AuthContext đã lưu)
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      // Nếu có token, thêm vào header Authorization
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; // Trả về config đã cập nhật
  },
  (error) => {
    // Xử lý lỗi nếu config request thất bại
    return Promise.reject(error);
  }
);

/**
 * Interceptor (Bộ đánh chặn) Response
 * Xử lý các lỗi chung (ví dụ: 401 Unauthorized - Token hết hạn)
 */
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về response nếu thành công (status 2xx)
    return response;
  },
  (error) => {
    // Xử lý lỗi 401 (Token không hợp lệ hoặc hết hạn)
    if (error.response && error.response.status === 401) {
      // Xóa token/user cũ
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");

      // Chuyển hướng người dùng về trang đăng nhập
      // (Tránh reload vòng lặp nếu đang ở trang /auth)
      if (window.location.pathname !== "/auth") {
        window.location.href = "/auth";
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      }
    }

    // Trả về lỗi để các component (như AuthPage) có thể bắt (catch)
    return Promise.reject(error);
  }
);

export default axiosClient;
