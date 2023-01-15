import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductContext = React.createContext();

export function LoadProducts() {
    return useContext(ProductContext);
  }

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [globalLoader, setGlobalLoader] = useState(true);

  async function getProducts() {
    setGlobalLoader(true);
    try {
      const items = await axios.get("/products");
      setProducts(items.data);
      setGlobalLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProduct(productId) {
    setGlobalLoader(true);
    try {
      const item = await axios.get(`/product/${productId}`);
      setProduct(item.data);
      setGlobalLoader(false);
    } catch (error) {
      setProduct(null)
      console.log(error.code);
    }
  }

  const value = {
    getProducts,
    getProduct,
    setProduct,
    product,
    products,
    globalLoader,
  };

  return (
      <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
  );
}
