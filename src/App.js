import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


//Pages
import Home from "./pages/Home";
import PosPage from "./pages/PosPage";

let App = () =>{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pos" element={<PosPage />} />
      </Routes>
    </Router>
  )
}

export default App;
