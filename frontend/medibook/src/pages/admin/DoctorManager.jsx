import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Label,
  TextInput,
  Datepicker,
} from "flowbite-react";
import { DoctorService } from "../../api/DoctorService";

export function DoctorManager() {
  const [doctors, setDoctors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form data cho Create (DTO phức tạp)
  const [createData, setCreateData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    careerStartDate: new Date(),
  });

  // Form data cho Update (DTO đơn giản)
  const [updateData, setUpdateData] = useState({
    doctorId: null,
    licenseNumber: "",
    careerStartDate: new Date(),
    active: true,
  });

  const fetchDoctors = async () => {
    try {
      const res = await DoctorService.getAll(true);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    // Mapping state phẳng sang cấu trúc DoctorRegistrationRequestDTO
    const payload = {
      userDTO: {
        username: createData.username,
        name: createData.name,
        email: createData.email,
        phoneNumber: createData.phoneNumber,
      },
      password: createData.password,
      licenseNumber: createData.licenseNumber,
      // Chuyển Date sang ISO string (backend java.time.LocalDateTime)
      careerStartDate: new Date(createData.careerStartDate).toISOString(),
    };

    try {
      await DoctorService.create(payload);
      alert("Tạo bác sĩ thành công!");
      setIsOpen(false);
      fetchDoctors();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data || error.message));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      doctorId: updateData.doctorId,
      licenseNumber: updateData.licenseNumber,
      careerStartDate: new Date(updateData.careerStartDate).toISOString(),
      active: updateData.active,
    };
    try {
      await DoctorService.update(payload);
      alert("Cập nhật thành công!");
      setIsOpen(false);
      fetchDoctors();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data || error.message));
    }
  };

  const openCreate = () => {
    setCreateData({
      username: "",
      password: "",
      name: "",
      email: "",
      phoneNumber: "",
      licenseNumber: "",
      careerStartDate: new Date(),
    });
    setIsEditing(false);
    setIsOpen(true);
  };

  const openEdit = (doc) => {
    setUpdateData({
      doctorId: doc.doctorId,
      licenseNumber: doc.licenseNumber,
      careerStartDate: new Date(doc.careerStartDate),
      active: doc.active,
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Quản lý Bác sĩ</h2>
        <Button onClick={openCreate}>Thêm Bác sĩ mới</Button>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Tên Bác sĩ</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Giấy phép</Table.HeadCell>
          <Table.HeadCell>Kinh nghiệm từ</Table.HeadCell>
          <Table.HeadCell>Thao tác</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {doctors.map((doc) => (
            <Table.Row key={doc.doctorId} className="bg-white">
              <Table.Cell>{doc.doctorId}</Table.Cell>
              <Table.Cell className="font-medium text-gray-900">
                {doc.user?.name}
              </Table.Cell>
              <Table.Cell>{doc.user?.username}</Table.Cell>
              <Table.Cell>{doc.licenseNumber}</Table.Cell>
              <Table.Cell>
                {new Date(doc.careerStartDate).getFullYear()}
              </Table.Cell>
              <Table.Cell>
                <Button size="xs" color="gray" onClick={() => openEdit(doc)}>
                  Sửa
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal show={isOpen} onClose={() => setIsOpen(false)} size="2xl">
        <Modal.Header>
          {isEditing ? "Cập nhật thông tin nghề nghiệp" : "Đăng ký Bác sĩ mới"}
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            // FORM UPDATE (Chỉ update thông tin nghề nghiệp theo Backend Logic)
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <div>
                <Label value="Số giấy phép" />
                <TextInput
                  value={updateData.licenseNumber}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      licenseNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label value="Ngày bắt đầu hành nghề" />
                <Datepicker
                  language="vi-VN"
                  value={updateData.careerStartDate}
                  onSelectedDateChanged={(date) =>
                    setUpdateData({ ...updateData, careerStartDate: date })
                  }
                />
              </div>
              <Button type="submit">Cập nhật</Button>
            </form>
          ) : (
            // FORM CREATE (User info + Doctor info)
            <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 font-bold text-gray-700 border-b pb-2">
                Thông tin tài khoản
              </div>
              <div>
                <Label value="Username" />
                <TextInput
                  value={createData.username}
                  onChange={(e) =>
                    setCreateData({ ...createData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label value="Password" />
                <TextInput
                  type="password"
                  value={createData.password}
                  onChange={(e) =>
                    setCreateData({ ...createData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label value="Họ tên" />
                <TextInput
                  value={createData.name}
                  onChange={(e) =>
                    setCreateData({ ...createData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label value="Email" />
                <TextInput
                  type="email"
                  value={createData.email}
                  onChange={(e) =>
                    setCreateData({ ...createData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label value="SĐT" />
                <TextInput
                  value={createData.phoneNumber}
                  onChange={(e) =>
                    setCreateData({
                      ...createData,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-span-2 font-bold text-gray-700 border-b pb-2 mt-4">
                Thông tin nghề nghiệp
              </div>
              <div>
                <Label value="Số giấy phép hành nghề" />
                <TextInput
                  value={createData.licenseNumber}
                  onChange={(e) =>
                    setCreateData({
                      ...createData,
                      licenseNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label value="Ngày bắt đầu" />
                <Datepicker
                  language="vi-VN"
                  onSelectedDateChanged={(date) =>
                    setCreateData({ ...createData, careerStartDate: date })
                  }
                />
              </div>

              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <Button color="gray" onClick={() => setIsOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Tạo mới</Button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
