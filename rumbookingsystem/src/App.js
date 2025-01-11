import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import OverviewAdmin from './pages/OverviewAdmin.js';
import Members from './pages/Members.js';  
import AddMember from './pages/AddMember.js';
import Facilities from './pages/Facilities.js';
import AddRoom from './pages/AddRoom.js';
import Kitchen from './pages/Kitchen.js';  
import Changingroom from './pages/Changingroom.js';
import Fitnessroom from './pages/Fitnessroom.js';
import RoomsandCafe from './pages/RoomsandCafe.js';
import Calendar from './components/Calendar.js';
import EditMember from './pages/EditMember.js';
import EditFacility from './pages/EditFacility.js';




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
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:roomId" element={<Calendar />} /> 
        <Route path="/edit-member/:id" element={<EditMember />} />
        <Route path="/edit-facility/:id" Component={EditFacility} />

        </Routes>
    </Router>
  );
}

export default App;


