import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = React.createContext();

export function GetCartItems() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify([...cartItems]));
  }, [cartItems]);

  async function addToCart(product) {
    //Check if the item exists in the cart.
    const itemAlreadyExists = cartItems.find(
      (item) => item._id === product._id
    );
    if (itemAlreadyExists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success("Item added to cart");
    }
  }

  async function decrement(product) {
    //Check if the item exists in the cart.
    const itemInCart = cartItems.find((item) => item._id === product._id);
    if (itemInCart.quantity == 1) {
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  }

  async function removeSingleItem(product) {
    setCartItems(
      cartItems.filter((item) => {
        return item._id !== product._id;
      })
    );
  }

  function cartTotal() {
    const total = cartItems.reduce(
      (total, current) => (total += current.productPrice * current.quantity),
      0
    );
    return total;
  }

  const value = {
    addToCart,
    decrement,
    removeSingleItem,
    cartTotal,
    cartItems,
  };

  return (
    <div>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </div>
  );
}
