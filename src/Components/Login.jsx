import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Importación modular
import { useNavigate } from "react-router-dom"; // Usamos useNavigate
import { Link } from "react-router-dom"; // Importa Link

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const login = (e) => {
    e.preventDefault();

    const auth = getAuth(); // Instancia de autenticación

    // Usamos la forma modular para el inicio de sesión
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError("");
        navigate("/"); // Redirige a la página principal
      })
      .catch((err) => setError(err.message)); // Muestra el error en caso de fallo
  };

  return (
    <div className="container">
      <br />
      <h2>Login</h2>
      <br />
      <form autoComplete="off" className="form-group" onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button type="submit" className="btn btn-success btn-md mybtn">
          LOGIN
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
      <br />
      <span>
        Don't have an account? Register
        <Link to="signup"> Here</Link>
      </span>
    </div>
  );
};
