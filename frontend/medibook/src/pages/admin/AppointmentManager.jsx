import React, { useEffect, useState } from "react";
import { AppointmentService } from "../../api/AppointmentService";
import { useAuth } from "../../context/AuthContext";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCcw,
} from "lucide-react";

export function AppointmentManager() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionType, setActionType] = useState(""); // 'confirm', 'complete', 'cancel'

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await AppointmentService.getAllAppointments();

      setAppointments(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách lịch hẹn:", err);

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchAppointments();
    }
  }, [user]);

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return "";
    return new Date(dateTimeString).toLocaleDateString("vi-VN");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" /> Hoàn thành
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle size={12} className="mr-1" /> Đã xác nhận
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" /> Đã hủy
          </span>
        );
      default: // PENDING
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} className="mr-1" /> Chờ xác nhận
          </span>
        );
    }
  };

  const openActionModal = (appointment, action) => {
    setSelectedAppointment(appointment);
    setActionType(action);
    setModalOpen(true);
  };

  const handleAction = async () => {
    if (!selectedAppointment || !actionType) return;

    let apiCall;
    switch (actionType) {
      case "confirm":
        apiCall = AppointmentService.confirm(selectedAppointment.appointmentId);
        break;
      case "complete":
        apiCall = AppointmentService.complete(
          selectedAppointment.appointmentId
        );
        break;
      case "cancel":
        apiCall = AppointmentService.cancelAsAdmin(
          selectedAppointment.appointmentId
        );
        break;
      default:
        return;
    }

    try {
      await apiCall;
      alert(`Thao tác ${actionType} thành công!`);
      setModalOpen(false);
      fetchAppointments(); // Refresh data
    } catch (error) {
      alert("Lỗi thao tác: " + (error.response?.data || error.message));
    }
  };

  const renderActionButtons = (app) => {
    const isPending = app.status === "PENDING";
    const isConfirmed = app.status === "CONFIRMED";
    const isActive = app.status === "PENDING" || app.status === "CONFIRMED";

    return (
      <div className="flex gap-2">
        {isPending && (
          <button
            onClick={() => openActionModal(app, "confirm")}
            className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            title="Xác nhận lịch hẹn"
          >
            Xác nhận
          </button>
        )}
        {isConfirmed && (
          <button
            onClick={() => openActionModal(app, "complete")}
            className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            title="Đánh dấu đã hoàn thành"
          >
            Hoàn thành
          </button>
        )}
        {isActive && (
          <button
            onClick={() => openActionModal(app, "cancel")}
            className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            title="Hủy lịch hẹn"
          >
            Hủy
          </button>
        )}
      </div>
    );
  };
  const renderConfirmationModal = () => {
    if (!selectedAppointment) return null;

    let title, message;
    switch (actionType) {
      case "confirm":
        title = "Xác nhận Lịch hẹn";
        message = `Bạn có chắc chắn muốn XÁC NHẬN lịch hẹn #${selectedAppointment.appointmentId} cho bệnh nhân ${selectedAppointment.patient?.name} không?`;
        break;
      case "complete":
        title = "Hoàn thành Lịch hẹn";
        message = `Bạn có chắc chắn muốn ĐÁNH DẤU HOÀN THÀNH lịch hẹn #${selectedAppointment.appointmentId} của bệnh nhân ${selectedAppointment.patient?.name} không?`;
        break;
      case "cancel":
        title = "Hủy Lịch hẹn";
        message = `Bạn có chắc chắn muốn HỦY lịch hẹn #${selectedAppointment.appointmentId} này không? (Lưu ý: Thao tác này là dành cho Admin/Lễ tân)`;
        break;
      default:
        return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
          <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-400 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            >
              <XCircle size={20} />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-700 font-medium mb-6">{message}</p>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
              <p>
                <span className="font-semibold">Ngày & Giờ: </span>
                {formatDate(selectedAppointment.appointmentDate)} @{" "}
                {formatTime(selectedAppointment.slot?.startTime)}
              </p>
              <p>
                <span className="font-semibold">Bác sĩ: </span>
                {selectedAppointment.doctor?.user?.name}
              </p>
              <p>
                <span className="font-semibold">Dịch vụ: </span>
                {selectedAppointment.clinicCare?.name}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleAction}
              className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${
                actionType === "cancel"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Thực hiện {actionType.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Lịch hẹn</h2>
        <button
          onClick={fetchAppointments}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
        >
          <RefreshCcw size={16} /> Tải lại
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Đang tải dữ liệu...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-6 py-3">Bệnh nhân</th>
                <th className="px-6 py-3">Ngày & Giờ</th>
                <th className="px-6 py-3">Bác sĩ & Phòng khám</th>
                <th className="px-6 py-3">Dịch vụ</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr
                  key={app.appointmentId}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-4 font-medium text-gray-900">
                    #{app.appointmentId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {app.patient?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {app.patient?.phoneNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {formatDate(app.appointmentDate)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(app.slot?.startTime)} -{" "}
                      {formatTime(app.slot?.endTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{app.doctor?.user?.name}</div>
                    <div className="text-xs text-gray-500">
                      {app.clinic?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">{app.clinicCare?.name}</td>
                  <td className="px-6 py-4">{renderStatusBadge(app.status)}</td>
                  <td className="px-4 py-4">{renderActionButtons(app)}</td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Không tìm thấy lịch hẹn nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* RENDER MODAL XÁC NHẬN */}
      {modalOpen && renderConfirmationModal()}
    </div>
  );
}
