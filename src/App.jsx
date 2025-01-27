import { Component } from "react";
import { ProductsContextProvider } from "./Global/ProductContext.jsx";
import { Home } from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { NotFound } from "./Components/NotFound";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { CartContextProvider } from "./Global/CartContext";
import { Cart } from "./Components/Cart";
import { AddProducts } from "./Components/AddProducts";
import { Cashout } from "./Components/Cashout";

export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const auth = getAuth();
    const db = getFirestore();

    auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = doc(db, "SignedUpUsersData", user.uid);
        getDoc(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.setState({
                user: snapshot.data().Name,
              });
            }
          })
          .catch((error) => {
            console.error("Error getting user data: ", error);
          });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home user={this.state.user} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/cartproducts"
                element={<Cart user={this.state.user} />}
              />
              <Route path="/addproducts" element={<AddProducts />} />
              <Route
                path="/cashout"
                element={<Cashout user={this.state.user} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;
