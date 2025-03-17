import styles from '../../styles/layout.module.css';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DarkModeContext, UserContext } from '../../providers/AppProvider';
import { format } from 'date-fns';
import { domain } from '../../common/commonVal';
import useFetch from '../../hooks/useFetch';

export default function ShowNews() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const {
    loading,
    error,
    result: news,
    reFetch,
  } = useFetch(`${domain}/news/${id}`, []);

  if (loading) return 'loading';

  if (error) return error.message;

  const handelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      newsId: formData.get('newsId'),
      content: formData.get('content'),
    };
    fetch(`${domain}/comment`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        reFetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={styles.mainLayout}
      style={{
        backgroundImage: `url(/assets/background/${
          darkMode ? 'bg-dark' : 'bg-light'
        }.jpg)`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <div className="p-2 bg-body-tertiary bg-opacity-50">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="card-img-top rounded-top object-fit-cover"
          style={{ width: '100%', maxHeight: '500px' }}
        />
        <h1>{news.title}</h1>
        <p>
          <b>Tác giả: {news.author?.name}</b>
        </p>
        <p>
          <b>
            Ngày đăng: {format(new Date(news.createdAt), 'HH:mm dd/MM/yyyy')}
          </b>
        </p>
        {news.description?.split('<br/>').map((para, idx) => {
          return <p key={idx}>{para}</p>;
        })}
      </div>
      <div className="p-2">
        <h2>Bình luận</h2>
        <form
          action=""
          method="post"
          onSubmit={handelSubmit}
        >
          <input
            type="hidden"
            name="newsId"
            value={news.id}
          />
          <textarea
            name="content"
            id=""
            className="form-control mb-3 bg-body-tertiary bg-opacity-50"
            rows="3"
            placeholder="Nhập bình luận....."
            defaultValue={
              news.comments?.find((comment) => comment.user?.id == user?.id)
                ?.content
            }
          ></textarea>
          <button className="btn btn-success text-center">Oke</button>
        </form>
        {news.comments
          ?.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          })
          ?.map((comment, idx) => {
            return (
              <div
                key={idx}
                className="card mt-2 bg-body-tertiary bg-opacity-50"
              >
                <div className="card-body">
                  <h6 className="card-title">
                    {comment.user?.name} |{' '}
                    {format(new Date(comment.updatedAt), 'HH:mm dd/MM/yyyy')}
                  </h6>
                  <div className="card-text">
                    {comment.content?.split('\n').map((con, idx) => (
                      <div key={idx}>{con}</div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
