import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useURL from '../../hooks/useURL';
import { domain } from '../../common/commonVal';
import { Link } from 'react-router-dom';

const categories = ['Cảnh báo', 'Dự báo', 'Tổng hợp', 'Người dùng'];

export default function RecentNews() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { status, result } = useURL(`${domain}/news?limit=10`);

  if (status == 'loading') {
    return <div>Loading...</div>;
  }

  if (status == 'error') {
    console.warn(result);
    return result.message;
  }
  const articles = result;

  let filteredArticles = null;
  if (selectedCategory) {
    filteredArticles = articles.filter(
      (article) => article.category == selectedCategory
    );
  } else {
    filteredArticles = articles;
  }

  return (
    <div>
      <h3>Tin tức</h3>

      {/* Thanh danh mục ngang */}
      <ul className="nav nav-pills">
        <li className="nav-item">
          <button
            className={`nav-link ${!selectedCategory && 'active'}`}
            onClick={() => setSelectedCategory(null)}
          >
            Tất cả
          </button>
        </li>
        {categories.map((cat) => (
          <li
            className="nav-item"
            key={cat}
          >
            <button
              className={`nav-link ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* Danh sách bài viết */}
      <div className="container-fluid">
        <div className="row">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Link
                to={`/tin-tuc/${article.id}`}
                key={article.id}
                className="col-12 my-2 text-decoration-none"
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
                      style={{ maxHeight: '3em' }}
                    >
                      {article.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center">Không có tin tức nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}
