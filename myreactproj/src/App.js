import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage'; 
import SignUp from './components/SignUp'; 
import LogIn from './components/LogIn'; 
import MyProfile from './components/UserProfile'; 
import SelectedHotel from './components/SelectedHotel'; 
import Payment from './components/Payment'; 
import Search from './components/Search'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/SelectedHotel" element={<SelectedHotel />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
