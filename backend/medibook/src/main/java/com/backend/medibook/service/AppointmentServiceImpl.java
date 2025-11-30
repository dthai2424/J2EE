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
    @Transactional
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


        if (appointmentDTO.getAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new AppointmentDateInvalidException("Không thể đặt lịch cho một thời điểm trong quá khứ.");
        }
        if (!clinicCare.get().getClinic().getClinicId().equals(clinicDoctor.get().getClinic().getClinicId())) {
            throw new ClinicCareNotFoundException("Dịch vụ đã chọn không được cung cấp tại cơ sở khám của bác sĩ này.");
        }
        if(appointmentRepository.existsByClinicDoctorAndSlotAndAppointmentDateAndStatusNot(
                clinicDoctor.get(), slot.get(), appointmentDTO.getAppointmentDate(),Status.CANCELLED
        )){
            throw new AppointmentAlreadyExistException("Cuộc hẹn đã tồn tại với bác sĩ, khung giờ và ngày đã chọn.");
        }

        appointmentDTO.setStatus(Status.PENDING);

        Appointment newAppointment = appointmentUtil.modelToEntity(appointmentDTO, patient.get(), clinicDoctor.get(), clinicCare.get(), slot.get());

        Appointment savedAppointment = appointmentRepository.save(newAppointment);

        return appointmentUtil.entityToModel(savedAppointment);
    }


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
    public List<AppointmentDTO> findAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();
        for (Appointment appointment : appointments) {
            appointmentDTOS.add(appointmentUtil.entityToModel(appointment));
        }
        return appointmentDTOS;
    }
    @Override
    public AppointmentDTO confirmAppointment(Integer appointmentId) {

        Optional<Appointment> appointment=appointmentRepository.findByAppointmentId(appointmentId);
        if(appointment.isEmpty()){
            throw new AppointmentNotFoundException("Không tìm thấy appointment với id:"+appointmentId);
        }


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


        if(appointment.get().getStatus() != Status.CONFIRMED){
            throw new AppointmentInvalidStateException("Chỉ có thể hoàn thành cuộc hẹn đang ở trạng thái 'Xác nhận'.");
        }

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
        active=true;
        Optional<User> user=userRepository.findById(userId);
        if(user.isEmpty()){
            throw new UserNotFoundException("Không tìm thấy user với id:"+userId);
        }
        List<Appointment> appointments=appointmentRepository.findByUser_UserIdAndActive(userId,active);
        List<AppointmentDTO> appointmentDTOS=new ArrayList<>();
        for(Appointment appointment:appointments){
            appointmentDTOS.add(appointmentUtil.entityToModel(appointment));
        }
        System.out.println(appointmentDTOS.size()+"\n\n\n\n\n");
        return appointmentDTOS;

    }

    @Override
    public List<AppointmentDTO> findAppointmentsByDoctorAndDate(Integer doctorId, LocalDate date) {

        if (!doctorRepository.existsById(doctorId)) {
            throw new DoctorIdNotFoundException("Không tìm thấy bác sĩ với ID: " + doctorId);
        }

        LocalDateTime startOfDay = date.atStartOfDay();

        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);


        List<Appointment> appointments = appointmentRepository
                .findByClinicDoctor_Doctor_DoctorIdAndAppointmentDateBetween(doctorId, startOfDay, endOfDay);


        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();
        for (Appointment appointment : appointments) {
            appointmentDTOS.add(appointmentUtil.entityToModel(appointment));
        }
        return appointmentDTOS;
    }
}