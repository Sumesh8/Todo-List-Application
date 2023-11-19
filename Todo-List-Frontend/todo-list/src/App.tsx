import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

function App() { 
  return (
    // Use the React Router's Router component to enable routing
    <Router> {/* Define routes using the Routes component */}
          <Routes>
          <Route path="/" element={<LoginScreen />} />  {/* Route for the default path, rendering the LoginScreen component */}
          <Route path="/home" element={<HomeScreen />} /> {/* Route for the "/home" path, rendering the HomeScreen component */}
          </Routes>
    </Router>
  );
}

// Export the App component for usage in other parts of application
export default App;
