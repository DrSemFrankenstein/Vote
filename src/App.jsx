import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Rating from "./Components/Rating";

function App() {
  return (
    <Router>
      <div id="root">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/about">RATING</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Rating />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
