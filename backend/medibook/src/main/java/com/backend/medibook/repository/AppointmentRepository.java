package com.backend.medibook.repository;

import com.backend.medibook.entity.Appointment;
import com.backend.medibook.entity.ClinicDoctor;
import com.backend.medibook.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {


    boolean existsByClinicDoctorAndSlotAndAppointmentDate(ClinicDoctor clinicDoctor, Slot slot, LocalDateTime appointmentDate);

    Optional<Appointment> findByAppointmentId(Integer appointmentId);
    
    List<Appointment> findByUser_UserIdAndActive(Integer userId, boolean active);

    /**
     * Tìm các cuộc hẹn của một bác sĩ trong một khoảng thời gian (ví dụ: trong một ngày).
     * Truy vấn lồng qua: Appointment -> ClinicDoctor -> Doctor
     */
    List<Appointment> findByClinicDoctor_Doctor_DoctorIdAndAppointmentDateBetween(Integer doctorId, LocalDateTime startOfDay, LocalDateTime endOfDay);

    /**
     * Tìm các cuộc hẹn tại một phòng khám trong một khoảng thời gian.
     * Truy vấn lồng qua: Appointment -> ClinicDoctor -> Clinic
     */
    List<Appointment> findByClinicDoctor_Clinic_ClinicIdAndAppointmentDateBetween(Integer clinicId, LocalDateTime startOfDay, LocalDateTime endOfDay);

}