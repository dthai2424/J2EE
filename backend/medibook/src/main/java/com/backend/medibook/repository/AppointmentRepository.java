package com.backend.medibook.repository;

import com.backend.medibook.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {
    Optional<Appointment> findByAppointmentId(Integer id);

    List<Appointment> findByClinic_ClinicIdAndDoctor_DoctorIdAndAppointmentDateBetweenAndActive(Integer clinicId,Integer doctorId, LocalDateTime startOfDay,LocalDateTime endOfDay,boolean active);

    List<Appointment> findByUser_UserIdAndActive(Integer userId,boolean active);

    List<Appointment> findByUser_UserIdAndClinicService_ClinicServiceIdAndActive(Integer userId,Integer clinicServiceId,boolean active);

    List<Appointment> findByDoctor_DoctorIdAndClinic_ClinicIdAndAppointmentDateBetweenAndActive(Integer doctorId,Integer clinicId,LocalDateTime startDay,LocalDateTime endDate,boolean active);

    List<Appointment> findByDoctor_DoctorIdAndActive(Integer doctorId,boolean active);

    List<Appointment> findByClinic_ClinicIdAndClinicService_ClinicServiceIdAndAppointmentDateBetweenAndActive(Integer clinicId,Integer clinicServiceId,LocalDateTime startDay,LocalDateTime endDate,boolean active);


}
