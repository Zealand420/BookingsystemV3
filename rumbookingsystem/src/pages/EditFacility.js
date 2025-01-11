import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function EditFacilityPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [RoomName, setRoomName] = useState("");
  const [Status, setStatus] = useState("");
  const [Type, setType] = useState("");
  const [Description, setDescription] = useState(""); // Added Description state

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const facilityRef = doc(db, "Facilities", id);
        const facilityDoc = await getDoc(facilityRef);

        if (facilityDoc.exists()) {
          const data = facilityDoc.data();
          setRoomName(data.RoomName || "");
          setStatus(data.Status || "");
          setType(data.Type || "");
          setDescription(data.Description || ""); // Set Description
        } else {
          console.error("Facility not found!");
          navigate("/facilities");
        }
      } catch (error) {
        console.error("Error fetching facility data: ", error);
      }
    };

    fetchFacilityData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const facilityRef = doc(db, "Facilities", id);
      await updateDoc(facilityRef, {
        RoomName,
        Status,
        Type,
        Description, // Include Description in the update
      });
      navigate("/facilities");
    } catch (error) {
      console.error("Error updating facility: ", error);
    }
  };

  return (
    <div className="container-fluid pe-3">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="row justify-content-center mt-4">
            <div className="col-12">
              <div className="card p-4 rounded-3 shadow-sm bg-white">
                <h1 className="text-center">Rediger lokale</h1>

                {/* Row 1: Room Name */}
                <div className="row mt-3">
                  <div className="col-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-building"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Navn på lokale"
                        value={RoomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <select
                      className="form-select"
                      value={Type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="Mødelokale">Mødelokale</option>
                      <option value="Taktikrum">Taktikrum</option>
                      <option value="Omklædningsrum">Omklædningsrum</option>
                      <option value="Cafe">Cafe</option>
                      <option value="Køkken">Køkken</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Status */}
                <div className="row mt-3">
                  <div className="col-6">
                    <select
                      className="form-select"
                      value={Status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Ledig">Ledig</option>
                      <option value="Optaget">Optaget</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Description */}
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-info-circle"></i>
                      </span>
                      <textarea
                        className="form-control"
                        placeholder="Beskrivelse"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 5: Buttons */}
                <div className="row mt-3">
                  <div className="col-6">
                    <button
                      className="btn btn-secondary border border-secondary btn-hover-custom pt-3 pb-3 pe-3 ps-3 fw-bold float-end"
                      style={{ width: "50%" }}
                      onClick={() => navigate("/facilities")}
                    >
                      Tilbage til faciliteter
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-primary pt-3 pb-3 pe-3 ps-3 fw-bold"
                      style={{ width: "50%" }}
                      onClick={handleSubmit}
                    >
                      Opdater lokale
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default EditFacilityPage;
