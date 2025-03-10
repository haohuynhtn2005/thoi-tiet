export default function Overview() {
  return (
    <div className="overflow-auto">
      {/* Main Content */}
      <div className="flex-grow-1">
        <div className="container-fluid p-4">
          <h2 className="mb-4">Admin Dashboard</h2>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-cart3 fs-2 text-primary me-3"></i>
                  <div>
                    <h5>Total Orders</h5>
                    <h3>1,230</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-people fs-2 text-success me-3"></i>
                  <div>
                    <h5>Total Customers</h5>
                    <h3>5,420</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-box-seam fs-2 text-warning me-3"></i>
                  <div>
                    <h5>Total Products</h5>
                    <h3>230</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Orders Table */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Latest Orders</h5>
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                    <td>$120.00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>
                      <span className="badge bg-warning">Pending</span>
                    </td>
                    <td>$75.50</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Alex Johnson</td>
                    <td>
                      <span className="badge bg-danger">Cancelled</span>
                    </td>
                    <td>$45.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Latest Orders</h5>
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                    <td>$120.00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>
                      <span className="badge bg-warning">Pending</span>
                    </td>
                    <td>$75.50</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Alex Johnson</td>
                    <td>
                      <span className="badge bg-danger">Cancelled</span>
                    </td>
                    <td>$45.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Latest Orders</h5>
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                    <td>$120.00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>
                      <span className="badge bg-warning">Pending</span>
                    </td>
                    <td>$75.50</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Alex Johnson</td>
                    <td>
                      <span className="badge bg-danger">Cancelled</span>
                    </td>
                    <td>$45.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
