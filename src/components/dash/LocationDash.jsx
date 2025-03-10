import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import ErrorPage from "../../pages/ErrorPage";
import useURL from "../../hooks/useURL";
import { domain } from "../../common/commonVal";

export default function LocationDash() {
  // const [locations, setLocations] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const { status, result, setResult: setLocations } = useURL(`${domain}/manager/getLocations`);

  if (status == 'loading') {
    return <div>Loading...</div>;
  }

  if (status == 'error') {
    console.warn(result);
    return <ErrorPage message={result.message} />;
  }

  const handleViewWeather = (weather) => {
    setSelectedWeather(weather);
    setShowModal(true);
  };
  const locations = result;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Location Dashboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Region</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Updated At</th>
            <th>Weather Info</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={index}>
              <td>{location.code}</td>
              <td>{location.name}</td>
              <td>{location.region}</td>
              <td>{location.coordinates?.lat}</td>
              <td>{location.coordinates?.lon}</td>
              <td>{new Date(location.updatedAt).toLocaleString()}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewWeather(location.weatherInfo)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Weather Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(selectedWeather, null, 2)}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
