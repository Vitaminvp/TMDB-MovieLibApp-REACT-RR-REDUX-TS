import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Movie } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<Movie />} />
      {/*<Route element={Page404} />*/}
    </Routes>
  );
}

export default App;
