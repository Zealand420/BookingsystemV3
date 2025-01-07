import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import pages
import OverviewAdmin from './pages/OverviewAdmin.js';
import Members from './pages/Members.js';  // This import should be correct
import AddMember from './pages/AddMember.js';
import Facilities from './pages/Facilities.js';
import AddRoom from './pages/AddRoom.js';
import Kitchen from './pages/Kitchen.js';  // Correctly import Kitchen
import Changingroom from './pages/Changingroom.js';
import Fitnessroom from './pages/Fitnessroom.js';
import RoomsandCafe from './pages/RoomsandCafe.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/adminoverview" element={<OverviewAdmin />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/fitness-room" element={<Fitnessroom />} />
        <Route path="/rooms-and-cafe" element={<RoomsandCafe />} />
        <Route path="/changing-room" element={<Changingroom />} />
      </Routes>
    </Router>
  );
}

export default App;


