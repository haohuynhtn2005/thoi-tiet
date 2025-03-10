import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  { id: 'forecast', name: 'Dự báo' },
  { id: 'warning', name: 'Cảnh báo' },
  { id: 'tips', name: 'Mẹo thời tiết' },
  { id: 'climate', name: 'Khí hậu' },
  { id: 'disaster', name: 'Thiên tai' },
];

const articles = [
  {
    id: 1,
    category: 'forecast',
    title: 'Dự báo thời tiết tuần tới',
    description: 'Nhiệt độ trung bình sẽ tăng nhẹ...',
    image: '/assets/img/news/du-bao-thoi-tiet.jpg',
    link: 'https://edition.cnn.com/2025/03/10/china/two-sessions-china-key-takeaways-intl-hnk/index.html',
  },
  {
    id: 2,
    category: 'forecast',
    title: 'Không khí lạnh sắp về miền Bắc',
    description: 'Nhiệt độ giảm mạnh, trời trở rét...',
    image: '/assets/img/news/thoi-tiet-lanh.jpg',
    link: 'https://edition.cnn.com/2025/03/10/china/two-sessions-china-key-takeaways-intl-hnk/index.html',
  },
  {
    id: 3,
    category: 'forecast',
    title: 'Miền Trung có mưa lớn kéo dài',
    description: 'Mưa sẽ tiếp diễn trong nhiều ngày tới...',
    image: '/assets/img/news/mua-lon.jpg',
    link: 'https://edition.cnn.com/2025/03/10/china/two-sessions-china-key-takeaways-intl-hnk/index.html',
  },

  {
    id: 4,
    category: 'warning',
    title: 'Bão số 5 sắp vào miền Trung',
    description: 'Cơn bão mạnh đang tiến gần bờ...',
    image: '/assets/img/news/bao-mien-trung.jpg',
    link: 'https://edition.cnn.com/2025/03/10/china/two-sessions-china-key-takeaways-intl-hnk/index.html',
  },
  {
    id: 5,
    category: 'warning',
    title: 'Cảnh báo lũ quét ở vùng núi',
    description: 'Nguy cơ sạt lở đất rất cao do mưa lớn...',
    image: '/assets/img/news/lu-quet.jpg',
    link: 'https://edition.cnn.com/2025/03/10/china/two-sessions-china-key-takeaways-intl-hnk/index.html',
  },
  {
    id: 6,
    category: 'warning',
    title: 'Nắng nóng gay gắt tại miền Nam',
    description: 'Nhiệt độ có thể lên đến 40 độ C...',
    image: '/assets/img/news/nang-nong.jpg',
    link: 'https://edition.cnn.com/2025/03/10/china/two-sessions-china-key-takeaways-intl-hnk/index.html',
  },

  {
    id: 7,
    category: 'tips',
    title: 'Cách tránh sốc nhiệt mùa hè',
    description: 'Để bảo vệ sức khỏe, bạn nên...',
    image: '/assets/img/news/cach-tranh-soc-nhiet.jpg',
  },
  {
    id: 8,
    category: 'tips',
    title: 'Làm gì khi gặp sấm sét?',
    description: 'Tránh xa các vật kim loại và trú ẩn an toàn...',
    image: '/assets/img/news/sam-set.jpg',
  },
  {
    id: 9,
    category: 'tips',
    title: 'Mẹo giúp nhà luôn mát mẻ',
    description: 'Dùng rèm cửa và cây xanh để giảm nhiệt...',
    image: '/assets/img/news/nha-mat-me.jpg',
  },

  {
    id: 10,
    category: 'climate',
    title: 'Biến đổi khí hậu ảnh hưởng ra sao?',
    description: 'Mức CO2 trong không khí tăng cao...',
    image: '/assets/img/news/bien-doi-khi-hau.jpg',
  },
  {
    id: 11,
    category: 'climate',
    title: 'Hiệu ứng nhà kính ngày càng nghiêm trọng',
    description: 'Nhiệt độ toàn cầu đang tăng nhanh...',
    image: '/assets/img/news/hieu-ung-nha-kinh.jpg',
  },
  {
    id: 12,
    category: 'climate',
    title: 'Băng tan nhanh ở Bắc Cực',
    description: 'Các dòng sông băng đang biến mất nhanh chóng...',
    image: '/assets/img/news/bang-tan.jpg',
  },

  {
    id: 13,
    category: 'disaster',
    title: 'Động đất mạnh tại Nhật Bản',
    description: 'Trận động đất 7.2 độ richter...',
    image: '/assets/img/news/dong-dat-nhat-ban.jpg',
  },
  {
    id: 14,
    category: 'disaster',
    title: 'Sạt lở đất nghiêm trọng ở miền núi',
    description: 'Mưa lớn kéo dài gây sạt lở nghiêm trọng...',
    image: '/assets/img/news/sat-lo.jpg',
  },
  {
    id: 15,
    category: 'disaster',
    title: 'Núi lửa phun trào tại Hawaii',
    description: 'Dung nham đang lan rộng, người dân cần sơ tán...',
    image: '/assets/img/news/nui-lua-hawaii.jpg',
  },
];

export default function NewsCategories() {
  const [selectedCategory, setSelectedCategory] = useState('forecast');

  const filteredArticles = articles.filter(
    (article) => article.category === selectedCategory
  );

  return (
    <div>
      <h2 className="mb-4">Tin tức</h2>

      {/* Thanh danh mục ngang */}
      <ul className="nav nav-pills">
        {categories.map((cat) => (
          <li
            className="nav-item"
            key={cat.id}
          >
            <button
              className={`nav-link ${
                selectedCategory === cat.id ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Danh sách bài viết */}
      <div className="container-fluid">
        <div className="row">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <a
                href={article.link}
                key={article.id}
                className="col-12 my-2 text-decoration-none"
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={article.image}
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
                    <p className="card-text text-muted">
                      {article.description}
                    </p>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p className="text-center">Không có bài báo nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}
