import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OverviewAdmin from './pages/OverviewAdmin';
import Members from './pages/Members';
import AddMember from './pages/AddMember';
import Facilities from './pages/Facilities';
import AddRoom from './pages/AddRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<OverviewAdmin />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/add-room" element={<AddRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
