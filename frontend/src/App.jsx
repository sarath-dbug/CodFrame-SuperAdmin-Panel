import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './App.css';
import Auth from './pages/Auth';


function App() {
  return (
    <Provider store={store}>
    <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Auth />} />

        </Routes>
    </Router>
    </Provider>
  );
}

export default App;