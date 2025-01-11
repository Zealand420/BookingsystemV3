import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function AdminVerticalNavbar({ userId }) {
  const [FirstName, setFirstName] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, "Users", userId));
        if (userDoc.exists()) {
          setFirstName(userDoc.data().FirstName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="col-12 bg-light sticky-top" style={{ minHeight: "100vh" }}>
      {/* User Icon and Welcome */}
      <div className="text-center py-4">
        <div
          className="rounded-circle d-inline-block usericon">
          <i className="fas fa-user"></i>
        </div>
        <p className="mt-3 fw-bold text-custom-H3">
          Velkommen {FirstName ? FirstName : "Gæst"}
        </p>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="list-unstyled ms-5 text-custom-navbar fw-bold">
          {/* Navigation Item: Medlemmer */}
          <li>
            <Link
              to="/members"
              className={`nav-link d-flex align-items-center py-2 px-3 mt-3${
                location.pathname === "/members" ? "active" : ""
              }`}>
              <i className="fas fa-users me-2 fa-lg me-3"></i> Medlemmer
            </Link>
          </li>

          {/* Navigation Item: Faciliteter */}
          <li>
            <Link
              to="/facilities"
              className={`nav-link d-flex align-items-center py-2 px-3 mt-3 ${
                location.pathname === "/facilities" ? "active" : ""
              }`}>
              <i className="fas fa-building me-2 fa-lg me-4"></i> Faciliteter
            </Link>
          </li>

          {/* Navigation Item: Alle Reservationer */}
          <li>
            <Link
              to=""
              className="nav-link d-flex align-items-center py-2 px-3 disabled mt-3">
              <i className="fas fa-calendar-alt me-2 fa-lg me-3"></i> Alle reservationer
            </Link>
          </li>

          {/* Navigation Item: Reserver Rum */}
          <li className="position-relative">
            <a
              href="#!"
              className="nav-link d-flex align-items-center py-2 px-3 mt-3"
              data-bs-toggle="collapse"
              data-bs-target="#dropdown-reserver"
              aria-expanded="false"
              aria-controls="dropdown-reserver">
              <i className="fas fa-key me-2 fa-lg me-3"></i> Reserver rum
            </a>
            <div className="collapse" id="dropdown-reserver">
              <ul className="list-unstyled ps-4">
                <li>
                  <Link
                    to="/rooms-and-cafe"
                    className={`nav-link d-flex align-items-center py-2 mt-3 ${
                      location.pathname === "/rooms-and-cafe" ? "active" : ""
                    }`}>
                    <i className="fas fa-door-open me-3 fa-lg"></i> Lokaler & Cafe
                  </Link>
                </li>
                <li>
                  <Link
                    to="/changing-room"
                    className={`nav-link d-flex align-items-center py-2 mt-3 ${
                      location.pathname === "/changing-room" ? "active" : ""
                    }`}>
                    <i className="fas fa-shower me-3 fa-lg"></i> Omklædningsrum
                  </Link>
                </li>
                <li>
                  <Link
                    to="fitness-room"
                    className={`nav-link d-flex align-items-center py-2 mt-3 ${
                      location.pathname === "/fitness-room" ? "active" : ""
                    }`}>
                    <i className="fas fa-dumbbell me-3 fa-lg"></i> Fitnessrum
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kitchen"
                    className={`nav-link d-flex align-items-center py-2 mt-3 ${
                      location.pathname === "/kitchen" ? "active" : ""
                    }`}>
                    <i className="fas fa-utensils me-3 fa-lg"></i> Køkken
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminVerticalNavbar;

