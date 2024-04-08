import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage'; 
import SignUp from './components/SignUp'; 
import LogIn from './components/LogIn'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
