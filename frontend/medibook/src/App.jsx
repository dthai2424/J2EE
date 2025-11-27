import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PatientProfile } from "./pages/PatientProfile.jsx";
import { Landing } from "./pages/Landing.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footers } from "./components/Footers.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BookingPage } from "./pages/BookingPage.jsx"; // <--- Import mới
import { BookingConfirmation } from "./pages/BookingConfirmation.jsx";
import { BookingSchedule } from "./pages/BookingSchedule.jsx";
function App() {
  return (
    <>
      <Navbar />
      <div className="mt-20"></div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<PatientProfile />} />
        {/* Route mới cho trang đặt khám */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        <Route path="/booking/schedule" element={<BookingSchedule />} />
      </Routes>
      <Footers />
    </>
  );
}

export default App;
