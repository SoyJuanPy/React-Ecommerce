import React, { createContext } from "react";
import { db } from "../Config/Config"; // Asegúrate de que db se importa correctamente
import { collection, onSnapshot } from "firebase/firestore"; // Métodos modulares de Firestore

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const productsCollection = collection(db, "Products"); // Accedemos a la colección de productos

    // Usamos onSnapshot para escuchar los cambios en la colección
    onSnapshot(productsCollection, (snapshot) => {
      const productsArray = snapshot.docs.map((doc) => ({
        ProductID: doc.id,
        ProductName: doc.data().ProductName,
        ProductPrice: doc.data().ProductPrice,
        ProductImg: doc.data().ProductImg,
      }));

      // Actualizamos el estado con los productos obtenidos
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
