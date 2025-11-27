import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Tạo Context
const AuthContext = createContext(null);

/**
 * AuthProvider: Component bao bọc ứng dụng để quản lý trạng thái đăng nhập
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // Thêm state loading để tránh hiển thị giao diện sai khi đang tải từ storage
  const [isLoading, setIsLoading] = useState(true);

  // 2. useEffect: Tải thông tin từ sessionStorage khi reload trang
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const storedToken = sessionStorage.getItem("accessToken");
        const storedUser = sessionStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Lỗi khi tải trạng thái đăng nhập:", error);
        // Nếu lỗi (ví dụ JSON sai), xóa luôn cho sạch
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  /**
   * 3. Hàm Login: Gọi từ AuthPage khi API trả về thành công
   * @param {string} accessToken - Token JWT
   * @param {object} userData - Thông tin user (UserDTO)
   */
  const login = (accessToken, userData) => {
    setToken(accessToken);
    setUser(userData);
    console.log(userData);
    // Lưu vào Session Storage để giữ đăng nhập khi refresh trang
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * 4. Hàm Logout: Gọi từ Navbar
   */
  const logout = () => {
    setToken(null);
    setUser(null);

    // Xóa khỏi storage
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
  };

  // Giá trị cung cấp cho toàn bộ ứng dụng
  const value = {
    user, // Navbar dùng cái này để check (user ? ... : ...) và hiển thị tên (user.name)
    token, // AxiosClient dùng cái này (hoặc lấy trực tiếp từ storage)
    login, // AuthPage dùng cái này
    logout, // Navbar dùng cái này
    isLoading, // Có thể dùng để hiện spinner khi mới vào trang
  };

  // Chỉ render ứng dụng khi đã tải xong state từ storage
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

/**
 * 5. Hook useAuth: Để các component con gọi dễ dàng
 * Ví dụ: const { user, logout } = useAuth();
 */
// Trong AuthContext.jsx
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Nếu context là null (nghĩa là gọi useAuth bên ngoài AuthProvider) -> báo lỗi hoặc trả về object rỗng
  if (!context) {
    // Cách debug: In ra console để biết lỗi
    console.error("Lỗi: useAuth() được gọi bên ngoài AuthProvider!");
    return {}; // Trả về rỗng để không crash app ngay lập tức (tạm thời)
  }
  return context;
};
