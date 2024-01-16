import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/home' element={<Home />} />
      <Route exact path='/' element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
