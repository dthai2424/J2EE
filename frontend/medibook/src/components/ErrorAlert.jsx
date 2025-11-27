import React, { useEffect, useState } from "react";

/**
 * Component hiển thị thanh thông báo (lỗi/thành công) ngang cố định ở trên cùng,
 * tự động tắt sau 5 giây.
 * @param {string | null} message - Nội dung thông báo. Nếu null/rỗng, thanh sẽ ẩn.
 * @param {function} onClose - Hàm được gọi khi alert bị đóng (tự động hoặc thủ công).
 * @param {string} type - 'error' (mặc định: đỏ) hoặc 'success' (xanh lá).
 */
export function ErrorAlert({ message, onClose, type = "error" }) {
  // State để điều khiển animation hiển thị/ẩn
  const [isVisible, setIsVisible] = useState(false);
  let t = 3000;
  // Effect 1: Kích hoạt hiển thị khi có message mới
  useEffect(() => {
    if (message) {
      // Bắt đầu hiển thị (trạng thái trượt xuống)
      setIsVisible(true);
      if (type != "error") t = 500;
      // Effect 2: Thiết lập timer tự động tắt sau 5 giây
      const timer = setTimeout(() => {
        // Bắt đầu ẩn (trạng thái trượt lên)
        setIsVisible(false);

        // Chờ animation trượt lên (0.5s) hoàn tất rồi gọi onClose để dọn dẹp state ở AuthPage
        const cleanupTimer = setTimeout(onClose, 500);
        return () => clearTimeout(cleanupTimer);
      }, t); // Tự động đóng sau 5 giây (5000ms)

      return () => {
        clearTimeout(timer);
        // Nếu user đóng thủ công, timer 5s sẽ bị xóa
      };
    } else {
      // Khi message là null, đảm bảo isVisible là false
      setIsVisible(false);
    }
  }, [message, onClose]);

  // Nếu không có message và đã ẩn (animation kết thúc), return null
  if (!message && !isVisible) {
    return null;
  }

  const baseClasses = `fixed top-0 left-0 w-full p-4 shadow-xl flex justify-between items-center 
                       transform transition-transform duration-500 ease-in-out z-[1000]`;

  const colorClasses =
    type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white";

  // Lớp CSS điều khiển animation trượt lên/xuống
  const translateClasses = isVisible ? "translate-y-0" : "-translate-y-full";

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${translateClasses}`}
      role="alert"
    >
      <p className="font-medium text-lg flex items-center gap-2">
        {type === "error" ? "🚨 Lỗi: " : "✅ Thành công: "}
        {message}
      </p>

      {/* Nút đóng (X): Kích hoạt animation ẩn ngay lập tức */}
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 500);
        }}
        className="text-white hover:opacity-75 transition-colors p-1 rounded-full"
        aria-label="Close alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
