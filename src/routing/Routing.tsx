import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Registration from "../components/Registration";

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
    </Routes>
  );
};

export default Routing;
