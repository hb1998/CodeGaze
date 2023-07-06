import React, { useState } from "react";
import Axios from "axios";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}
export default App;
