export function Card({ imageUrl, children }) {
  return (
    <div className="flex w-60 h-60 flex-col items-center rounded-2xl bg-white p-7 shadow-xl">
      {/* 1. LINK ẢNH: Sử dụng thẻ <img> và truyền `imageUrl` vào `src` */}
      <img
        src={imageUrl}
        alt="" // Để alt rỗng nếu ảnh chỉ mang tính trang trí
        className="h-20 w-20 object-contain mb-4"
      />

      {/* 2. TEXT: Sử dụng `children` để hiển thị nội dung được truyền vào */}
      <h3 className="text-center text-xl font-semibold text-slate-700">
        {children}
      </h3>
    </div>
  );
}
