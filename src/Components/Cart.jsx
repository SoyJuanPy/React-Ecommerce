import React, { useContext, useEffect } from "react";
import { CartContext } from "../Global/CartContext";
import { Navbar } from "./Navbar";
import { Icon } from "react-icons-kit";
import { ic_add } from "react-icons-kit/md/ic_add";
import { ic_remove } from "react-icons-kit/md/ic_remove";
import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Config/Config";

export const Cart = ({ user }) => {
  const { shoppingCart, dispatch, totalPrice, totalQty } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <>
      <Navbar user={user} />
      <>
        {shoppingCart.length !== 0 && <h1>Carrito</h1>}
        <div className="cart-container">
          {shoppingCart.length === 0 && (
            <>
              <div>No hay productos en su carrito</div>
              <div>
                <Link to="/">Regresar al inicio</Link>
              </div>
            </>
          )}
          {shoppingCart &&
            shoppingCart.map((cart) => (
              <div className="cart-card" key={cart.ProductID}>
                <div className="cart-img">
                  <img src={cart.ProductImg} alt="not found" />
                </div>

                <div className="cart-name">{cart.ProductName}</div>

                <div className="cart-price-original">
                  USD {cart.ProductPrice}
                </div>

                <div
                  className="inc"
                  onClick={() =>
                    dispatch({ type: "INC", id: cart.ProductID, cart })
                  }
                >
                  <Icon icon={ic_add} size={24} />
                </div>

                <div className="quantity">{cart.qty}</div>

                <div
                  className="dec"
                  onClick={() =>
                    dispatch({ type: "DEC", id: cart.ProductID, cart })
                  }
                >
                  <Icon icon={ic_remove} size={24} />
                </div>

                <div className="cart-price">USD {cart.TotalProductPrice}</div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch({ type: "DELETE", id: cart.ProductID, cart })
                  }
                >
                  <Icon icon={iosTrashOutline} size={24} />
                </button>
              </div>
            ))}
          {shoppingCart.length > 0 && (
            <div className="cart-summary">
              <div className="cart-summary-heading">Resumen</div>
              <div className="cart-summary-price">
                <span>Precio Total</span>
                <span>{totalPrice}</span>
              </div>
              <div className="cart-summary-price">
                <span>Cantidad</span>
                <span>{totalQty}</span>
              </div>
              <Link to="/cashout" className="cashout-link">
                <button
                  className="btn btn-success btn-md"
                  style={{ marginTop: "5px" }}
                >
                  Ordenar
                </button>
              </Link>
            </div>
          )}
        </div>
      </>
    </>
  );
};
