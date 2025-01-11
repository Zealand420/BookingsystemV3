import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import UserVerticalNavbar from "../components/UserVerticalNavbar";

function FitnessRoomPage() {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const facilitiesQuery = query(
          collection(db, "Facilities"),
          where("Type", "==", "Fitnessrum")
        );

        const querySnapshot = await getDocs(facilitiesQuery);
        const facilitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFacilities(facilitiesData);
        setFilteredFacilities(facilitiesData);
      } catch (error) {
        console.error("Error fetching facilities: ", error);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    let filtered = facilities;

    if (statusFilter !== "All") {
      filtered = filtered.filter((facility) => facility.Status === statusFilter);
    }

    setFilteredFacilities(filtered);
  }, [statusFilter, facilities]);

  const handleReserveClick = (roomId) => {
    navigate(`/calendar/${roomId}`);
  };

  return (
    <div className="container-fluid pe-3">
      <div className="row">
        <div className="col-3 bg-light border-end" style={{ minHeight: "100vh" }}>
          <UserVerticalNavbar userId="USER_ID_HERE" />
        </div>

        <div className="col-9">
          <div className="row align-items-center py-3 ms-2">
            <div className="col-8">
              <h1>Fitnessrum</h1>
            </div>
            <div className="col-4 text-end">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Søg..."
                />
                <i className="fas fa-bell fa-xl ms-3 mt-3"></i>
              </div>
            </div>
          </div>

          <div className="row align-items-center py-3 ms-2 me-2">
            <div className="col-5"></div>
            <div className="col-7 d-flex justify-content-end align-items-center">
              <span className="me-3 fw-bold text-custom-H3">Sorter efter:</span>
              <select
                className="form-select me-3 custom-rounded fw-bold pt-3 pb-3"
                style={{ width: "150px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Status</option>
                <option value="Ledig">Ledig</option>
                <option value="Optaget">Optaget</option>
              </select>
            </div>
          </div>

          {filteredFacilities.map((facility) => (
            <div
              className="row py-3 border-bottom bg-white custom-rounded ms-3 me-3 mt-3"
              key={facility.id}
            >
              <div className="col-3">
                <img
                  src="/images/kontorfodbold.jpg"
                  alt={facility.RoomName}
                  className="full-container-image"
                />
              </div>

              <div className="col-6 d-flex flex-column justify-content-between" style={{ minHeight: "150px" }}>
                <div>
                  <h2 className="text-custom-H2 fw-bold">{facility.RoomName}</h2>
                  <p className="mb-2 text-custom-primary">{facility.Description}</p>
                </div>

                <div>
                  <p className="statusoversigt text-custom-primary fw-bold">
                    <strong>Status:</strong>
                    <span
                      className={`ms-2 ${
                        facility.Status === "Ledig" ? "text-status-ledigt" : "text-status-optaget"
                      }`}
                    >
                      {facility.Status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="col-3 d-flex justify-content-end align-self-end">
                <button
                  className="btn btn-primary custom-rounded pe-5 ps-5 pt-3 pb-3 text-custom-primaryCTAhvidstor fw-bold"
                  onClick={() => handleReserveClick(facility.id)}
                >
                  <i className="fas fa-calendar me-2 me-3"></i>Reserver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FitnessRoomPage;
