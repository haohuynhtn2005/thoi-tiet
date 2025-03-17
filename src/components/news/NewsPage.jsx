import { useEffect, useState, useMemo, useContext } from 'react';
import { DarkModeContext } from '../../providers/AppProvider';
import { Link } from 'react-router-dom';
import { domain } from '../../common/commonVal';

const categories = ['Cảnh báo', 'Dự báo', 'Tổng hợp', 'Người dùng'];

export default function NewsCategories() {
  const { darkMode } = useContext(DarkModeContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // sort
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const articlesPerPage = 6;

  useEffect(() => {
    fetch(`${domain}/news`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const filteredArticles = useMemo(() => {
    let filtered = null;
    if (selectedCategory) {
      filtered = articles.filter(
        (article) => article.category === selectedCategory
      );
    } else {
      filtered = articles;
    }
    // sắp xếp theo ngày

    return filtered.sort((a, b) => {
      return sortOrder === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [articles, selectedCategory, sortOrder]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

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
      <h1 className="py-3 text-center">Tin tức</h1>

      {/* Thanh danh mục ngang */}
      <ul className="nav nav-pills d-flex pb-2 mb-3">
        <li className="nav-item mx-2">
          <button
            className={`nav-link border-0 bg-transparent ${
              !selectedCategory
                ? 'fw-bold border-bottom border-3 rounded-0'
                : ''
            }`}
            onClick={() => setSelectedCategory('')}
          >
            Tất cả
          </button>
        </li>
        {categories.map((cat) => (
          <li
            className="nav-item mx-2"
            key={cat}
          >
            <button
              className={`nav-link border-0 bg-transparent text-secondary ${
                selectedCategory == cat
                  ? 'fw-bold border-bottom border-3 rounded-0'
                  : ''
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* Nút sắp xếp */}
      <div
        className="d-flex align-items-center mb-3"
        style={{ width: 300 }}
      >
        <label
          htmlFor="sort"
          className="me-2"
        >
          Sắp xếp theo:{' '}
        </label>
        <select
          name="sort"
          id="sort"
          className="form-select w-50"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Mới nhất</option>
          <option value="asc">Cũ nhất</option>
        </select>
      </div>

      {/* Danh sách bài viết */}
      <div className="row g-2">
        {filteredArticles.length > 0 ? (
          currentArticles.map((article) => (
            <Link
              to={article.id}
              key={article.id}
              className="col-lg-4 col-md-6 col-12 text-decoration-none"
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="card-img-top rounded-top"
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{article.title}</h5>
                  <p
                    className="card-text text-muted overflow-hidden"
                    style={{ height: '50px' }}
                  >
                    {article.description}
                  </p>
                  <p className="card-text text-muted">{article.createdAt}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">Không có bài báo nào.</p>
        )}
      </div>

      {/* Pagination */}
      <nav className="py-3">
        <ul className="pagination justify-content-center m-0">
          {[...Array(totalPages).keys()].map((num) => (
            <li
              key={num + 1}
              className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
