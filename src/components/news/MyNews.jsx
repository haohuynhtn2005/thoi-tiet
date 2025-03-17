import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { domain } from '../../common/commonVal';
import { DarkModeContext } from '../../providers/AppProvider';

export default function MyNews() {
  const { darkMode } = useContext(DarkModeContext);
  const {
    loading,
    result: news,
    error,
    reFetch,
  } = useFetch(`${domain}/my-news`);
  const [editingNews, setEditingNews] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: null,
    });
    setEditingNews(null);
  };

  const handleEdit = (item) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news item?'))
      return;

    try {
      const response = await fetch(`${domain}/my-news/${id}`, {
        credentials: 'include',
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('News deleted successfully');
        reFetch();
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    const url = editingNews
      ? `${domain}/my-news/${editingNews.id}`
      : `${domain}/my-news`;

    try {
      const response = await fetch(url, {
        credentials: 'include',
        method: editingNews ? 'PUT' : 'POST',
        body: data,
      });

      if (response.ok) {
        console.log(
          editingNews
            ? 'News updated successfully'
            : 'News uploaded successfully'
        );
        resetForm();
        reFetch();
        // Close modal
        document.querySelector('[data-bs-dismiss="modal"]').click();
      } else {
        console.error(editingNews ? 'Update failed' : 'Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(/assets/background/${
          darkMode ? 'bg-dark' : 'bg-light'
        }.jpg)`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <h3>Bài đã đăng</h3>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#newsModal"
        onClick={resetForm}
      >
        Add News
      </button>

      <div className="row">
        {news.map((item) => (
          <div
            className="card mt-3 p-2"
            key={item.id}
          >
            <img
              src={item.imageUrl}
              width={100}
              height={50}
              className="object-fit-cover"
              alt="News"
            />
            <h4>{item.title}</h4>
            <div>Thể loại: {item.category}</div>
            <div>Ngày đăng: {item.createdAt}</div>
            <div
              className="overflow-hidden"
              style={{ maxHeight: '100px' }}
            >
              {item.description?.split('<br/>').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
            <div className="mt-2">
              <button
                className="btn btn-warning me-2"
                data-bs-toggle="modal"
                data-bs-target="#newsModal"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="newsModal"
        tabIndex="-1"
        aria-labelledby="newsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="newsModalLabel"
              >
                {editingNews ? 'Edit News' : 'Add News'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div> */}
                <div className="mb-3">
                  <label className="form-label">
                    Image {editingNews && '(Leave empty to keep existing)'}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!editingNews}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingNews ? 'Update' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
