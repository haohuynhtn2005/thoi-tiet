import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3000/staff/news';

export default function NewsDashboard() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({
    id: null,
    title: '',
    description: '',
    category: '',
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  const categories = ['Cảnh báo', 'Dự báo', 'Tổng hợp', 'Người dùng'];

  useEffect(() => {
    fetch(API_URL, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setNewsData(data);
      })
      .catch((error) => console.error('Lỗi lấy tin tức:', error));
  }, []);

  // Mở modal với dữ liệu hiện có (nếu chỉnh sửa)
  const openModal = (news = null) => {
    setModalData(
      news
        ? {
            id: news._id,
            title: news.title,
            description: news.description,
            category: news.category,
            image: news.image,
          }
        : { id: null, title: '', description: '', category: '', image: null }
    );
    setShowModal(true);
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  // Xử lý chọn ảnh
  const handleImageChange = (e) => {
    setModalData({ ...modalData, image: e.target.files[0] });
  };

  // Xử lý thêm/sửa tin tức
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', modalData.title);
    formData.append('description', modalData.description);
    formData.append('category', modalData.category);
    if (modalData.image) formData.append('image', modalData.image);

    const method = modalData.id ? 'PUT' : 'POST';
    const url = modalData.id ? `${API_URL}/${modalData.id}` : API_URL;

    const response = await fetch(url, {
      method,
      credentials: 'include',
      body: formData,
    });

    if (response.ok) {
      setShowModal(false);
      fetch(API_URL, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          setNewsData(data);
        })
        .catch((error) => console.error('Lỗi lấy tin tức:', error));
    } else {
      console.error('Lỗi khi lưu tin tức', await response.json());
    }
  };

  // Xử lý xóa tin tức
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tin tức này?')) {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setNewsData(newsData.filter((news) => news._id !== id));
      } else {
        console.error('Lỗi khi xóa tin tức');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Danh sách bài viết</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => openModal()}
      >
        <i className="bi bi-plus-square"></i>
      </button>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Tiêu đề</th>
              <th scope="col">Danh mục</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {newsData.map((news) => (
              <tr key={news._id}>
                <td>
                  <img
                    src={news.imageUrl || 'https://via.placeholder.com/80x50'}
                    alt="Hình ảnh bài viết"
                    width="80"
                    height="50"
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td>{news.title}</td>
                <td>{news.category}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openModal(news)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(news._id)}
                  >
                    <i className="bi bi-trash2"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Bootstrap */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalData.id ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Tiêu đề</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={modalData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={modalData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Danh mục</label>
                    <select
                      className="form-select"
                      name="category"
                      value={modalData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Danh mục</option>
                      {categories.map((cat, index) => (
                        <option
                          key={index}
                          value={cat}
                        >
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ảnh</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                    {modalData.imageUrl && (
                      <img
                        src={modalData.imageUrl}
                        className="img-fluid mt-2"
                        style={{ maxWidth: '100px', borderRadius: '8px' }}
                        alt="Preview"
                      />
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      {modalData.id ? 'Cập nhật' : 'Lưu'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
