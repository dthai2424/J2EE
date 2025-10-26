CREATE DATABASE MEDIBOOK;

-- Sử dụng cơ sở dữ liệu MEDIBOOK (dựa trên file database.sql của bạn)
USE MEDIBOOK;
-- Sử dụng cơ sở dữ liệu MEDIBOOK


-- -----------------------------------------------------
-- 1. Bảng `users`
-- (Bảng này sử dụng snake_case cho PK và các cột mặc định)
-- Dựa trên: User.java
-- -----------------------------------------------------
INSERT INTO `users` (`user_id`, `username`, `password`, `name`, `email`, `phone_number`, `created_at`, `role`, `active`)
VALUES
(1, 'admin', '$2a$10$f/9.b.L4P3GPEf5s.j.t.u4n2.9S3G..d.0.F.2s.C0.x.S.o.C.Kq', 'Admin User', 'admin@medibook.com', '0900000001', NOW(), 'Admin', 1),
(2, 'dr.house', '$2a$10$f/9.b.L4P3GPEf5s.j.t.u4n2.9S3G..d.0.F.2s.C0.x.S.o.C.Kq', 'Dr. Gregory House', 'house@medibook.com', '0900000002', NOW(), 'Doctor', 1),
(3, 'dr.strange', '$2a$10$f/9.b.L4P3GPEf5s.j.t.u4n2.9S3G..d.0.F.2s.C0.x.S.o.C.Kq', 'Dr. Stephen Strange', 'strange@medibook.com', '0900000003', NOW(), 'Doctor', 1),
(4, 'patient.a', '$2a$10$f/9.b.L4P3GPEf5s.j.t.u4n2.9S3G..d.0.F.2s.C0.x.S.o.C.Kq', 'Nguyễn Văn A', 'patient.a@gmail.com', '0912345678', NOW(), 'Patient', 1),
(5, 'patient.b', '$2a$10$f/9.b.L4P3GPEf5s.j.t.u4n2.9S3G..d.0.F.2s.C0.x.S.o.C.Kq', 'Trần Thị B', 'patient.b@gmail.com', '0987654321', NOW(), 'Patient', 1);

-- -----------------------------------------------------
-- 2. Bảng `clinics`
-- (Bảng này sử dụng snake_case cho PK và các cột mặc định)
-- Dựa trên: Clinic.java
-- -----------------------------------------------------
INSERT INTO `clinics` (`clinic_id`, `name`, `phone_number`, `email`, `address`, `active`)
VALUES
(1, 'Bệnh viện Đa Khoa Sài Gòn', '02838291711', 'info@bvdksaigon.com', '125 Lê Lợi, P. Bến Nghé, Q.1, TP.HCM', 1),
(2, 'Phòng khám Quốc tế Victoria', '02839104545', 'info@victoriahealthcare.vn', '20 Đinh Tiên Hoàng, P. Đa Kao, Q.1, TP.HCM', 1);

-- -----------------------------------------------------
-- 3. Bảng `specialties`
-- (Bảng này sử dụng snake_case cho PK)
-- Dựa trên: Specialty.java
-- -----------------------------------------------------
INSERT INTO `specialties` (`specialty_id`, `name`, `description`, `active`)
VALUES
(1, 'khoa-noi', 'Khám nội tổng quát', 1),
(2, 'khoa-ngoai', 'Khám ngoại chấn thương', 1),
(3, 'tim-mach', 'Khám tim mạch', 1),
(4, 'da-lieu', 'Khám da liễu', 1);

-- -----------------------------------------------------
-- 4. Bảng `slots`
-- (Bảng này sử dụng snake_case cho PK và các cột mặc định)
-- Dựa trên: Slot.java
-- -----------------------------------------------------
INSERT INTO `slots` (`slot_id`, `start_time`, `end_time`, `active`)
VALUES
(1, '08:00:00', '08:30:00', 1),
(2, '08:30:00', '09:00:00', 1),
(3, '09:00:00', '09:30:00', 1),
(4, '14:00:00', '14:30:00', 1),
(5, '14:30:00', '15:00:00', 1);

-- -----------------------------------------------------
-- 5. Bảng `doctors`
-- (Cột FK `userId` là camelCase theo @JoinColumn)
-- Dựa trên: Doctor.java
-- -----------------------------------------------------
INSERT INTO `doctors` (`doctor_id`, `user_id`, `career_start_date`, `license_number`, `active`)
VALUES
(1, 2, '2005-11-16 09:00:00', 'CCHN001-HOUSE', 1), -- Nối với user ID 2 (dr.house)
(2, 3, '2010-07-21 09:00:00', 'CCHN002-STRANGE', 1); -- Nối với user ID 3 (dr.strange)


-- -----------------------------------------------------
-- 6. Bảng `clinic_cares`
-- (Cột FK `clinicId` và `specialtyId` là camelCase theo @JoinColumn)
-- Dựa trên: ClinicCare.java
-- -----------------------------------------------------
INSERT INTO `clinic_cares` (`clinic_care_id`, `clinic_id`, `specialty_id`, `name`, `description`, `price`, `active`)
VALUES
(1, 1, 1, 'kham-noi-tong-quat', 'Khám sức khỏe tổng quát, tư vấn', 250000, 1), -- Clinic 1, Specialty 1
(2, 1, 3, 'do-dien-tam-do', 'Đo điện tâm đồ (ECG)', 150000, 1), -- Clinic 1, Specialty 3
(3, 2, 4, 'kham-da-lieu-co-ban', 'Khám mụn, nấm, vảy nến', 300000, 1), -- Clinic 2, Specialty 4
(4, 2, 1, 'kham-noi-chuyen-gia', 'Khám nội với bác sĩ chuyên gia', 500000, 1); -- Clinic 2, Specialty 1

-- -----------------------------------------------------
-- 7. Bảng `clinic_doctors`
-- (Cột FK `clinicId`, `doctorId`, `specialtyId` là camelCase theo @JoinColumn)
-- Dựa trên: ClinicDoctor.java
-- -----------------------------------------------------
INSERT INTO `clinic_doctors` (`clinic_doctor_id`, `clinic_id`, `doctor_id`, `specialty_id`, `active`)
VALUES
(1, 1, 1, 1, 1), -- Clinic 1 (Sài Gòn), Dr 1 (House), Specialty 1 (Nội)
(2, 1, 1, 3, 1), -- Clinic 1 (Sài Gòn), Dr 1 (House), Specialty 3 (Tim Mạch)
(3, 2, 2, 1, 1), -- Clinic 2 (Victoria), Dr 2 (Strange), Specialty 1 (Nội)
(4, 2, 2, 4, 1); -- Clinic 2 (Victoria), Dr 2 (Strange), Specialty 4 (Da Liễu)

-- -----------------------------------------------------
-- 8. Bảng `appointments`
-- (Cột FK `userId`, `clinicDoctorId`, `clinicCareId`, `slotId` là camelCase theo @JoinColumn)
-- Dựa trên: Appointment.java
-- -----------------------------------------------------
INSERT INTO `appointments` (`appointment_id`, `user_id`, `clinic_doctor_id`, `clinic_care_id`, `slot_id`, `created_at`, `appointment_date`, `status`, `active`)
VALUES
-- Patient A (User 4) hẹn Dr. House (ClinicDoctor 1) khám Nội (Care 1) vào Slot 1
(1, 4, 1, 1, 1, NOW(), '2025-10-25 08:00:00', 'PENDING', 1),
-- Patient B (User 5) hẹn Dr. Strange (ClinicDoctor 4) khám Da liễu (Care 3) vào Slot 4
(2, 5, 4, 3, 4, NOW(), '2025-10-26 14:00:00', 'CONFIRMED', 1),
-- Patient A (User 4) hẹn Dr. House (ClinicDoctor 2) khám Tim Mạch (Care 2) vào Slot 3
(3, 4, 2, 2, 3, NOW(), '2025-10-20 09:00:00', 'COMPLETED', 1);

