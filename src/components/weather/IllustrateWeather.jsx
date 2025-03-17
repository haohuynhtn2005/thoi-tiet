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
              className="p-3 text-center"
              style={{ height: 300 }}
            >
              <h5 style={{fontSize: 40}} >Nhiệt độ</h5>
              <div className="d-flex justify-content-center">

              <img
                src={`/assets/icon/feel.svg`}
                style={{ width: 300 }}
                alt=""
              />
              </div>
              <h2  >29°</h2>
             
            </Card>
          </Col>

          {/* Cảm giác */}
          <Col
            style={{ height: 300 }}
          >
            <Card
              className="p-3 text-center"
              style={{ height: 300 }}
            >
              <h5 style={{fontSize: 40}}>Cảm giác</h5>
                            <div className="d-flex justify-content-center">

              <img
                src={`/assets/icon/temp.svg`}
                style={{ width: 300 }}
                alt=""
              />
</div>
              <h2>30°</h2>
            </Card>
          </Col>

          {/* Mây che phủ */}
          <Col>
            <Card
              className="p-3 text-center"
              style={{ height: 300 }}
            >
              <h5 style={{fontSize: 40}}>Mây che phủ</h5>
              <div className="d-flex justify-content-center">
              <img
                src={`/assets/icon/cloud.svg`}
                style={{ width: 150, height: 150 }}
                alt=""
              />
              </div>
            

              <h2>Hầu như nhiều</h2>
            </Card>
          </Col>

          {/* Lượng mưa */}
          <Col>
            <Card
              className="p-3 text-center"
              style={{ height: 300 }}
            >
              <h5 style={{fontSize: 40}}>Lượng mưa</h5>
              <div className="d-flex justify-content-center">
              <img
                src={`/assets/icon/pressure.svg`}
                style={{ width: 200 }}
                alt=""
              />
              </div>
          

              <h2>0 cm</h2>
            </Card>
          </Col>

          {/* Gió */}
          <Col>
            <Card
              className="p-3 text-center"
              style={{ height: 300 }}
            >
              <h5 style={{fontSize: 40}}>Gió</h5>
              <div className="d-flex justify-content-center">
              <img
                src={`/assets/icon/wind.svg`}
                style={{ width: 150 }}
                alt=""
              />
              </div>
          

              <h2>9 km/h</h2>
            </Card>
          </Col>

          {/* Độ ẩm */}
          <Col>
            <Card
              className="p-3 text-center"
              style={{ height: 300 }}
            >
              <h5 style={{fontSize: 40}}>Độ ẩm</h5>
              <div className="d-flex justify-content-center">
              <img
                src={`/assets/icon/phase.svg`}
                style={{ width: 150 }}
                alt=""
              />
              </div>
             

              <h2>71%</h2>
              <ProgressBar
                now={71}
                label="71%"
              />
            </Card>
          </Col>

          {/* UV*/}
          <Col>
            <Card
              className="p-3 text-center"
              style={{ height: 300 }}
            >
              <h5 style={{fontSize: 40}} >UV</h5>
              <div className="d-flex justify-content-center">
              <img
                src={`/assets/icon/uv.svg`}
                style={{ width: 150 }}
                alt=""
              />
              </div>
              

              <h2>10</h2>
            </Card>
          </Col>

          {/* Tầm nhìn */}
          <Col>
            <Card
              className="p-3 text-center justify-content-center"
              style={{ height: 300 }}
            >
              <h5 style={{fontSize: 40}} >Tầm nhìn</h5>
              <div className="d-flex justify-content-center">
      <img src={`/assets/icon/visibility.svg`} style={{ width: 150 }} alt="" />
    </div>

              <h2>10km</h2>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
