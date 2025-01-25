import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate

export const Signup = () => {
  // Definir estado
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Crear instancia de useNavigate

  // signup
  const signup = (e) => {
    e.preventDefault();

    const auth = getAuth(); // Obtener la instancia de autenticación
    const db = getFirestore(); // Obtener la instancia de Firestore

    createUserWithEmailAndPassword(auth, email, password) // Usamos la función modular
      .then((cred) => {
        setDoc(doc(db, "SignedUpUsersData", cred.user.uid), {
          Name: name,
          Email: email,
          Password: password,
        })
          .then(() => {
            setName("");
            setEmail("");
            setPassword("");
            setError("");
            navigate("/login"); // Usar navigate en lugar de props.history.push
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container">
      <br />
      <h2>Sign up</h2>
      <br />
      <form autoComplete="off" className="form-group" onSubmit={signup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
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
          SUBMIT
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
      <br />
      <span>
        Already have an account? Login
        <Link to="login"> Here</Link>
      </span>
    </div>
  );
};
