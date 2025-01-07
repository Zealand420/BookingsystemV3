import React from 'react';
import { Link } from 'react-router-dom';

const OverviewAdmin = () => {
  return (
    <div className="container my-4">
      {/* Row 1 */}
      <div className="row">
        <div className="col text-center">
          <h1 class="fw-bold text-custom-H1 mt-5" >Hej Admin!</h1>
          <h3 className='text-custom-H3'>Hvor vil du gerne hen?</h3>
        </div>
      </div>

      {/* Row 2 */}
      <div className="row mt-2">
        {/* Sidebar Left */}
        <div className="col-2"></div>

        {/* Column 2 to 4: 3 Squares */}
        <Link to="/members" className="col-2 text-center square ms-2 me-2" style={{ textDecoration: 'none' }}>
          <i className="fas fa-users fa-3x mt-3 text-secondary"></i>
          <h5 className='text-custom-navbar mt-1'>Medlemmer</h5>
        </Link>
        <Link to="/facilities" className="col-2 text-center square ms-2 me-2" style={{ textDecoration: 'none' }}>
          <i className="fas fa-building fa-3x text-secondary mt-3"></i>
          <h5 className='text-custom-navbar mt-1'>Faciliteter</h5>
        </Link>
        <div className="col-2 text-center square disabled ms-2 me-2" style={{ textDecoration: 'none' }}>
          <i className="fa-solid fa-calendar-days fa-3x text-secondary mt-3"></i>
          <h5 className='text-custom-navbar mt-1'>Alle Reservationer</h5>
        </div>

        {/* Empty Column 5 */}
        <div className="col-2"></div>

        {/* Sidebar Right */}
        <div className="col-2"></div>
      </div>

      {/* Row 3 */}
      <div className="row">
        <div className="col text-center">
          <h3 class="mt-4 text-custom-H3">Eller vil du gerne booke et rum?</h3>
        </div>
      </div>

      {/* Row 4 */}
      <div className="row mt-2">
        {/* Sidebar Left */}
        <div className="col-2"></div>

        {/* Column 2 to 5: 4 Squares */}
        <Link to="/roomsandcafe" className="col-2 text-center square ms-2 me-2" style={{ textDecoration: 'none' }}>
          <i className="fa-solid fa-person-shelter fa-3x text-secondary mt-3"></i>
          <h5 className='text-custom-navbar mt-1'>Lokaler & Cafe</h5>
        </Link>
        <Link to="/changingroom" className="col-2 text-center square ms-2 me-2" style={{ textDecoration: 'none' }}>
          <i className="fas fa-restroom fa-3x text-secondary mt-3"></i>
          <h5 className='text-custom-navbar mt-1'>Omklædningsrum</h5>
        </Link>
        <Link to="/fitnessroom" className="col-2 text-center square ms-2 me-2" style={{ textDecoration: 'none' }}>
          <i className="fas fa-dumbbell fa-3x text-secondary mt-3"></i>
          <h5 className='text-custom-navbar mt-1'>Fitnessrum</h5>
        </Link>
        <Link to="/kitchen" className="col-2 text-center square ms-2 me-2" style={{ textDecoration: 'none' }}>
          <i className="fas fa-utensils fa-3x text-secondary mt-3"></i>
          <h5 className='text-custom-navbar mt-1'>Køkken</h5>
        </Link>

        {/* Sidebar Right */}
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default OverviewAdmin;



