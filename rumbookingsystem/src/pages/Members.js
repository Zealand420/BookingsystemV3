import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

function MembersPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members")); // Ensure "members" matches your Firestore collection name
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
    <div className="container-fluid">
      {/* Existing code for layout */}
      <div className="row">
        {/* Vertical Navbar */}
        <div className="col-3 bg-light border-end" style={{ minHeight: "100vh" }}>
          {/* Add Navbar Content */}
        </div>

        {/* Main Content */}
        <div className="col-9">
          {/* Row 1: Header */}
          <div className="row align-items-center py-3">
            <div className="col-6">
              <h1>Medlemmer</h1>
            </div>
            <div className="col-6 text-end">
              <i className="fas fa-bell"></i>
            </div>
          </div>

{/* Row 2: Search, Filters, and Add Button */}
    <div className="row align-items-center py-3">
      <div className="col-4 d-flex align-items-center">
        <div className="input-group">
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Søg efter medlemmer..."
          />
        </div>
      </div>
      <div className="col-8 d-flex justify-content-end align-items-center">
        <span className="me-3">Sortér efter:</span>
        <select className="form-select me-3" style={{ width: "150px" }}>
          <option>Klub</option>
          <option>Østerbro IF</option>
          <option>Heimdal</option>
          <option>HB</option>
          <option>Viktoria</option>
        </select>
        <select className="form-select me-3" style={{ width: "150px" }}>
          <option>Rolle</option>
          <option>Træner</option>
          <option>Bestyrelse</option>
          <option>Administrator</option>
        </select>
        <button className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Tilføj nyt medlem
        </button>
      </div>
    </div>


          {/* Row 3: Table Header */}
          <div className="row py-3 border-bottom">
            <div className="col-4">
              <strong>Navn</strong>
            </div>
            <div className="col-1">
              <strong>Telefon nr.</strong>
            </div>
            <div className="col-3">
              <strong>Klub</strong>
            </div>
            <div className="col-2">
              <strong>Rolle</strong>
            </div>
            <div className="col-2">
              <strong>Handling</strong>
            </div>
          </div>

          {/* Rows: Dynamic Data */}
          {members.map((member) => (
            <div className="row py-2 border-bottom" key={member.id}>
              <div className="col-4">
                {member.FirstName} {member.LastName}
              </div>
              <div className="col-1">{member.PhoneNumber}</div>
              <div className="col-3">{member.FootballClub}</div>
              <div className="col-2">{member.Role}</div>
              <div className="col-2">
                <div className="dropdown">
                  <button
                    className="btn btn-link dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-vertical"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item">More Details</button>
                    </li>
                    <li>
                      <button className="dropdown-item">Edit</button>
                    </li>
                    <li>
                      <button className="dropdown-item">Delete</button>
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

