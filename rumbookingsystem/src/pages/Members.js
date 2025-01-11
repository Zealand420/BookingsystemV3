import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Link } from 'react-router-dom';
import AdminVerticalNavbar from "../components/AdminVerticalNavbar";
import MemberDetailsModal from "../components/MemberDetailsModal"; // Import the modal component

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]); // State for filtered members
  const [selectedClub, setSelectedClub] = useState(""); // State for selected club
  const [selectedRole, setSelectedRole] = useState(""); // State for selected role
  const [selectedMember, setSelectedMember] = useState(null); // State for the selected member
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members"));
        const membersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(membersData);
        setFilteredMembers(membersData); // Initially display all members
      } catch (error) {
        console.error("Error fetching members: ", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    // Filter members whenever selectedClub or selectedRole changes
    const filtered = members.filter(member => {
      const matchesClub = selectedClub ? member.FootballClub === selectedClub : true;
      const matchesRole = selectedRole ? member.Role === selectedRole : true;
      return matchesClub && matchesRole;
    });
    setFilteredMembers(filtered);
  }, [selectedClub, selectedRole, members]);

  const handleDelete = async (id) => {
    if (window.confirm("Er du sikker på, at du vil slette dette medlem?")) {
      try {
        await deleteDoc(doc(db, "members", id));
        setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
        alert("Medlem slettet.");
      } catch (error) {
        console.error("Error deleting member: ", error);
        alert("Noget gik galt. Prøv igen.");
      }
    }
  };

  const handleShowModal = (member) => {
    setSelectedMember(member);  // Set the selected member
    setIsModalOpen(true);       // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);      // Close the modal
  };

  return (
    <div className="container-fluid pe-3">
      <div className="row">
        <div className="col-3 bg-light border-end" style={{ minHeight: "100vh" }}>
          <AdminVerticalNavbar userId="USER_ID_HERE" />
        </div>

        <div className="col-9">
          <div className="row align-items-center py-3 ms-2">
            <div className="col-6">
              <h1>Medlemmer</h1>
            </div>
            <div className="col-6 text-end">
              <i className="fas fa-bell fa-xl me-3"></i>
            </div>
          </div>

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
              <select
                className="form-select me-3 custom-rounded fw-bold text-custom-primaryCTA pt-3 pb-3 pe-3 ps-3"
                style={{ width: "150px" }}
                onChange={(e) => setSelectedClub(e.target.value)}
                value={selectedClub}
              >
                <option value="">Klub</option>
                <option value="Østerbro IF">Østerbro IF</option>
                <option value="Heimdal">Heimdal</option>
                <option value="HB">HB</option>
                <option value="Viktoria">Viktoria</option>
              </select>
              <select
                className="form-select me-3 custom-rounded fw-bold text-custom-primaryCTA pt-3 pb-3 pe-3 ps-3"
                style={{ width: "150px" }}
                onChange={(e) => setSelectedRole(e.target.value)}
                value={selectedRole}
              >
                <option value="">Rolle</option>
                <option value="Træner">Træner</option>
                <option value="Bestyrelse">Bestyrelse</option>
                <option value="Administrator">Administrator</option>
              </select>
              <Link to="/add-member">
                <button className="btn btn-primary fw-bold custom-rounded text-custom-primaryCTAhvid pt-3 pb-3 pe-3 ps-3">
                  <i className="fas fa-plus me-2"></i>Tilføj nyt medlem
                </button>
              </Link>
            </div>
          </div>

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

          {filteredMembers.map((member) => (
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
                      <button className="dropdown-item mt-2" onClick={() => handleShowModal(member)}>
                        <i className="fa-solid fa-circle-info fa-lg me-2 text-secondary"></i>Flere detaljer
                      </button>
                    </li>
                    <li>
                      <Link to={`/edit-member/${member.id}`} className="dropdown-item mt-2">
                        <i className="fa-solid fa-pencil fa-lg me-2 text-secondary"></i>Ændre
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item mt-2 mb-2"
                        onClick={() => handleDelete(member.id)}
                      >
                        <i className="fa-solid fa-trash fa-lg me-2 text-secondary"></i>Slet
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <MemberDetailsModal
            show={isModalOpen}
            onClose={handleCloseModal}
            member={selectedMember}
          />
        </div>
      </div>
    </div>
  );
}

export default MembersPage;





