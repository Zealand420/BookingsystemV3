import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Link } from 'react-router-dom';  // Import Link for navigation


function MembersPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members"));
        const membersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members: ", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="container-fluid pe-3">
      {/* Main Content */}
      <div className="row">
        {/* Vertical Navbar */}
        <div className="col-3 bg-light border-end" style={{ minHeight: "100vh" }}>
          {/* Add Navbar Content */}
        </div>

        <div className="col-9">
          {/* Row 1: Header */}
          <div className="row align-items-center py-3 ms-2">
            <div className="col-6">
              <h1>Medlemmer</h1>
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
                  placeholder="Søg efter medlemmer..."
                />
              </div>
            </div>
            <div className="col-8 d-flex justify-content-end align-items-center">
              <span className="me-3 fw-bold text-custom-H3">Sorter efter:</span>
              <select className="form-select me-3 custom-rounded fw-bold text-custom-primary pt-3 pb-3 pe-3 ps-3" style={{ width: "150px" }}>
                <option>Klub</option>
                <option>Østerbro IF</option>
                <option>Heimdal</option>
                <option>HB</option>
                <option>Viktoria</option>
              </select>
              <select className="form-select me-3 custom-rounded fw-bold text-custom-primary pt-3 pb-3 pe-3 ps-3" style={{ width: "150px" }}>
                <option>Rolle</option>
                <option>Træner</option>
                <option>Bestyrelse</option>
                <option>Administrator</option>
              </select>
              <Link to="/add-member">
                <button className="btn btn-primary fw-bold custom-rounded text-custom-primaryCTAhvid pt-3 pb-3 pe-3 ps-3">
                  <i className="fas fa-plus me-2"></i>Tilføj nyt medlem
                </button>
              </Link>
            </div>
          </div>

          {/* Row 3: Table Header */}
          <div className="row py-3 border-bottom bg-white rounded-top ms-3 me-3">
            <div className="col-4">
              <strong className="text-custom-headertekst">Navn</strong>
            </div>
            <div className="col-2">
              <strong className="text-custom-headertekst">Telefon nr.</strong>
            </div>
            <div className="col-2">
              <strong className="text-custom-headertekst">Klub</strong>
            </div>
            <div className="col-2">
              <strong className="text-custom-headertekst">Rolle</strong>
            </div>
            <div className="col-2">
              <strong className="text-custom-headertekst">Handling</strong>
            </div>
          </div>

          {/* Rows: Dynamic Data */}
                  {members.map((member) => (
          <div className="row py-2 border-bottom bg-white ms-3 me-3" key={member.id}>
            <div className="col-4 text-custom-headertekst">
              {member.FirstName} {member.LastName}
            </div>
            <div className="col-2 text-custom-headertekst">{member.PhoneNumber}</div>
            <div className="col-2 text-custom-headertekst">{member.FootballClub}</div>
            <div className="col-2 text-custom-headertekst">{member.Role}</div>
            <div className="col-2 text-custom-headertekst">
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

export default MembersPage;

