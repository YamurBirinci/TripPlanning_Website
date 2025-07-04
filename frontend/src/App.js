import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage'; 
import SignUp from './components/SignUp'; 
import LogIn from './components/LogIn'; 
import UserProfile from './components/UserProfile'; 
import SelectedHotel from './components/SelectedHotel'; 
import Payment from './components/Payment'; 
import Search from './components/Search'; 
import HotelOwner from './components/HotelOwner'; 
import Admin from './components/Admin'; 
import PrivateRoute from './components/PrivateRoute'; 
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/SelectedHotel/:hotelID/:roomTypeID" element={<SelectedHotel />} />
          <Route path="/Search" element={<Search />} />
          <Route element={<PrivateRoute roles={['customer']} />}>
            <Route path="/MyProfile" element={<UserProfile />} />
          </Route>
          <Route element={<PrivateRoute roles={['owner']} />}>
            <Route path="/HotelOwner" element={<HotelOwner />} />
          </Route>
          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/Admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
