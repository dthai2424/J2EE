import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Label,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import { ClinicService } from "../../api/ClinicService";

export function ClinicManager() {
  const [clinics, setClinics] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchClinics = async () => {
    try {
      const res = await ClinicService.getAll();
      setClinics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await ClinicService.update(formData);
      } else {
        await ClinicService.create(formData);
      }
      setIsOpen(false);
      fetchClinics();
      resetForm();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data || error.message));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      active: true,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Quản lý Phòng khám</h2>
        <Button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
        >
          Thêm mới
        </Button>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Tên CSYT</Table.HeadCell>
          <Table.HeadCell>Địa chỉ</Table.HeadCell>
          <Table.HeadCell>SĐT / Email</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>Thao tác</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {clinics.map((clinic) => (
            <Table.Row key={clinic.clinicId} className="bg-white">
              <Table.Cell>{clinic.clinicId}</Table.Cell>
              <Table.Cell className="font-medium">{clinic.name}</Table.Cell>
              <Table.Cell>{clinic.address}</Table.Cell>
              <Table.Cell>
                <div>{clinic.phoneNumber}</div>
                <div className="text-xs text-gray-500">{clinic.email}</div>
              </Table.Cell>
              <Table.Cell>{clinic.active ? "Hoạt động" : "Dừng"}</Table.Cell>
              <Table.Cell>
                <Button
                  size="xs"
                  color="gray"
                  onClick={() => {
                    setFormData(clinic);
                    setIsEditing(true);
                    setIsOpen(true);
                  }}
                >
                  Sửa
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal show={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <Modal.Header>
          {isEditing ? "Sửa thông tin" : "Thêm Phòng khám"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Tên cơ sở" />
              <TextInput
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label value="Địa chỉ" />
              <TextInput
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label value="Email" />
                <TextInput
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label value="Số điện thoại" />
                <TextInput
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            {isEditing && (
              <ToggleSwitch
                checked={formData.active}
                label="Hoạt động"
                onChange={(c) => setFormData({ ...formData, active: c })}
              />
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Button color="gray" onClick={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">Lưu</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
