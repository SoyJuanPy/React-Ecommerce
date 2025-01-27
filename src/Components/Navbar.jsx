import { useContext } from "react";
import logo from "../images/ecommerce.svg";
import { Link } from "react-router-dom";
import { auth } from "../Config/Config";
import { Icon } from "react-icons-kit";
import { cart } from "react-icons-kit/entypo/cart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Global/CartContext";

export const Navbar = ({ user = null }) => {
  const navigate = useNavigate();
  const { totalQty = 0 } = useContext(CartContext);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="navbox">
      <div className="leftside">
        <Link to="/">
          <img className="logo" src={logo} alt="Ecommerce Logo" />
        </Link>
      </div>
      {!user ? (
        <div className="rightside">
          <span>
            <Link to="/signup" className="navlink">
              Registrarse
            </Link>
          </span>
          <span>
            <Link to="/login" className="navlink">
              Iniciar Sesion
            </Link>
          </span>
        </div>
      ) : (
        <div className="rightside">
          <span>
            <Link to="/" className="navlink">
              {user}
            </Link>
          </span>
          <span>
            <Link to="/cartproducts" className="navlink">
              <Icon icon={cart} />
            </Link>
          </span>
          <span className="no-of-products">{totalQty}</span>
          <span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesion
            </button>
          </span>
        </div>
      )}
    </div>
  );
};
