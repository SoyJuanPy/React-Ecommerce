import React, { Component } from "react";
import { ProductsContextProvider } from "./Global/ProductsContext";
import { Home } from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { NotFound } from "./Components/NotFound";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Importación modular
import { CartContextProvider } from "./Global/CartContext";
import { Cart } from "./Components/Cart";
import { AddProducts } from "./Components/AddProducts";
import { Cashout } from "./Components/Cashout";

export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const auth = getAuth(); // Instancia de autenticación
    const db = getFirestore(); // Instancia de Firestore

    // getting user info for navigation bar
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Usamos doc() y getDoc() en lugar de db.collection()
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
              {/* home */}
              <Route path="/" element={<Home user={this.state.user} />} />
              {/* signup */}
              <Route path="/signup" element={<Signup />} />
              {/* login */}
              <Route path="/login" element={<Login />} />
              {/* cart products */}
              <Route
                path="/cartproducts"
                element={<Cart user={this.state.user} />}
              />
              {/* add products */}
              <Route path="/addproducts" element={<AddProducts />} />
              {/* cashout */}
              <Route
                path="/cashout"
                element={<Cashout user={this.state.user} />}
              />
              {/* not found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;
