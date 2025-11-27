import { Routes, Route, useLocation } from "react-router-dom"; // 1. Thêm useLocation
import { PatientProfile } from "./pages/PatientProfile.jsx";
import { Landing } from "./pages/Landing.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footers } from "./components/Footers.jsx";
import { BookingPage } from "./pages/BookingPage.jsx";
import { BookingConfirmation } from "./pages/BookingConfirmation.jsx";
import { BookingSchedule } from "./pages/BookingSchedule.jsx";

// Import các component Admin (đã tạo ở bước trước)
import { AdminLayout } from "./pages/admin/AdminLayout";
import { DoctorManager } from "./pages/admin/DoctorManager";
import { ClinicManager } from "./pages/admin/ClinicManager";
import { SpecialtyManager } from "./pages/admin/SpecialtyManager";

function App() {
  // 2. Lấy đường dẫn hiện tại
  const location = useLocation();

  // 3. Kiểm tra xem có phải đang ở trang admin không
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* 4. Chỉ hiện Navbar và khoảng cách top nếu KHÔNG phải trang admin */}
      {!isAdminRoute && (
        <>
          <Navbar />
          <div className="mt-20"></div>
        </>
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        <Route path="/booking/schedule" element={<BookingSchedule />} />

        {/* Route cho Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="doctors" element={<DoctorManager />} />
          <Route path="clinics" element={<ClinicManager />} />
          <Route path="specialties" element={<SpecialtyManager />} />
        </Route>
      </Routes>

      {/* 5. Chỉ hiện Footer nếu KHÔNG phải trang admin */}
      {!isAdminRoute && <Footers />}
    </>
  );
}

export default App;
