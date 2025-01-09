import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

function RoomsAndCafePage() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Facilities"));
        const facilitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFacilities(facilitiesData);
      } catch (error) {
        console.error("Error fetching facilities: ", error);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div className="container-fluid pe-3">
      <div className="row">
        {/* Vertical Navbar */}
        <div className="col-3 bg-light border-end" style={{ minHeight: "100vh" }}>
          {/* Add Navbar Content */}
        </div>

        <div className="col-9">
          {/* Row 1: Header and Search */}
          <div className="row align-items-center py-3 ms-2">
            <div className="col-6">
              <h1>Lokaler & cafe</h1>
            </div>
            <div className="col-6 text-end">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Søg..."
                />
              </div>
              <i className="fas fa-bell fa-xl ms-3"></i>
            </div>
          </div>

          {/* Row 2: Filters */}
          <div className="row align-items-center py-3 ms-2 me-2">
            <div className="col-5"></div>
            <div className="col-7 d-flex justify-content-end align-items-center">
              <span className="me-3 fw-bold text-custom-H3">Sorter efter:</span>
              <select
                className="form-select me-3 custom-rounded fw-bold pt-3 pb-3"
                style={{ width: "150px" }}
              >
                <option>Status</option>
                <option>Ledig</option>
                <option>Optaget</option>
              </select>
              <select
                className="form-select custom-rounded fw-bold pt-3 pb-3"
                style={{ width: "150px" }}
              >
                <option>Type</option>
                <option>Mødelokale</option>
                <option>Taktiklokale</option>
                <option>Cafe</option>
              </select>
            </div>
          </div>

          {/* Dynamic Rows for Facilities */}
          {facilities.map((facility) => (
            <div
              className="row py-3 border-bottom bg-white rounded ms-3 me-3 align-items-center"
              key={facility.id}
            >
              <div className="col-3">
                <img
                  src={`./images/${facility.image}`}
                  alt={facility.RoomName}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6">
                <h5>{facility.RoomName}</h5>
                <p className="mb-2">{facility.Description}</p>
                <p>
                  <strong>Status:</strong> {facility.Status}
                </p>
              </div>
              <div className="col-3 d-flex align-items-end justify-content-center">
                <button className="btn btn-primary custom-rounded">
                  <i className="fas fa-calendar me-2"></i>Reserver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomsAndCafePage;

