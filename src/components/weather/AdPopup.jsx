import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdPopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  // useEffect(() => {
  //   setShowPopup(true); // Mở quảng cáo khi load trang
  // }, []);

  return (
    <>
      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
          <div
            className="bg-white rounded shadow-lg text-center border border-danger"
            style={{
              maxWidth: "1000px",
              background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
            }}
          > 
            <a
            href="https://dienmaycholon.com/"
            >
            <img src="/assets/img/ads/ads.webp" alt="" className="rounded-1"/>
            </a>
            <button
              className="btn btn-danger position-absolute top-0 end-0 fw-bold px-4"
              onClick={() => setShowPopup(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdPopup;
