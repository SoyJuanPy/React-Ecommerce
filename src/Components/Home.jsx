import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { useNavigate } from "react-router-dom"; // Cambia useHistory por useNavigate
import { auth } from "../Config/Config";

export const Home = ({ user }) => {
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login"); // Cambia history.push a navigate
      }
    });
  }, [navigate]); // Asegúrate de incluir navigate como dependencia en useEffect

  return (
    <div className="wrapper">
      <Navbar user={user} />
      <Products />
    </div>
  );
};
