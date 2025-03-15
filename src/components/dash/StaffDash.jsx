import { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { domain } from '../../common/commonVal';

const positions = ['Quản lý', 'Nhân viên', 'Thực tập sinh'];

function StaffDashboardContent({
  show,
  onHide,
  onSubmit,
  staffs = [],
  title,
  submitText,
  error,
  validationErrors = {},
  serverValidationErrors = {},
}) {
  const [editingStaff, setEditingStaff] = useState(null);
  const [editedData, setEditedData] = useState({
    staffId: '',
    fullName: '',
    position: '',
    phone: '',
  });

  const handleEditClick = (staff) => {
    setEditingStaff(staff.staffId);
    setEditedData(staff);
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSubmit(editedData);
    setEditingStaff(null);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        {Object.keys(serverValidationErrors).length > 0 && (
          <div className="alert alert-danger">
            <h6>Lỗi dữ liệu:</h6>
            <ul className="mb-0">
              {Object.entries(serverValidationErrors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <Table
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ và tên</th>
              <th>Chức vụ</th>
              <th>Số điện thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {staffs.length > 0 ? (
              staffs.map((staff) => (
                <tr key={staff.staffId}>
                  <td>{staff.staffId}</td>
                  <td>
                    {editingStaff === staff.staffId ? (
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={editedData.fullName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staff.fullName
                    )}
                  </td>
                  <td>
                    {editingStaff === staff.staffId ? (
                      <Form.Select
                        name="position"
                        value={editedData.position}
                        onChange={handleInputChange}
                      >
                        {positions.map((position) => (
                          <option
                            key={position}
                            value={position}
                          >
                            {position}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      staff.position
                    )}
                  </td>
                  <td>
                    {editingStaff === staff.staffId ? (
                      <Form.Control
                        type="text"
                        name="phone"
                        value={editedData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      staff.phone
                    )}
                  </td>
                  <td>
                    {editingStaff === staff.staffId ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={handleSave}
                        >
                          Lưu
                        </Button>{' '}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingStaff(null)}
                        >
                          Hủy
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEditClick(staff)}
                        >
                          Sửa
                        </Button>{' '}
                        <Button
                          variant="danger"
                          size="sm"
                        >
                          Xóa
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center"
                >
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={onHide}
          >
            Đóng
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function StaffDash() {
  const [Staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetch(`${domain}/admin/staffs`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setStaffs(data));
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h2>Danh sách nhân viên</h2>
      <Table
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {Staffs.length > 0 ? (
            Staffs.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                  >
                    Sửa
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

StaffDashboardContent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  staffs: PropTypes.arrayOf(
    PropTypes.shape({
      staffId: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
  submitText: PropTypes.string,
  error: PropTypes.string,
  validationErrors: PropTypes.object,
  serverValidationErrors: PropTypes.object,
};
