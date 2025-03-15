import React, { useState, useEffect, useContext } from 'react';
import { ModeContext } from '../../providers/AppProvider.jsx';

import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';

export default function IllustrateWeather() {
  const { mode } = useContext(ModeContext);

  return (
    <div>
      <h3>Chi tiết thời tiết</h3>

      <Container fluid>
        <Row className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
          {/* Nhiệt độ */}
          <Col>
            <Card
              className="p-3"
              style={{ height: 300 }}
            >
              <h5>Nhiệt độ</h5>
              <img
                src={`/assets/icon/feel.svg`}
                style={{ width: 300 }}
                alt=""
              />
              <h2>29°</h2>
              <p>
                Giảm với mức thấp nhất là 28° lúc 23:00. Dự kiến ngày mai cũng
                giống hôm nay.
              </p>
            </Card>
          </Col>

          {/* Cảm giác */}
          <Col
            style={{ height: 300 }}
          >
            <Card
              className="p-3"
              style={{ height: 300 }}
            >
              <h5>Cảm giác</h5>
              <img
                src={`/assets/icon/temp.svg`}
                style={{ width: 300 }}
                alt=""
              />

              <h2>30°</h2>
              <p>Hơi ẩm 🌫️ - Cảm thấy ấm hơn nhiệt độ thực tế.</p>
            </Card>
          </Col>

          {/* Mây che phủ */}
          <Col>
            <Card
              className="p-3"
              style={{ height: 300 }}
            >
              <h5>Mây che phủ</h5>
              <img
                src={`/assets/icon/cloud.svg`}
                style={{ width: 150, height: 150 }}
                alt=""
              />

              <h2>Hầu như nhiều</h2>
              <p>61% - Dự kiến ngày mai sẽ có nhiều mây hơn.</p>
            </Card>
          </Col>

          {/* Lượng mưa */}
          <Col>
            <Card
              className="p-3"
              style={{ height: 300 }}
            >
              <h5>Lượng mưa</h5>
              <img
                src={`/assets/icon/pressure.svg`}
                style={{ width: 200 }}
                alt=""
              />

              <h2>0 cm</h2>
              <p>Không có mưa trong 24 giờ tới ☀️.</p>
            </Card>
          </Col>

          {/* Gió */}
          <Col>
            <Card
              className="p-3"
              style={{ height: 300 }}
            >
              <h5>Gió</h5>
              <img
                src={`/assets/icon/wind.svg`}
                style={{ width: 150 }}
                alt=""
              />

              <h2>9 km/h</h2>
              <p>Từ hướng Nam (170°) - Cơn giật mạnh 29 km/h.</p>
            </Card>
          </Col>

          {/* Độ ẩm */}
          <Col>
            <Card
              className="p-3"
              style={{ height: 300 }}
            >
              <h5>Độ ẩm</h5>
              <img
                src={`/assets/icon/phase.svg`}
                style={{ width: 150 }}
                alt=""
              />

              <h2>71%</h2>
              <p>Rất ẩm ướt 🌧️ - Điểm sương: 23°.</p>
              <ProgressBar
                now={71}
                label="71%"
              />
            </Card>
          </Col>

          {/* UV*/}
          <Col>
            <Card
              className="p-3"
              style={{ height: 300 }}
            >
              <h5>UV</h5>
              <img
                src={`/assets/icon/uv.svg`}
                style={{ width: 150 }}
                alt=""
              />

              <h2>10</h2>
              <p>Tia UV mạnh ảnh hưởng đến sức khỏe.</p>
            </Card>
          </Col>

          {/* Tầm nhìn */}
          <Col>
            <Card
              className="p-3"
              style={{ height: 300 }}
            >
              <h5>Tầm nhìn</h5>
              <img
                src={`/assets/icon/visibility.svg`}
                style={{ width: 150 }}
                alt=""
              />

              <h2>10km</h2>
              <p>Tầm nhìn ngày mai dự kiến tương tự như hôm nay</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
