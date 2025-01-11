import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Link } from 'react-router-dom';  // Import Link for navigation
import AdminVerticalNavbar from "../components/AdminVerticalNavbar"; // Adjust the path as necessary


function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Facilities"));
        const facilitiesData = querySnapshot.docs.map(doc => ({
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
      {/* Main Content */}
      <div className="row">
        {/* Vertical Navbar */}
        <div className="col-3 bg-light border-end" style={{ minHeight: "100vh" }}>
        <AdminVerticalNavbar userId="USER_ID_HERE" />
        </div>

        <div className="col-9">
          {/* Row 1: Header */}
          <div className="row align-items-center py-3 ms-2">
            <div className="col-6">
              <h1>Faciliteter</h1>
            </div>
            <div className="col-6 text-end">
              <i className="fas fa-bell fa-xl me-3"></i>
            </div>
          </div>

          {/* Row 2: Search, Filters, and Add Button */}
          <div className="row align-items-center py-3 ms-2 me-2">
            <div className="col-4 d-flex align-items-center">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search fa-lg pt-3 pb-3 pe-3 ps-3 custom-rounded"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Søg efter faciliteter..."
                />
              </div>
            </div>
            <div className="col-8 d-flex justify-content-end align-items-center">
              <span className="me-3 fw-bold text-custom-H3">Sorter efter:</span>
              <select className="form-select me-3 custom-rounded fw-bold text-custom-primaryCTA pt-3 pb-3 pe-3 ps-3" style={{ width: "150px" }}>
                <option>Status</option>
                <option>Ledig</option>
                <option>Optaget</option>
              </select>
              <select className="form-select me-3 custom-rounded fw-bold text-custom-primaryCTA pt-3 pb-3 pe-3 ps-3" style={{ width: "150px" }}>
                <option>Type</option>
                <option>Mødelokale</option>
                <option>Taktikrum</option>
                <option>Omklædningsrum</option>
                <option>Cafe</option>
                <option>Køkken</option>
              </select>
                <Link to="/add-room">
                    <button className="btn btn-primary fw-bold custom-rounded text-custom-primaryCTAhvid pt-3 pb-3 pe-3 ps-3">
                        <i className="fas fa-plus me-2"></i>Tilføj nyt lokale
                    </button>
                </Link>

            </div>
          </div>

          {/* Row 3: Table Header */}
          <div className="row py-3 border-bottom bg-white rounded-top ms-3 me-3">
            <div className="col-4">
              <strong className="text-custom-headertekst">Navn</strong>
            </div>
            <div className="col-3">
              <strong className="text-custom-headertekst">Status</strong>
            </div>
            <div className="col-3">
              <strong className="text-custom-headertekst">Type</strong>
            </div>
            <div className="col-1">
              <strong className="text-custom-headertekst">Handling</strong>
            </div>
          </div>

          {/* Rows: Dynamic Data */}
          {facilities.map((facility) => (
            <div className="row py-2 border-bottom bg-white ms-3 me-3" key={facility.id}>
              <div className="col-4 text-custom-headertekst">
                {facility.RoomName}
              </div>
              <div className="col-3 text-custom-headertekst">{facility.Status}</div>
              <div className="col-3 text-custom-headertekst">{facility.Type}</div>
              <div className="col-1 text-custom-headertekst">
                <div className="dropdown">
                  <button
                    className="btn btn-link dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-h fa-xl text-secondary"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item mt-2"><i className="fa-solid fa-circle-info fa-lg me-2 text-secondary"></i>Flere detaljer</button>
                    </li>
                    <li>
                      <button className="dropdown-item mt-2"><i className="fa-solid fa-pencil fa-lg me-2 text-secondary"></i>Ændre</button>
                    </li>
                    <li>
                      <button className="dropdown-item mt-2 mb-2"><i className="fa-solid fa-trash fa-lg me-2 text-secondary"></i>Slet</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FacilitiesPage;
