import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
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
            navigate("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container">
      <br />
      <h2>Registrarse</h2>
      <br />
      <form autoComplete="off" className="form-group" onSubmit={signup}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Nombre"
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="ejemplo@gmail.com"
        />
        <br />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="***************"
        />
        <br />
        <button type="submit" className="btn btn-success btn-md mybtn">
          Registrarse
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
      <br />
      <span>
        Ya tienes cuenta? Inicia sesion
        <Link to="/login"> Aqui </Link>
      </span>
    </div>
  );
};
