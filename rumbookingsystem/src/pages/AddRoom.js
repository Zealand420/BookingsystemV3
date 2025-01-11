import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
  const navigate = useNavigate();

  const [RoomName, setRoomName] = useState("");
  const [Type, setRoomType] = useState("");
  const [Status, setRoomStatus] = useState("");
  const [Description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Facilities"), {
        RoomName,
        Type,
        Status,
        Description,
        Calendar: {
          EndDate: "",
          EndTime: "",
          FootBallClub: "",
          Opponent: "",
          ReservationDescription: "",
          StartDate: "",
          StartTime: "",
          TitelReservation: "",
        },
      });
      navigate("/facilities"); 
    } catch (error) {
      console.error("Error adding room: ", error);
    }
  };

  return (
    <div className="container-fluid pe-3">
      <div className="row">
        <div className="col-3"></div>

        <div className="col-6">
          <div className="row justify-content-center mt-4">
            <div className="col-12">
              <div className="card p-4 rounded-3 shadow-sm bg-white">
                <h1 className="text-center">Tilføj nyt rum</h1>

                <div className="row mt-4">
                  <div className="col-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Navn"
                        value={RoomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <select
                      className="form-select"
                      value={Type}
                      onChange={(e) => setRoomType(e.target.value)}
                    >
                      <option value="">Vælg type</option>
                      <option value="Taktiklokale">Taktiklokale</option>
                      <option value="Mødelokale">Mødelokale</option>
                      <option value="Omklædningsrum">Omklædningsrum</option>
                      <option value="Fitnessrum">Fitnessrum</option>
                      <option value="Cafe">Cafe</option>
                      <option value="Køkken">Køkken</option>

                    </select>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-6">
                    <select
                      className="form-select"
                      value={Status}
                      onChange={(e) => setRoomStatus(e.target.value)}
                    >
                      <option value="">Vælg status</option>
                      <option value="Ledig">Ledig</option>
                      <option value="Optaget">Optaget</option>
                    </select>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Beskrivelse"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-6">
                    <button
                      className="btn btn-secondary border border-secondary btn-hover-custom pt-3 pb-3 pe-3 ps-3 fw-bold float-end"
                      style={{ width: "50%" }}
                      onClick={() => navigate("/facilities")}
                    >
                      Til faciliteter
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-primary pt-3 pb-3 pe-3 ps-3 fw-bold"
                      style={{ width: "50%" }}
                      onClick={handleSubmit}
                    >
                      Tilføj rum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default AddRoom;

  