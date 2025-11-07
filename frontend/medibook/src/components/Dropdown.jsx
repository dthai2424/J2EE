import React from "react";

export function Dropdown({ items }) {
  // let chunkSize = 5;
  // let arr = [];
  // for (let i = 0; i < items.length; i += chunkSize) {
  //   arr.push(items.slize(i, i + chunkSize));
  // }
  return (
    <div className=" bg-[#F4F4F4] rounded-xl absolute top-14 left-0 z-10 shadow-lg w-max text-left">
      <div className="w-fit grid grid-cols-2 gap-8 p-5 place-content-center ">
        {/* <div className="flex flex-col">
          <p className="hover:text-[#00B5F1]">Khoa Tim mạch</p>
          <p className="hover:text-[#00B5F1]">Khoa Thần kinh</p>
          <p className="hover:text-[#00B5F1]">Khoa Hô hấp</p>
          <p className="hover:text-[#00B5F1]">Khoa Tiêu hóa</p>
          <p className="hover:text-[#00B5F1]">Khoa Nội tiết</p>
        </div>
        <div className="flex flex-col">
          <p className="hover:text-[#00B5F1]">Khoa Nhi</p>
          <p className="hover:text-[#00B5F1]">Khoa Sản phụ khoa</p>
          <p className="hover:text-[#00B5F1]">Khoa Cơ xương khớp</p>
          <p className="hover:text-[#00B5F1]">Khoa Da liễu</p>
          <p className="hover:text-[#00B5F1]">Khoa Mắt</p>
        </div> */}
      </div>
    </div>
  );
}
