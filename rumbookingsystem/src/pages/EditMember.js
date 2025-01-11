import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebaseConfig";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [FootballClub, setFootballClub] = useState("");
  const [Role, setRole] = useState("");
  const [RoomAccess, setRoomAccess] = useState([]);
  const [DropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const memberRef = doc(db, "members", id);
        const memberDoc = await getDoc(memberRef);

        if (memberDoc.exists()) {
          const data = memberDoc.data();
          setEmail(data.Email || "");
          setFirstName(data.FirstName || "");
          setLastName(data.LastName || "");
          setPhoneNumber(data.PhoneNumber || "");
          setFootballClub(data.FootballClub || "");
          setRole(data.Role || "");
          setRoomAccess(data.RoomAccess || []);
        } else {
          console.error("Member not found!");
          navigate("/members");
        }
      } catch (error) {
        console.error("Error fetching member data: ", error);
      }
    };

    fetchMemberData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const memberRef = doc(db, "members", id);
      await updateDoc(memberRef, {
        Email,
        FirstName,
        LastName,
        PhoneNumber,
        FootballClub,
        Role,
        RoomAccess,
      });
      navigate("/members");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleRoomAccessChange = (event) => {
    const value = event.target.value;
    setRoomAccess((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((room) => room !== value);
      }
      return [...prevState, value];
    });
  };

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
                <h1 className="text-center">Rediger medlem</h1>

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
                      {DropdownOpen && (
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
                      className="btn btn-secondary border border-secondary btn-hover-custom pt-3 pb-3 pe-3 ps-3 fw-bold float-end"
                      style={{ width: "50%" }}
                      onClick={() => navigate("/members")}
                    >
                      Tilbage til medlemmer
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-primary pt-3 pb-3 pe-3 ps-3 fw-bold"
                      style={{ width: "50%" }}
                      onClick={handleSubmit}
                    >
                      Opdater Medlem
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

export default EditMember;
