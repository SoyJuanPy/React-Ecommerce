import React, { useState, useEffect, useContext } from "react";
import { auth } from "../Config/Config";
import { CartContext } from "../Global/CartContext";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";

const db = getFirestore();

export const Cashout = (props) => {
  const navigate = useNavigate();

  const { shoppingCart, totalPrice, totalQty, dispatch } =
    useContext(CartContext);

  // defining state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = doc(db, "SignedUpUsersData", user.uid);
        const snapshot = await getDoc(userDoc);

        if (snapshot.exists()) {
          setName(snapshot.data().Name);
          setEmail(snapshot.data().Email);
        }
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const cashoutSubmit = async (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const date = new Date();
        const time = date.getTime();

        const buyerInfoDoc = doc(db, "Buyer-info " + user.uid, "_" + time);

        try {
          await setDoc(buyerInfoDoc, {
            BuyerName: name,
            BuyerEmail: email,
            BuyerCell: cell,
            BuyerAddress: address,
            BuyerPayment: totalPrice,
            BuyerQuantity: totalQty,
          });

          setCell("");
          setAddress("");
          dispatch({ type: "EMPTY" });
          setSuccessMsg(
            "Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds",
          );
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } catch (err) {
          setError(err.message);
        }
      }
    });
  };

  return (
    <>
      <Navbar user={props.user} />
      <div className="container">
        <br />
        <h2>Detalles</h2>
        <br />
        {successMsg && <div className="success-msg">{successMsg}</div>}
        <form
          autoComplete="off"
          className="form-group"
          onSubmit={cashoutSubmit}
        >
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            disabled
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            disabled
          />
          <br />
          <label htmlFor="Cell No">Telefono</label>
          <input
            type="number"
            className="form-control"
            required
            onChange={(e) => setCell(e.target.value)}
            value={cell}
            placeholder="eg 03123456789"
          />
          <br />
          <label htmlFor="Delivery Address">Direccion</label>
          <input
            type="text"
            className="form-control"
            required
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <br />
          <label htmlFor="Price To Pay">Precio a pagar</label>
          <input
            type="number"
            className="form-control"
            required
            value={totalPrice}
            disabled
          />
          <br />
          <label htmlFor="Total No of Products">Total de productos</label>
          <input
            type="number"
            className="form-control"
            required
            value={totalQty}
            disabled
          />
          <br />
          <button type="submit" className="btn btn-success btn-md mybtn">
            Pagar
          </button>
        </form>
        {error && <span className="error-msg">{error}</span>}
      </div>
    </>
  );
};
