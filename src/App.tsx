import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/Routing";

function App() {
  return (
    <div className="App">
      <Router>
        <Routing />
      </Router>
    </div>
  );
}

export default App;
