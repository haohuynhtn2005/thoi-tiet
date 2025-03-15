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
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên người dùng</Form.Label>
            <Form.Control type="text" placeholder="Nhập tên" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Nhập email" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Hủy</Button>
        <Button variant="primary" onClick={onSubmit}>{submitText}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDashboardConntent;
