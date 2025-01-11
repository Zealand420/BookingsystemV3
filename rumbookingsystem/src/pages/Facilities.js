import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom"; // Import Link for navigation
import AdminVerticalNavbar from "../components/AdminVerticalNavbar"; // Adjust the path as necessary
import FacilityDetailsModal from "../components/FacilityDetailsModal"; // Import the modal component

function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]); // State for filtered facilities
  const [selectedStatus, setSelectedStatus] = useState(""); // Filter for status
  const [selectedType, setSelectedType] = useState(""); // Filter for type
  const [selectedFacility, setSelectedFacility] = useState(null); // State for selected facility
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetching facilities data from Firestore
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Facilities"));
        const facilitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFacilities(facilitiesData);
        setFilteredFacilities(facilitiesData); // Initially show all facilities
      } catch (error) {
        console.error("Error fetching facilities: ", error);
      }
    };

    fetchFacilities();
  }, []);

  // Apply filtering whenever the status or type filter is changed
  useEffect(() => {
    const filtered = facilities.filter((facility) => {
      const matchesStatus = selectedStatus ? facility.Status === selectedStatus : true;
      const matchesType = selectedType ? facility.Type === selectedType : true;
      return matchesStatus && matchesType;
    });
    setFilteredFacilities(filtered);
  }, [selectedStatus, selectedType, facilities]);

  // Handle modal opening
  const handleShowModal = (facility) => {
    setSelectedFacility(facility); // Set the selected facility
    setIsModalOpen(true); // Open the modal
  };

  // Handle modal closing
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Handle facility deletion
  const handleDelete = async (id) => {
    // Confirm deletion before proceeding
    if (window.confirm("Er du sikker på, at du vil slette dette lokale?")) {
      try {
        // Delete the facility from Firestore
        await deleteDoc(doc(db, "Facilities", id));
        // Update the facilities state to remove the deleted facility
        setFacilities((prevFacilities) =>
          prevFacilities.filter((facility) => facility.id !== id)
        );
        alert("Lokalet blev slettet.");
      } catch (error) {
        console.error("Error deleting facility: ", error);
        alert("Noget gik galt. Prøv igen.");
      }
    }
  };

  return (
    <div className="container-fluid pe-3">
      <div className="row">
        {/* Vertical Navbar */}
        <div className="col-3 bg-light border-end" style={{ minHeight: "100vh" }}>
          <AdminVerticalNavbar userId="USER_ID_HERE" />
        </div>

        <div className="col-9">
          {/* Header */}
          <div className="row align-items-center py-3 ms-2">
            <div className="col-6">
              <h1>Faciliteter</h1>
            </div>
            <div className="col-6 text-end">
              <i className="fas fa-bell fa-xl me-3"></i>
            </div>
          </div>

          {/* Filters Row */}
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

              {/* Filter by Status */}
              <select
                className="form-select me-3 custom-rounded fw-bold text-custom-primaryCTA pt-3 pb-3 pe-3 ps-3"
                style={{ width: "150px" }}
                onChange={(e) => setSelectedStatus(e.target.value)}
                value={selectedStatus}
              >
                <option value="">Status</option>
                <option value="Ledig">Ledig</option>
                <option value="Optaget">Optaget</option>
              </select>

              {/* Filter by Type */}
              <select
                className="form-select me-3 custom-rounded fw-bold text-custom-primaryCTA pt-3 pb-3 pe-3 ps-3"
                style={{ width: "150px" }}
                onChange={(e) => setSelectedType(e.target.value)}
                value={selectedType}
              >
                <option value="">Type</option>
                <option value="Mødelokale">Mødelokale</option>
                <option value="Taktiklokale">Taktiklokale</option>
                <option value="Omklædningsrum">Omklædningsrum</option>
                <option value="Cafe">Cafe</option>
                <option value="Køkken">Køkken</option>
              </select>

              {/* Add new facility button */}
              <Link to="/add-room">
                <button className="btn btn-primary fw-bold custom-rounded text-custom-primaryCTAhvid pt-3 pb-3 pe-3 ps-3">
                  <i className="fas fa-plus me-2"></i>Tilføj nyt lokale
                </button>
              </Link>
            </div>
          </div>

          {/* Table Header */}
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

          {/* Display filtered facilities */}
          {filteredFacilities.map((facility) => (
            <div
              className="row py-2 border-bottom bg-white ms-3 me-3"
              key={facility.id}
            >
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
                      <button
                        className="dropdown-item mt-2"
                        onClick={() => handleShowModal(facility)}
                      >
                        <i className="fa-solid fa-circle-info fa-lg me-2 text-secondary"></i>
                        Flere detaljer
                      </button>
                    </li>
                    <li>
                      <Link to={`/edit-facility/${facility.id}`} className="dropdown-item mt-2">
                        <i className="fa-solid fa-pencil fa-lg me-2 text-secondary"></i>
                        Ændre
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item mt-2 mb-2"
                        onClick={() => handleDelete(facility.id)}
                      >
                        <i className="fa-solid fa-trash fa-lg me-2 text-secondary"></i>
                        Slet
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <FacilityDetailsModal
            show={isModalOpen}
            onClose={handleCloseModal}
            facility={selectedFacility}
          />
        </div>
      </div>
    </div>
  );
}

export default FacilitiesPage;




