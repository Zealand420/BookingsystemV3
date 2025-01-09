import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { useParams } from "react-router-dom";

function Calendar() {
  const { roomId } = useParams();

  const [currentWeek, setCurrentWeek] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form States
  const [TitelReservation, setTitelReservation] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [FootBallClub, setFootBallClub] = useState("");
  const [Opponent, setOpponent] = useState("");
  const [reservationDescription, setReservationDescription] = useState("");

  const daysInDanish = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];

  const fetchReservations = async () => {
    try {
      const reservationsQuery = query(collection(db, `Facilities/${roomId}/Calendar`));
      const querySnapshot = await getDocs(reservationsQuery);
      const fetchedReservations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(fetchedReservations);
    } catch (error) {
      console.error("Error fetching reservations: ", error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() || 7) + 1));
    const week = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      return date;
    });
    setCurrentWeek(week);
    fetchReservations();
  }, [roomId]);

  const changeWeek = (direction) => {
    const newWeek = currentWeek.map((day) => {
      const newDay = new Date(day);
      newDay.setDate(newDay.getDate() + direction * 7);
      return newDay;
    });
    setCurrentWeek(newWeek);
  };

  const handleReservationSubmit = async () => {
    if (!TitelReservation || !StartTime || !EndTime || !StartDate || !EndDate) {
      alert("Please fill out all required fields.");
      return;
    }

    const reservation = {
      title: TitelReservation,
      StartTime,
      EndTime,
      StartDate,
      EndDate,
      FootBallClub,
      Opponent,
      description: reservationDescription,
    };

    try {
      await addDoc(collection(db, `Facilities/${roomId}/Calendar`), reservation);
      alert("Reservation successful!");
      setIsModalOpen(false);
      setTitelReservation("");
      setStartTime("");
      setEndTime("");
      setStartDate("");
      setEndDate("");
      setFootBallClub("");
      setOpponent("");
      setReservationDescription("");
      fetchReservations();
    } catch (error) {
      console.error("Error adding reservation: ", error);
      alert("Failed to add reservation. Try again.");
    }
  };

  return (
    <div className="container-fluid pe-3">
      <div className="row">
        <div className="col-3 bg-light border-end" style={{ minHeight: "100vh" }}></div>
        <div className="col-9">
          <div className="row align-items-center py-3 ms-2">
            <div className="col-6">
              <h1>{roomId}</h1>
            </div>
            <div className="col-6 text-end">
              <div className="input-group" style={{ width: "250px", display: "inline-flex" }}>
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Søg..."
                />
              </div>
              <i className="fas fa-bell fa-xl me-3"></i>
            </div>
          </div>
          <div className="row align-items-center py-3 ms-2 me-2">
            <div className="col-6 d-flex align-items-center">
              <button
                className="btn btn-link me-2 p-0 text-decoration-none"
                onClick={() => changeWeek(-1)}
              >
                &lt;
              </button>
              <span>
                {currentWeek[0]?.toLocaleDateString()} - {currentWeek[6]?.toLocaleDateString()}
              </span>
              <button
                className="btn btn-link ms-2 p-0 text-decoration-none"
                onClick={() => changeWeek(1)}
              >
                &gt;
              </button>
            </div>
            <div className="col-6 text-end">
              <button
                className="btn btn-primary fw-bold"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fas fa-calendar me-2"></i> Reserver
              </button>
            </div>
          </div>
          <div className="row py-3 border-bottom bg-white ms-3 me-3 rounded-top">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>Time</th>
                  {currentWeek.map((day, index) => (
                    <th key={day.toISOString()}>
                      <div className="fw-bold">{daysInDanish[index]}</div>
                      <div>{day.getDate()}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }, (_, i) => {
                  const time = `${7 + i}:00`;
                  return (
                    <tr key={time}>
                      <td>{time}</td>
                      {currentWeek.map((day) => (
                        <td key={day.toISOString() + time} style={{ height: "50px" }}>
                          {reservations
                            .filter(
                              (res) =>
                                new Date(res.StartDate).toDateString() === day.toDateString()
                            )
                            .map((res) => (
                              <div key={res.id} className="reservation">
                                {res.title}
                              </div>
                            ))}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-box bg-white p-4 rounded" style={{ width: "750px" }}>
      <h2>Reserver tid - {roomId}</h2>
      <form>
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={TitelReservation}
            onChange={(e) => setTitelReservation(e.target.value)}
          />
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Start Time</label>
            <input
              type="time"
              className="form-control"
              value={StartTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label>End Time</label>
            <input
              type="time"
              className="form-control"
              value={EndTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              value={StartDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label>End Date</label>
            <input
              type="date"
              className="form-control"
              value={EndDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label>Football Club</label>
          <select
            className="form-control"
            value={FootBallClub}
            onChange={(e) => setFootBallClub(e.target.value)}
          >
            <option value="">Select Club</option>
            <option value="Østerbro IF">Østerbro IF</option>
            <option value="Heimdal">Heimdal</option>
            <option value="Viktoria">Viktoria</option>
            <option value="HB">HB</option>
          </select>
        </div>
        <div><p>Eller</p></div>
        <div className="form-group mb-3">
          <label>Modstanderklub</label>
          <input
            type="text"
            className="form-control"
            value={Opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={reservationDescription}
            onChange={(e) => setReservationDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="row">
          <div className="col-6">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleReservationSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default Calendar;






