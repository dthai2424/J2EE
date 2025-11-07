// Gợi ý tên file: TestimonialSlider.jsx
import React, { useState, useEffect } from "react";

// --- 1. Dữ liệu Testimonial (Mở rộng thành 9) ---
// Tôi đã chia sẵn thành 3 "slide", mỗi slide là 1 mảng 3 người.
// ... (phần import và logic useState/useEffect) ...
const testimonialSlides = [
  [
    {
      quote:
        "Tuyệt vời! Tôi đã đặt lịch cho mẹ tôi chỉ trong 2 phút. Đến bệnh viện là vào khám ngay không phải chờ đợi. Giao diện trực quan và dễ sử dụng, tôi rất hài lòng với trải nghiệm này.",
      name: "Chị Thu Trang",
      title: "Nhân viên văn phòng, Q.3, TP.HCM",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      quote:
        "Dịch vụ quá tiện lợi. Tôi thường xuyên bận rộn nên việc chọn được đúng bác sĩ và khung giờ khám mong muốn giúp tôi tiết kiệm rất nhiều thời gian. Không còn cảnh phải xin nghỉ làm cả buổi sáng.",
      name: "Anh Minh Đức",
      title: "Kỹ sư phần mềm, TP. Thủ Đức",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      quote:
        "Giao diện ứng dụng đơn giản, dễ dùng cho cả người lớn tuổi. Tôi đã đặt lịch khám thành công cho cả bố tôi. Ông bà ở nhà cũng có thể tự dùng được sau khi tôi chỉ 1-2 lần.",
      name: "Cô Lan Anh",
      title: "Nội trợ, Q.Tân Bình",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ],
  [
    {
      quote:
        "Hỗ trợ khách hàng rất nhanh. Tôi có thắc mắc về việc đổi giờ khám và được giải đáp ngay lập tức qua chat. Rất hài lòng với sự chuyên nghiệp và nhanh chóng của đội ngũ MediBook.",
      name: "Anh Quang Hùng",
      title: "Tài xế công nghệ, Q.10",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      quote:
        "Các bác sĩ trên hệ thống đều có thông tin, bằng cấp, và kinh nghiệm rất rõ ràng. Tôi dễ dàng tìm được bác sĩ Nữ chuyên khoa Sản mà tôi tin tưởng. Cảm ơn app.",
      name: "Chị Thanh Mai",
      title: "Giáo viên, Q.Gò Vấp",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      quote:
        "Là sinh viên, em rất ngại cảnh chờ đợi ở bệnh viện công. Dùng app đặt trước thực sự là cứu cánh, tiết kiệm cả một buổi sáng. Giờ em chỉ cần đến trước 15 phút là được.",
      name: "Bạn Hoàng Long",
      title: "Sinh viên, ĐH Bách Khoa",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ],
  [
    {
      quote:
        "Tính năng nhắc lịch hẹn rất hữu ích, tôi không bao giờ quên lịch tái khám của mình nữa. App tự động gửi thông báo trước 1 ngày và 2 giờ. Thực sự rất chu đáo.",
      name: "Chú Tuấn Kiệt",
      title: "Kế toán trưởng, Q.Phú Nhuận",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      quote:
        "Việc có thể xem trước giá khám và đặt lịch theo chuyên khoa giúp tôi chủ động hơn rất nhiều về tài chính và thời gian. Mọi thứ đều minh bạch, không có chi phí ẩn.",
      name: "Chị Phương Anh",
      title: "Kiến trúc sư, Q.7",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      quote:
        "Tôi đã dùng để đặt lịch khám cho con tôi. Rất nhanh, thông tin rõ ràng, đến nơi không phải xếp hàng. Bác sĩ cũng nhận được thông tin đặt lịch nên quy trình rất suôn sẻ.",
      name: "Chị Bảo Bình",
      title: "Nội trợ, Q.Bình Thạnh",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ],
];

// ... (phần còn lại của component TestimonialSlider) ...

// --- 2. Component Carousel ---
export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = testimonialSlides.length;

  // --- 3. Logic điều khiển và Auto-play ---
  const timeoutRef = React.useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 3000); // 3 giây
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex]);

  // --- 4. Render JSX ---
  return (
    <div className="py-20 px-4 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">
        Bệnh nhân nói gì về chúng tôi?
      </h2>

      {/* Container chính
          - max-w-7xl: Mở rộng container để chứa 3 card
      */}
      <div className="relative max-w-7xl mx-auto">
        {/* Viewport: Che các slide khác */}
        <div className="overflow-hidden h-100  w-full">
          {/* Slider Track: Chứa TẤT CẢ các slide (3 slide) */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {/* --- 5. Map qua CÁC SLIDE (3 slide) --- */}
            {testimonialSlides.map((slideGroup, slideIndex) => (
              // Đây là 1 slide, chứa 3 card
              <div key={slideIndex} className="w-full  flex-shrink-0">
                {/* Grid layout để hiển thị 3 card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                  {/* --- 6. Map qua CÁC CARD TRONG SLIDE (3 card) --- */}
                  {slideGroup.map((testimonial, cardIndex) => (
                    // Đây là 1 thẻ Testimonial
                    <div
                      key={cardIndex}
                      // flex-col: Quan trọng để căn avatar xuống dưới
                      className="bg-white p-6 rounded-xl shadow-lg flex flex-col min-h-[360px]"
                    >
                      {/* flex-grow: Đẩy phần avatar xuống đáy card */}
                      <div className="flex-grow">
                        <p className="text-gray-700 italic font-[lora] text-2xl mb-6">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="flex items-center mt-4">
                        <img
                          src={testimonial.avatar}
                          alt={`Avatar ${testimonial.name}`}
                          className="h-12 w-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <p className="font-bold text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* --- Hết map 3 card --- */}
                </div>
              </div>
            ))}
            {/* --- Hết map 3 slide --- */}
          </div>
        </div>

        {/* --- 7. Mũi tên điều khiển --- */}
        <button
          onClick={() => {
            prevSlide();
            resetTimer();
          }}
          className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            nextSlide();
            resetTimer();
          }}
          className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
