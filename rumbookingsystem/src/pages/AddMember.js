import { useState, useRef, useEffect } from "react";
import { db } from "../firebaseConfig"; // import your firebase config
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';  // For navigating back

const AddMember = () => {
  const navigate = useNavigate();

  // State for form data
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [FootballClub, setFootballClub] = useState("");
  const [Role, setRole] = useState("");
  const [RoomAccess, setRoomAccess] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null); // Reference to the dropdown to handle click outside

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "members"), {
        Email,
        FirstName,
        LastName,
        PhoneNumber,
        FootballClub,
        Role,
        RoomAccess
      });
      navigate("/members");  // Redirect to members page after submission
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  // Function to handle room access selection
  const handleRoomAccessChange = (event) => {
    const value = event.target.value;
    setRoomAccess(prevState => {
      if (prevState.includes(value)) {
        return prevState.filter(room => room !== value); // Remove value if already selected
      }
      return [...prevState, value]; // Add value if not already selected
    });
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container-fluid pe-3">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-2"></div>

        {/* Main Form Area */}
        <div className="col-8">
          <div className="row justify-content-center mt-4">
            <div className="col-12">
              <div className="card p-4 rounded-3 shadow-sm bg-white">
                <h1 className="text-center">Opret nyt medlem</h1>

                {/* Row 1: Fornavn and Efternavn */}
                <div className="row mt-3">
                  <div className="col-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Fornavn"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Efternavn"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email and Phone Number */}
                <div className="row mt-3">
                  <div className="col-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-phone"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefonnummer"
                        value={PhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Football Club */}
                <div className="row mt-3">
                  <div className="col-6">
                    <select
                      className="form-select"
                      value={FootballClub}
                      onChange={(e) => setFootballClub(e.target.value)}
                    >
                      <option value="">Vælg en klub</option>
                      <option value="Østerbro IF">Østerbro IF</option>
                      <option value="Heimdal">Heimdal</option>
                      <option value="HB">HB</option>
                      <option value="Viktoria">Viktoria</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Role and Room Access */}
                <div className="row mt-3">
                  <div className="col-6">
                    <select
                      className="form-select"
                      value={Role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Vælg en rolle</option>
                      <option value="Træner">Træner</option>
                      <option value="Bestyrelse">Bestyrelse</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <div ref={dropdownRef} className="dropdown">
                      <button
                        className="btn btn-outline-secondary w-100"
                        type="button"
                        onClick={toggleDropdown}
                      >
                        Vælg adgang (f.eks. rum)
                      </button>
                      {dropdownOpen && (
                        <div className="dropdown-menu w-100">
                          <label className="dropdown-item">
                            <input
                              type="checkbox"
                              value="takikrum"
                              checked={RoomAccess.includes("takikrum")}
                              onChange={handleRoomAccessChange}
                            />
                            Takikrum
                          </label>
                          <label className="dropdown-item">
                            <input
                              type="checkbox"
                              value="mødelokaler"
                              checked={RoomAccess.includes("mødelokaler")}
                              onChange={handleRoomAccessChange}
                            />
                            Mødelokaler
                          </label>
                          <label className="dropdown-item">
                            <input
                              type="checkbox"
                              value="omklædningsrum"
                              checked={RoomAccess.includes("omklædningsrum")}
                              onChange={handleRoomAccessChange}
                            />
                            Omklædningsrum
                          </label>
                          <label className="dropdown-item">
                            <input
                              type="checkbox"
                              value="fitnessrum"
                              checked={RoomAccess.includes("fitnessrum")}
                              onChange={handleRoomAccessChange}
                            />
                            Fitnessrum
                          </label>
                          <label className="dropdown-item">
                            <input
                              type="checkbox"
                              value="cafe"
                              checked={RoomAccess.includes("cafe")}
                              onChange={handleRoomAccessChange}
                            />
                            Cafe
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 5: Buttons */}
                <div className="row mt-3">
                  <div className="col-6">
                    <button
                      className="btn btn-secondary"
                      style={{ width: "50%" }}
                      onClick={() => navigate("/members")}
                    >
                      Tilbage til medlemmer
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-primary"
                      style={{ width: "50%" }}
                      onClick={handleSubmit}
                    >
                      Opret Bruger
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default AddMember;






