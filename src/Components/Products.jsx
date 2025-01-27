import React, { useContext } from "react";
import { ProductsContext } from "../Global/ProductContext";
import { CartContext } from "../Global/CartContext";

export const Products = () => {
  const { products } = useContext(ProductsContext);

  const { dispatch } = useContext(CartContext);

  return (
    <>
      {products.length !== 0 && <h1>Productos</h1>}
      <div className="products-container">
        {products.length === 0 && <div>Cargando Productos...</div>}
        {products.map((product) => (
          <div className="product-card" key={product.ProductID}>
            <div className="product-img">
              <img src={product.ProductImg} alt="not found" />
            </div>
            <div className="product-name">{product.ProductName}</div>
            <div className="product-price">USD {product.ProductPrice}.00</div>
            <button
              className="addcart-btn"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  id: product.ProductID,
                  product,
                })
              }
            >
              Agregar Al Carrito
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
