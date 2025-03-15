import { Card, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { domain } from '../../common/commonVal';
import useURL from '../../hooks/useURL';
import ErrorPage from '../../pages/ErrorPage';

export default function Overview() {
  const { status, result } = useURL(`${domain}/staff/overview`);

  if (status == 'loading') {
    return <div>Loading...</div>;
  }

  if (status == 'error') {
    console.warn(result);
    return <ErrorPage message={result.message} />;
  }

  const {
    userCount,
    staffCount,
    newsCount,
    locationCount,
    latestLocations,
    latestNews,
  } = result;

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy, HH:mm', { locale: vi });
  };

  return (
    <div className="overflow-auto">
      <div className="flex-grow-1">
        <div className="container-fluid p-4">
          <h2 className="mb-4">Tổng quan</h2>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <Card className="shadow-sm overflow-hidden">
                <Card.Body className="d-flex align-items-center text-bg-primary">
                  <i className="bi bi-people fs-2 me-3"></i>
                  <div>
                    <h5>Tổng số người dùng</h5>
                    <h3>{userCount}</h3>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="shadow-sm overflow-hidden">
                <Card.Body className="d-flex align-items-center text-bg-success">
                  <i className="bi bi-person-gear fs-2 me-3"></i>
                  <div>
                    <h5>Tổng số nhân viên</h5>
                    <h3>{staffCount}</h3>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="shadow-sm overflow-hidden">
                <Card.Body className="d-flex align-items-center text-bg-warning">
                  <i className="bi bi-newspaper fs-2 me-3"></i>
                  <div>
                    <h5>Tổng số tin tức</h5>
                    <h3>{newsCount}</h3>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="shadow-sm overflow-hidden">
                <Card.Body className="d-flex align-items-center text-bg-info">
                  <i className="bi bi-geo-alt fs-2 me-3"></i>
                  <div>
                    <h5>Tổng số địa điểm</h5>
                    <h3>{locationCount}</h3>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Latest Updated Locations */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5 className="card-title">Địa điểm cập nhật gần đây</h5>
              <Table
                striped
                bordered
                hover
              >
                <thead className="table-primary">
                  <tr>
                    <th>Mã địa điểm</th>
                    <th>Tên địa điểm</th>
                    <th>Khu vực</th>
                    <th>Cập nhật lúc</th>
                  </tr>
                </thead>
                <tbody>
                  {latestLocations.map((location) => (
                    <tr key={location._id}>
                      <td>{location.code}</td>
                      <td>{location.name}</td>
                      <td>{location.region}</td>
                      <td>{formatDate(location.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Latest Created News */}
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="card-title">Tin tức mới tạo gần đây</h5>
              <Table
                striped
                bordered
                hover
              >
                <thead className="table-success">
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {latestNews.map((newsItem) => (
                    <tr key={newsItem._id}>
                      <td>{newsItem.title}</td>
                      <td>{formatDate(newsItem.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
