import { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { domain } from '../../common/commonVal';
import { useEffect } from 'react';

const regions = ['Bắc Bộ', 'Trung Bộ', 'Nam Bộ'];

function UserDashboardConntent({
  show,
  onHide,
  onSubmit,
  users = [],
  title,
  submitText,
  error,
  validationErrors = {},
  serverValidationErrors = {},
}) {
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({
    id: '',
    name: '',
    email: '',
    region: '',
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditedData(user);
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSubmit(editedData);
    setEditingUser(null);
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
        <Form onSubmit={onSubmit}>
          <Table
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Khu vực</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {editingUser === user.id ? (
                        <Form.Control
                          type="text"
                          name="name"
                          value={editedData.name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>
                      {editingUser === user.id ? (
                        <Form.Control
                          type="email"
                          name="email"
                          value={editedData.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingUser === user.id ? (
                        <Form.Select
                          name="region"
                          value={editedData.region}
                          onChange={handleInputChange}
                        >
                          {regions.map((region) => (
                            <option
                              key={region}
                              value={region}
                            >
                              {region}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        user.region
                      )}
                    </td>
                    <td>
                      {editingUser === user.id ? (
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
                            onClick={() => setEditingUser(null)}
                          >
                            Hủy
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEditClick(user)}
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
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default function UserDash() {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetch(`${domain}/admin/users`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleOpenModal = () => {
    setShowAddModal(true);
  };
  return (
    <div className="container-fluid mt-4">
      <h2>Danh sách người dùng</h2>
      <Button
        variant="primary"
        onClick={() => handleOpenModal()}
      >
        <i className="bi bi-plus-square"></i>
      </Button>
      {/* <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý địa điểm</h2>
        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
        >
          <i className="bi bi-plus-square"></i>
        </Button>
      </div>
 */}
      <Table
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
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
                colSpan="4"
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

UserDashboardConntent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
  submitText: PropTypes.string,
  error: PropTypes.string,
  validationErrors: PropTypes.object,
  serverValidationErrors: PropTypes.object,
};
