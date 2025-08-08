import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Nutrition from './Pages/Nutrition/Nutrition';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nutrition" element={<Nutrition />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
