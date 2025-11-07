import React from "react";
// import { Blockquote } from "flowbite-react"; // Bạn không dùng cái này nên có thể xóa
import img_header from "../assets/img_header.png";
import { Card } from "../components/Card.jsx";
import logo_family from "../assets/logo_family.png";
import logo_evolve from "../assets/logo_evolve.png";
import logo_green from "../assets/logo_green.png";
import logo_hope from "../assets/logo_hope.png";
import logo_medicare from "../assets/logo_medicare.png";
import { TestimonialSlider } from "../components/TestimonialSlider.jsx";
export function Landing() {
  return (
    <div className="w-full ">
      {/* Tôi đã thay đổi padding tổng thể từ p-10 thành p-16 (4rem) 
        để có nhiều không gian "thở" hơn.
      */}
      <div className="">
        {/* Phần Hero Section
          Thêm `items-center` để căn giữa 2 cột theo chiều dọc
        */}
        <div className="p-16 grid grid-cols-2 gap-20 items-center">
          {/* CỘT 1: TEXT, FEATURES, VÀ CTA */}
          <div>
            <h1 className="text-5xl text-[#003452] font-bold mb-4 ">
              Chào mừng đến với MediBook
            </h1>
            <p className="text-xl mb-6">
              {" "}
              {/* <-- THAY ĐỔI: Thêm mb-6 */}
              "Đặt khám dễ dàng, chăm sóc tận tâm - MediBook đồng hành cùng sức
              khỏe của bạn!"
            </p>

            {/* <-- THAY ĐỔI: Chuyển 3 features vào đây */}
            <div className="flex flex-col gap-4 text-sky-600 font-medium text-lg mb-8">
              {/* Tôi đã đổi màu text-sky-600, bỏ bold, giảm cỡ chữ
                để chúng đóng vai trò phụ trợ cho tiêu đề chính.
              */}
              <p>
                <i className="fa-solid fa-circle-check mr-2"></i>
                Đặt khám nhanh không cần chờ đợi - Lấy số trực tuyến từ xa
              </p>
              <p>
                <i className="fa-solid fa-circle-check mr-2"></i>
                Đặt khám theo cơ sở y tế - Lựa chọn giờ khám linh hoạt
              </p>
              <p>
                <i className="fa-solid fa-circle-check mr-2"></i>
                Đội ngũ y bác sĩ chuyên nghiệp và uy tín
              </p>
            </div>

            {/* <-- THAY ĐỔI: Thêm nút Kêu gọi Hành động (CTA) */}
            <button className="bg-sky-500 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all">
              <a
                href="/auth"
                className="text-white font-bold text-lg no-underline "
              >
                Đặt khám ngay
              </a>
            </button>
          </div>

          {/* CỘT 2: HÌNH ẢNH */}
          {/* <-- THAY ĐỔI: Thay thế list features bằng hình ảnh của bạn */}
          <div>
            <img
              src={img_header}
              alt="Bác sĩ và bệnh nhân"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Phần Services Section (Các Card)
          Thêm `mt-24` (margin-top) để tạo khoảng cách lớn với phần Hero
        */}
        <div className="mt-24 ">
          {/* <-- THAY ĐỔI: Thêm tiêu đề cho khu vực này */}
          <h2 className="text-4xl font-bold text-center mb-12 text-[#003353]">
            Tiện ích dành cho bạn
          </h2>
          {/* Dải 5 card của bạn
            Thêm `flex-wrap` để tự động xuống dòng trên màn hình nhỏ
          */}
          <div className="flex flex-wrap gap-10 justify-center p-16">
            <Card imageUrl="https://api.iconify.design/heroicons:building-office-2.svg?color=%2338bdf8">
              Đặt lịch khám tại <br /> cơ sở
            </Card>

            <Card imageUrl="https://api.iconify.design/heroicons:squares-2x2.svg?color=%2338bdf8">
              Đặt khám theo <br /> chuyên khoa
            </Card>

            <Card imageUrl="https://api.iconify.design/heroicons:calendar-days.svg?color=%2338bdf8">
              Đặt khám theo <br /> lịch hẹn cá nhân
            </Card>

            <Card imageUrl="https://api.iconify.design/heroicons:user.svg?color=%2338bdf8">
              Đặt khám theo <br /> bác sĩ
            </Card>

            <Card imageUrl="https://api.iconify.design/heroicons:chat-bubble-left-right.svg?color=%2338bdf8">
              Tư vấn <br /> tận tâm
            </Card>
          </div>
          {/* Phần How It Works Section */}
          <div className="py-20 px-10 bg-gray-50 p-16">
            {" "}
            {/* Dùng nền màu nhạt để tách biệt */}
            <h2 className="text-4xl font-bold text-center mb-12">
              Hoạt động như thế nào?
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
              {/* Bước 1 */}
              <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg text-center">
                {/* Thay bằng icon của bạn (ví dụ: Kính lúp) */}
                <img
                  src="https://api.iconify.design/heroicons:magnifying-glass.svg?color=%2338bdf8"
                  alt="Tìm kiếm"
                  className="h-20 w-20 mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">1. Tìm kiếm</h3>
                <p className="text-gray-600">
                  Chọn bác sĩ, chuyên khoa, hoặc cơ sở y tế phù hợp với nhu cầu
                  của bạn.
                </p>
              </div>

              {/* Bước 2 */}
              <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg text-center">
                {/* Thay bằng icon của bạn (ví dụ: Lịch) */}
                <img
                  src="https://api.iconify.design/heroicons:calendar-days.svg?color=%2338bdf8"
                  alt="Chọn lịch"
                  className="h-20 w-20 mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">
                  2. Chọn lịch hẹn
                </h3>
                <p className="text-gray-600">
                  Chọn ngày và khung giờ khám linh hoạt, phù hợp với thời gian
                  của bạn.
                </p>
              </div>

              {/* Bước 3 */}
              <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg text-center">
                {/* Thay bằng icon của bạn (ví dụ: Check) */}
                <img
                  src="https://api.iconify.design/heroicons:check-badge.svg?color=%2338bdf8"
                  alt="Xác nhận"
                  className="h-20 w-20 mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">3. Xác nhận</h3>
                <p className="text-gray-600">
                  Nhận phiếu khám điện tử và số thứ tự ngay lập tức mà không cần
                  chờ đợi.
                </p>
              </div>
            </div>
            {/*  */}
          </div>

          {/*  */}
        </div>

        {/* --- BẮT ĐẦU KHU VỰC CHUYÊN KHOA (ĐÃ SỬA LỖI) --- */}
        <div className="py-20 px-10  bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-12">
            Khám theo chuyên khoa
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Dễ dàng tìm kiếm bác sĩ và đặt lịch hẹn theo đúng chuyên khoa bạn
            cần.
          </p>

          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {/* 1. Tim mạch (Vẫn như cũ) */}
            <Card imageUrl="https://api.iconify.design/medical-icon:cardiology.svg?color=%2338bdf8">
              Tim mạch
            </Card>

            {/* 2. Tiêu hóa (ĐÃ THAY THẾ) */}
            <Card imageUrl="https://api.iconify.design/healthicons:stomach.svg?color=%2338bdf8">
              Tiêu hóa
            </Card>

            {/* 3. Da liễu (Vẫn như cũ) */}
            <Card imageUrl="https://api.iconify.design/medical-icon:dermatology.svg?color=%2338bdf8">
              Da liễu
            </Card>

            {/* 4. Thần kinh (Vẫn như cũ) */}
            <Card imageUrl="https://api.iconify.design/medical-icon:neurology.svg?color=%2338bdf8">
              Thần kinh
            </Card>

            {/* 5. Khoa Nhi (Vẫn như cũ) */}
            <Card imageUrl="https://api.iconify.design/medical-icon:pediatrics.svg?color=%2338bdf8">
              Khoa Nhi
            </Card>

            {/* 6. Răng Hàm Mặt (Vẫn như cũ) */}
            <Card imageUrl="https://api.iconify.design/medical-icon:dental.svg?color=%2338bdf8">
              Răng Hàm Mặt
            </Card>

            {/* 7. Xương khớp (ĐÃ THAY THẾ) */}
            <Card imageUrl="https://api.iconify.design/mdi:bone.svg?color=%2338bdf8">
              Cơ Xương Khớp
            </Card>

            {/* 8. Khoa Mắt (Vẫn như cũ) */}
            <Card imageUrl="https://api.iconify.design/medical-icon:ophthalmology.svg?color=%2338bdf8">
              Khoa Mắt
            </Card>
          </div>
        </div>
        {/* --- KẾT THÚC KHU VỰC CHUYÊN KHOA --- */}
        {/* --- Khu vực Đối tác --- */}
        <div className="py-16 px-10 bg-white">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Đối tác y tế của chúng tôi
          </h3>

          {/* Tôi đã điều chỉnh chiều cao (ví dụ: h-14) để các logo trông đồng đều.
    Bạn có thể thay đổi h-14, h-12, h-10... cho phù hợp.
  */}
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {/* Green Shield Clinic */}
            <img
              src={logo_green}
              alt="Logo Green Shield Clinic"
              className="h-50 hover:opacity-100"
            />

            {/* MediCare Clinic */}
            <img
              src={logo_medicare}
              alt="Logo MediCare Clinic"
              className="h-50 hover:opacity-100"
            />

            {/* Hope Health Clinic */}
            <img
              src={logo_hope}
              alt="Logo Hope Health Clinic"
              className="h-50 hover:opacity-100"
            />

            {/* Family Wellness Clinic */}
            <img
              src={logo_family}
              alt="Logo Family Wellness Clinic"
              className="h-50 hover:opacity-100"
            />

            {/* Evolve Medical Clinic */}
            <img
              src={logo_evolve}
              alt="Logo Evolve Medical Clinic"
              className="h-60 hover:opacity-100"
            />
          </div>
        </div>
        {/* --- Hết khu vực Đối tác --- */}

        <TestimonialSlider />
        {/* --- BẮT ĐẦU KHU VỰC THỐNG KÊ (NỀN XANH) --- */}
        <div className="py-20 bg-sky-400">
          {" "}
          {/* Nền xanh chủ đạo */}
          <div className="max-w-7xl mx-auto px-10">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              MediBook qua những con số
            </h2>

            {/* Lưới 4 cột */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {/* Thống kê 1: Bác sĩ (ĐÃ THAY ICON) */}
              <div>
                {/* Icon (User Circle - Heroicons) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto mb-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-5xl font-bold text-white">500+</p>
                <p className="text-lg text-sky-50 mt-2">Bác sĩ & Chuyên gia</p>
              </div>

              {/* Thống kê 2: Cơ sở y tế */}
              <div>
                {/* Icon (Màu trắng) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto mb-4 text-white"
                >
                  {" "}
                  {/* <-- Đã đổi */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.75M9 11.25h6.75M9 15.75h6.75M9 20.25h6.75"
                  />
                </svg>
                <p className="text-5xl font-bold text-white">50+</p>
                <p className="text-lg text-sky-50 mt-2">Cơ sở y tế</p>{" "}
                {/* <-- Đã đổi */}
              </div>

              {/* Thống kê 3: Bệnh nhân */}
              <div>
                {/* Icon (Màu trắng) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto mb-4 text-white"
                >
                  {" "}
                  {/* <-- Đã đổi */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <p className="text-5xl font-bold text-white">20.000+</p>
                <p className="text-lg text-sky-50 mt-2">
                  Bệnh nhân tin dùng
                </p>{" "}
                {/* <-- Đã đổi */}
              </div>

              {/* Thống kê 4: Lượt đặt khám */}
              <div>
                {/* Icon (Màu trắng) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto mb-4 text-white"
                >
                  {" "}
                  {/* <-- Đã đổi */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-5xl font-bold text-white">100.000+</p>
                <p className="text-lg text-sky-50 mt-2">Lượt đặt khám</p>{" "}
                {/* <-- Đã đổi */}
              </div>
            </div>
          </div>
        </div>
        {/* --- KẾT THÚC KHU VỰC THỐNG KÊ --- */}
      </div>
    </div>
  );
}
