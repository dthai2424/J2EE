package com.backend.medibook.service;

import com.backend.medibook.dto.AppointmentDTO;
import com.backend.medibook.entity.*;
import com.backend.medibook.exception.*;
import com.backend.medibook.repository.*;
import com.backend.medibook.util.AppointmentUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import Transactional

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private ClinicDoctorRepository clinicDoctorRepository;
    @Autowired
    private ClinicCareRepository clinicCareRepository;
    @Autowired
    private SlotRepository slotRepository;
    @Autowired
    private AppointmentUtil appointmentUtil;

    @Override
    @Transactional // Thêm annotation này để quản lý transaction
    public AppointmentDTO create(AppointmentDTO appointmentDTO) {
        Optional<User> patient = userRepository.findById(appointmentDTO.getPatientId());
        Optional<ClinicDoctor> clinicDoctor= clinicDoctorRepository.findById(appointmentDTO.getClinicDoctorId());
        Optional<ClinicCare> clinicCare= clinicCareRepository.findById(appointmentDTO.getClinicCareId());
        Optional<Slot> slot= slotRepository.findById(appointmentDTO.getSlotId());

        if(!patient.isPresent()){
            throw new UserNotFoundException("Không tìm thấy user với id:"+appointmentDTO.getPatientId());
        }
        if(!clinicDoctor.isPresent()){
            throw new ClinicDoctorNotFoundException("Không tìm thấy clinicDoctor với id:"+appointmentDTO.getClinicDoctorId());
        }
        if(!clinicCare.isPresent()){
            throw new ClinicCareNotFoundException("Không tìm thấy clinicCare với id:"+appointmentDTO.getClinicCareId());
        }
        if(!slot.isPresent()){
            throw new SlotNotFoundException("Không tìm thấy slot với id:"+appointmentDTO.getSlotId());
        }

        // (Logic validation giữ nguyên...)
        if (appointmentDTO.getAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new AppointmentDateInvalidException("Không thể đặt lịch cho một thời điểm trong quá khứ.");
        }
        if (!clinicCare.get().getClinic().getClinicId().equals(clinicDoctor.get().getClinic().getClinicId())) {
            throw new ClinicCareNotFoundException("Dịch vụ đã chọn không được cung cấp tại cơ sở khám của bác sĩ này.");
        }
        if(appointmentRepository.existsByClinicDoctorAndSlotAndAppointmentDate(
                clinicDoctor.get(), slot.get(), appointmentDTO.getAppointmentDate()
        )){
            throw new AppointmentAlreadyExistException("Cuộc hẹn đã tồn tại với bác sĩ, khung giờ và ngày đã chọn.");
        }

        appointmentDTO.setStatus(Status.PENDING);

        // Tạo entity mới (Lưu ý: appointmentUtil đã được sửa để không set ID = 0)
        Appointment newAppointment = appointmentUtil.modelToEntity(appointmentDTO, patient.get(), clinicDoctor.get(), clinicCare.get(), slot.get());

        Appointment savedAppointment = appointmentRepository.save(newAppointment);

        return appointmentUtil.entityToModel(savedAppointment);
    }

    // ... (Các method khác giữ nguyên)
    @Override
    public AppointmentDTO cancelAppointmentAsPatient(Integer appointmentId, Integer userId) {
        Optional<Appointment> appointment=appointmentRepository.findByAppointmentId(appointmentId);
        if(appointment.isEmpty()){
            throw new AppointmentNotFoundException("Không tìm thấy appointment với id:"+appointmentId);
        }
        if(!appointment.get().getUser().getUserId().equals(userId)){{
            throw new AppointmentUnauthorizedActionException("Người dùng không có quyền hủy cuộc hẹn này.");
        }}
        Status currentStatus=appointment.get().getStatus();
        if (currentStatus == Status.COMPLETED || currentStatus == Status.CANCELLED) {
            throw new AppointmentInvalidStateException("Không thể hủy một cuộc hẹn đã hoàn thành hoặc đã bị hủy trước đó.");
        }
        LocalDateTime now = LocalDateTime.now();
        long hoursUntilAppointment = Duration.between(now, appointment.get().getAppointmentDate()).toHours();


        if (hoursUntilAppointment < 24) {
            throw new AppointmentInvalidStateException("Không thể hủy lịch hẹn trước giờ khám ít hơn 24 tiếng.");
        }

        appointment.get().setStatus(Status.CANCELLED);

        Appointment cancelledAppointment = appointmentRepository.save(appointment.get());

        return appointmentUtil.entityToModel(cancelledAppointment);
    }


    @Override
    public AppointmentDTO confirmAppointment(Integer appointmentId) {
        // ===== BƯỚC 1: TÌM CUỘC HẸN =====
        Optional<Appointment> appointment=appointmentRepository.findByAppointmentId(appointmentId);
        if(appointment.isEmpty()){
            throw new AppointmentNotFoundException("Không tìm thấy appointment với id:"+appointmentId);
        }


        // Chỉ xác nhận được khi cuộc hẹn đang ở trạng thái "Chờ xác nhận".
        if(appointment.get().getStatus() != Status.PENDING){
            throw new AppointmentInvalidStateException("Chỉ có thể xác nhận cuộc hẹn đang ở trạng thái 'Chờ xác nhận'.");
        }
        appointment.get().setStatus(Status.CONFIRMED);
        Appointment confirmedAppointment = appointmentRepository.save(appointment.get());


        return appointmentUtil.entityToModel(confirmedAppointment);

    }
    @Override
    public AppointmentDTO completeAppointment(Integer appointmentId) {
        Optional<Appointment> appointment=appointmentRepository.findByAppointmentId(appointmentId);
        if(appointment.isEmpty()){
            throw new AppointmentNotFoundException("Không tìm thấy appointment với id:"+appointmentId);
        }

        // Chỉ hoàn thành được khi cuộc hẹn đang ở trạng thái "Xác nhận".
        if(appointment.get().getStatus() != Status.CONFIRMED){
            throw new AppointmentInvalidStateException("Chỉ có thể hoàn thành cuộc hẹn đang ở trạng thái 'Xác nhận'.");
        }
        // Một cuộc hẹn chỉ nên được đánh dấu là hoàn thành sau khi thời gian hẹn đã qua.
        if (appointment.get().getAppointmentDate().isAfter(LocalDateTime.now())) {
            throw new AppointmentInvalidStateException("Không thể hoàn thành một cuộc hẹn chưa tới giờ khám.");
        }
        // Sửa lại cho đúng
        appointment.get().setStatus(Status.COMPLETED);
        Appointment confirmedAppointment = appointmentRepository.save(appointment.get());


        return appointmentUtil.entityToModel(confirmedAppointment);
    }

    @Override
    public AppointmentDTO cancelAppointmentAsAdmin(Integer appointmentId) {
        Optional<Appointment> appointment=appointmentRepository.findByAppointmentId(appointmentId);
        if(appointment.isEmpty()){
            throw new AppointmentNotFoundException("Không tìm thấy appointment với id:"+appointmentId);
        }
        Status currentStatus=appointment.get().getStatus();
        if (currentStatus == Status.COMPLETED || currentStatus == Status.CANCELLED) {
            throw new AppointmentInvalidStateException("Không thể hủy một cuộc hẹn đã hoàn thành hoặc đã bị hủy trước đó.");
        }

        appointment.get().setStatus(Status.CANCELLED);

        Appointment cancelledAppointment = appointmentRepository.save(appointment.get());

        return appointmentUtil.entityToModel(cancelledAppointment);
    }

    @Override
    public AppointmentDTO getAppointmentById(Integer appointmentId) {
        Optional<Appointment> appointment=appointmentRepository.findByAppointmentId(appointmentId);
        if(appointment.isEmpty()){
            throw new AppointmentNotFoundException("Không tìm thấy appointment với id:"+appointmentId);
        }
        return appointmentUtil.entityToModel(appointment.get());
    }

    @Override
    public List<AppointmentDTO> findAppointmentsByUser(Integer userId,boolean active) {
        Optional<User> user=userRepository.findById(userId);
        if(user.isEmpty()){
            throw new UserNotFoundException("Không tìm thấy user với id:"+userId);
        }
        List<Appointment> appointments=appointmentRepository.findByUser_UserIdAndActive(userId,active);
        List<AppointmentDTO> appointmentDTOS=new ArrayList<>();
        for(Appointment appointment:appointments){
            appointmentDTOS.add(appointmentUtil.entityToModel(appointment));
        }
        return appointmentDTOS;

    }

    @Override
    public List<AppointmentDTO> findAppointmentsByDoctorAndDate(Integer doctorId, LocalDate date) {
        // ===== BƯỚC 1: KIỂM TRA SỰ TỒN TẠI CỦA BÁC SĨ =====
        if (!doctorRepository.existsById(doctorId)) {
            throw new DoctorIdNotFoundException("Không tìm thấy bác sĩ với ID: " + doctorId);
        }

        // ===== BƯỚC 2: TÍNH TOÁN KHOẢNG THỜI GIAN TRONG NGÀY =====
        // Thời điểm bắt đầu của ngày (ví dụ: 2023-10-27 00:00:00)
        LocalDateTime startOfDay = date.atStartOfDay();
        // Thời điểm kết thúc của ngày (ví dụ: 2023-10-27 23:59:59.999...)
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        // ===== BƯỚC 3: TRUY VẤN CƠ SỞ DỮ LIỆU =====
        // Sử dụng phương thức repository đã được sửa lại cho đúng
        List<Appointment> appointments = appointmentRepository
                .findByClinicDoctor_Doctor_DoctorIdAndAppointmentDateBetween(doctorId, startOfDay, endOfDay);

        // ===== BƯỚC 4: CHUYỂN ĐỔI VÀ TRẢ VỀ KẾT QUẢ =====
        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();
        for (Appointment appointment : appointments) {
            appointmentDTOS.add(appointmentUtil.entityToModel(appointment));
        }
        return appointmentDTOS;
    }
}