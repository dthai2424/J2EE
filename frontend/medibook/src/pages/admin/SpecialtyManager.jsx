import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Label,
  TextInput,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import { SpecialtyService } from "../../api/SpecialtyService"; // Đảm bảo import đúng

export function SpecialtyManager() {
  const [specialties, setSpecialties] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchSpecialties = async () => {
    try {
      const res = await SpecialtyService.getAll(true); // Lấy active
      setSpecialties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await SpecialtyService.update(formData);
      } else {
        await SpecialtyService.create(formData);
      }
      setIsOpen(false);
      fetchSpecialties();
      resetForm();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data || "Có lỗi xảy ra"));
    }
  };

  const openEdit = (spec) => {
    setFormData(spec);
    setIsEditing(true);
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", active: true });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Quản lý Chuyên khoa</h2>
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
          <Table.HeadCell>Tên chuyên khoa</Table.HeadCell>
          <Table.HeadCell>Mô tả</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>Thao tác</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {specialties.map((spec) => (
            <Table.Row key={spec.specialtyId} className="bg-white">
              <Table.Cell>{spec.specialtyId}</Table.Cell>
              <Table.Cell className="font-medium text-gray-900">
                {spec.name}
              </Table.Cell>
              <Table.Cell>{spec.description}</Table.Cell>
              <Table.Cell>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    spec.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {spec.active ? "Active" : "Inactive"}
                </span>
              </Table.Cell>
              <Table.Cell>
                <Button size="xs" color="gray" onClick={() => openEdit(spec)}>
                  Sửa
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          {isEditing ? "Cập nhật Chuyên khoa" : "Thêm Chuyên khoa"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Tên chuyên khoa" />
              <TextInput
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label value="Mô tả" />
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            {isEditing && (
              <ToggleSwitch
                checked={formData.active}
                label="Kích hoạt"
                onChange={(checked) =>
                  setFormData({ ...formData, active: checked })
                }
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
