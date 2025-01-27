import React, { createContext } from "react";
import { db } from "../Config/Config";
import { collection, onSnapshot } from "firebase/firestore";

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const productsCollection = collection(db, "Products");

    onSnapshot(productsCollection, (snapshot) => {
      const productsArray = snapshot.docs.map((doc) => ({
        ProductID: doc.id,
        ProductName: doc.data().ProductName,
        ProductPrice: doc.data().ProductPrice,
        ProductImg: doc.data().ProductImg,
      }));

      this.setState({
        products: productsArray,
      });
    });
  }

  render() {
    return (
      <ProductsContext.Provider value={{ products: [...this.state.products] }}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}
