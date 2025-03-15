import { useState, useMemo } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import ErrorPage from '../../pages/ErrorPage';
import useURL from '../../hooks/useURL';
import { domain } from '../../common/commonVal';
import LocationFormModal from './LocationFormModal';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const sortOptions = [
  { value: 'createdAt-desc', label: 'Mới tạo' },
  { value: 'updatedAt-desc', label: 'Mới cập nhật' },
  { value: 'code-asc', label: 'Mã địa điểm (A-Z)' },
  { value: 'code-desc', label: 'Mã địa điểm (Z-A)' },
  { value: 'name-asc', label: 'Tên địa điểm (A-Z)' },
  { value: 'name-desc', label: 'Tên địa điểm (Z-A)' },
];

const sortData = (data, key, direction) => {
  return [...data].sort((a, b) => {
    let aValue, bValue;

    // Get values based on key
    switch (key) {
      case 'updatedAt':
      case 'createdAt':
        aValue = new Date(a[key]).getTime();
        bValue = new Date(b[key]).getTime();
        break;

      case 'code':
      case 'name':
        aValue = (a[key] || '').toLowerCase();
        bValue = (b[key] || '').toLowerCase();
        break;

      default:
        aValue = a[key];
        bValue = b[key];
    }

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    // Compare values
    if (aValue < bValue) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === 'asc' ? 1 : -1;
    }

    // If values are equal, sort by code as secondary sort
    if (key !== 'code') {
      const aCode = (a.code || '').toLowerCase();
      const bCode = (b.code || '').toLowerCase();
      return aCode.localeCompare(bCode);
    }

    return 0;
  });
};

const defaultItemPerPage = 10;

export default function LocationDash() {
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [serverValidationErrors, setServerValidationErrors] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemPerPage);

  const {
    status,
    result,
    setResult: setLocations,
  } = useURL(`${domain}/staff/locations`);

  // Move the filtering and sorting logic into useMemo
  const sortedLocations = useMemo(() => {
    let filtered = [];
    if (Array.isArray(result)) {
      filtered = [...result];
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((location) => {
        return (
          location.code?.toLowerCase().includes(searchLower) ||
          location.name?.toLowerCase().includes(searchLower) ||
          location.region?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply sorting
    return sortData(filtered, sortConfig.key, sortConfig.direction);
  }, [result, searchTerm, sortConfig]);

  if (status == 'loading') {
    return <div>Loading...</div>;
  }

  if (status == 'error') {
    console.warn(result);
    return <ErrorPage message={result.message} />;
  }

  const totalItems = sortedLocations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current locations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLocations = sortedLocations.slice(startIndex, endIndex);

  const handleSortChange = (e) => {
    const [key, direction] = e.target.value.split('-');
    setSortConfig({ key, direction });
  };

  const handleViewWeather = (weather) => {
    setSelectedWeather(weather);
    setShowModal(true);
  };

  const handleOpenModal = (location = null) => {
    setSelectedLocation(location);
    setShowLocationModal(true);
    setError('');
    setValidationErrors({});
    setServerValidationErrors({});
  };

  const validateForm = (formData) => {
    const errors = {};
    const regions = ['Bắc Bộ', 'Trung Bộ', 'Nam Bộ'];

    // Code validation
    if (!formData.code) {
      errors.code = 'Mã địa điểm không được để trống';
    } else if (formData.code.trim().length === 0) {
      errors.code = 'Mã địa điểm không hợp lệ';
    }

    // Name validation
    if (!formData.name) {
      errors.name = 'Tên địa điểm không được để trống';
    }

    // Region validation
    if (!formData.region) {
      errors.region = 'Vui lòng chọn khu vực';
    } else if (!regions.includes(formData.region)) {
      errors.region = 'Khu vực không hợp lệ';
    }
    // Coordinates validation
    if (!formData.lat && formData.lat != 0) {
      console.log(formData.lat);
      errors.lat = 'Vĩ độ không được để trống';
    } else if (isNaN(formData.lat) || formData.lat < -90 || formData.lat > 90) {
      errors.lat = 'Vĩ độ phải nằm trong khoảng từ -90 đến 90';
    }

    if (!formData.lon && formData.lon != 0) {
      errors.lon = 'Kinh độ không được để trống';
    } else if (
      isNaN(formData.lon) ||
      formData.lon < -180 ||
      formData.lon > 180
    ) {
      errors.lon = 'Kinh độ phải nằm trong khoảng từ -180 đến 180';
    }

    return errors;
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});
    setServerValidationErrors({});

    const formData = {
      code: e.target.code.value,
      name: e.target.name.value,
      region: e.target.region.value,
      lat: Number(e.target.lat.value || NaN),
      lon: Number(e.target.lon.value || NaN),
    };

    // Client-side validation
    const clientErrors = validateForm(formData);
    if (Object.keys(clientErrors).length > 0) {
      setValidationErrors(clientErrors);
      return;
    }

    try {
      const url = selectedLocation
        ? `${domain}/staff/locations/${selectedLocation._id}`
        : `${domain}/staff/locations`;

      const response = await fetch(url, {
        method: selectedLocation ? 'PUT' : 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status == 400 && data.validationError) {
          setValidationErrors(data.validationError);
        } else {
          throw new Error(data.message || 'Lỗi khi lưu địa điểm');
        }
        return;
      }

      // Refresh locations list
      const updatedLocations = await fetch(`${domain}/staff/locations`, {
        credentials: 'include',
      }).then((res) => res.json());

      setLocations(updatedLocations);
      setShowLocationModal(false);
      setSelectedLocation(null);
    } catch (err) {
      console.error('Location operation error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi lưu địa điểm.');
    }
  };

  const handleDeleteClick = (location) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      html: `Bạn có chắc chắn muốn xóa địa điểm?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', // Bootstrap danger color
      cancelButtonColor: '#6c757d', // Bootstrap secondary color
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${domain}/staff/locations/${location._id}`,
            {
              method: 'DELETE',
              credentials: 'include',
            }
          );

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Lỗi khi xóa địa điểm');
          }

          // Refresh locations list
          const updatedLocations = await fetch(`${domain}/staff/locations`, {
            credentials: 'include',
          }).then((res) => res.json());

          setLocations(updatedLocations);

          // Show success message
          Swal.fire({
            title: 'Đã xóa!',
            text: 'Địa điểm đã được xóa thành công.',
            icon: 'success',
            confirmButtonColor: '#198754', // Bootstrap success color
          });
        } catch (err) {
          console.error('Delete location error:', err);
          Swal.fire({
            title: 'Lỗi!',
            text: err.message || 'Không thể xóa địa điểm.',
            icon: 'error',
            confirmButtonColor: '#dc3545',
          });
        }
      }
    });
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    let newItemsPerPage = parseInt(e.target.value);
    if (isNaN(newItemsPerPage) || newItemsPerPage < 1) {
      newItemsPerPage = defaultItemPerPage;
    }
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý địa điểm</h2>
        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
        >
          <i className="bi bi-plus-square"></i>
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end align-items-center">
            <Form.Select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={handleSortChange}
              style={{ width: 'auto', minWidth: '200px', marginLeft: '10px' }}
            >
              {sortOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-3 text-muted">
        {searchTerm && (
          <span>
            Tìm thấy {sortedLocations.length} địa điểm
            {' cho từ khóa '}
            <strong>&quot;{searchTerm}&quot;</strong>
          </span>
        )}
      </div>

      {/* Table */}
      <div style={{ height: '500px', overflow: 'auto' }}>
        <Table
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Mã địa điểm</th>
              <th>Tên địa điểm</th>
              <th>Vùng</th>
              <th>Vĩ độ</th>
              <th>Kinh độ</th>
              <th>Thời gian tạo</th>
              <th>Cập nhật lúc</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentLocations.length > 0 ? (
              currentLocations.map((location, index) => (
                <tr key={index}>
                  <td>{location.code}</td>
                  <td>{location.name}</td>
                  <td>{location.region}</td>
                  <td>{location.coordinates?.lat}</td>
                  <td>{location.coordinates?.lon}</td>
                  <td>
                    {format(new Date(location.createdAt), 'dd/MM/yyyy, HH:mm', {
                      locale: vi,
                    })}
                  </td>
                  <td>
                    {format(new Date(location.updatedAt), 'dd/MM/yyyy, HH:mm', {
                      locale: vi,
                    })}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewWeather(location.weatherInfo)}
                      >
                        <i className="bi bi-eye"></i>
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleOpenModal(location)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteClick(location)}
                      >
                        <i className="bi bi-trash2"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4"
                >
                  <div className="text-muted">Chưa có địa điểm nào</div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Form.Label
        htmlFor="itemsPerPage"
        className="me-2"
      >
        Số địa điểm trên trang:
      </Form.Label>
      <Form.Control
        type="number"
        id="itemsPerPage"
        // value={itemsPerPage}
        defaultValue={defaultItemPerPage}
        onChange={handleItemsPerPageChange}
        style={{ width: '70px' }}
        min="1"
      />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
        </div>
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="me-2"
          >
            <i className="bi bi-chevron-left"></i>
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i>
          </Button>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Weather Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(selectedWeather, null, 2)}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <LocationFormModal
        show={showLocationModal}
        onHide={() => {
          setShowLocationModal(false);
          setSelectedLocation(null);
        }}
        onSubmit={handleLocationSubmit}
        initialData={
          selectedLocation
            ? {
                code: selectedLocation.code,
                name: selectedLocation.name,
                region: selectedLocation.region,
                coordinates: {
                  lat: selectedLocation.coordinates?.lat || '',
                  lon: selectedLocation.coordinates?.lon || '',
                },
              }
            : undefined
        }
        title={selectedLocation ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm mới'}
        submitText={selectedLocation ? 'Lưu thay đổi' : 'Tạo mới'}
        error={error}
        validationErrors={validationErrors}
        serverValidationErrors={serverValidationErrors}
      />
    </div>
  );
}
