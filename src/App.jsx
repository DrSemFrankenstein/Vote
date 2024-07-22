import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Vote from "./Components/Vote";
import Rating from "./Components/Rating";

function App() {
  return (
    <Router>
      <div id="root">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/Vote">VOTE</Link>
              </li>
              <li>
                <Link to="/rating">RATING</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/Vote" element={<Vote />} />
            <Route path="/rating" element={<Rating />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
