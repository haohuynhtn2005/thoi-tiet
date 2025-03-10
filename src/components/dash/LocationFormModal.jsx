import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const regions = ['Bắc Bộ', 'Trung Bộ', 'Nam Bộ'];

export default function LocationFormModal({ 
  show, 
  onHide, 
  onSubmit, 
  initialData = {
    code: '',
    name: '',
    region: '',
    coordinates: {
      lat: '',
      lon: '',
    }
  },
  title,
  submitText,
  error,
  validationErrors = {},
  serverValidationErrors = {}
}) {

  return (
    <Modal show={show} onHide={onHide}>
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
          <Form.Group className="mb-3">
            <Form.Label>Mã địa điểm</Form.Label>
            <Form.Control
              type="text"
              name="code"
              defaultValue={initialData.code}
              isInvalid={!!validationErrors.code || !!serverValidationErrors.code}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.code || serverValidationErrors.code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tên địa điểm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              defaultValue={initialData.name}
              isInvalid={!!validationErrors.name || !!serverValidationErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.name || serverValidationErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Khu vực</Form.Label>
            <Form.Select
              name="region"
              defaultValue={initialData.region}
              isInvalid={!!validationErrors.region || !!serverValidationErrors.region}
            >
              <option value="">Chọn khu vực</option>
              {regions.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {validationErrors.region || serverValidationErrors.region}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vĩ độ</Form.Label>
            <Form.Control
              type="number"
              step="any"
              name="lat"
              defaultValue={initialData.coordinates.lat}
              isInvalid={!!validationErrors.lat || !!serverValidationErrors['coordinates.lat']}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.lat || serverValidationErrors['coordinates.lat']}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kinh độ</Form.Label>
            <Form.Control
              type="number"
              step="any"
              name="lon"
              defaultValue={initialData.coordinates.lon}
              isInvalid={!!validationErrors.lon || !!serverValidationErrors['coordinates.lon']}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.lon || serverValidationErrors['coordinates.lon']}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {submitText}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

LocationFormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    region: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  title: PropTypes.string,
  submitText: PropTypes.string,
  error: PropTypes.string,
  validationErrors: PropTypes.object,
  serverValidationErrors: PropTypes.object,
};