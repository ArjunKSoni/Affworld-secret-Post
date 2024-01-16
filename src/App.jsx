import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import { Provider } from 'react-redux';
import Store from './redux/Store';


function App() {
  return (
    <Provider store={Store}>
    <Router>
      <Routes>
      <Route exact path='/home' element={<Home />} />
      <Route exact path='/' element={<Login />} />
      </Routes>
    </Router>
    </Provider>
  );
}
export default App;
