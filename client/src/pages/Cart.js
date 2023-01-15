import React, { useState } from "react";
import { ListGroup, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetCartItems } from "../contexts/CartContext";

function Cart() {
  const { cartItems, addToCart, decrement, removeSingleItem, cartTotal } =
    GetCartItems();
  const total = cartTotal();
  const [isLoading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);
    await fetch("/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.assign(data.url); // Forwarding user to Stripe
        }
      });
  };

  const renderedProducts = cartItems.map((item) => (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-start"
      key={item._id}
    >
      <div className="ms-2 me-auto text-left">
        <Link
          className="text-decoration-none text-dark"
          to={`/product/${item._id}`}
        >
          <p className="fw-bold mb-2">{item.productName}</p>
          <img
            src={item.img}
            style={{ width: 50, height: 50 }}
            alt={item.productName}
          ></img>
        </Link>
        <div className="d-flex mt-2 justify-content-left">
          <i
            className="bi bi-dash-circle-fill"
            onClick={() => decrement(item)}
          ></i>
          <div className="mx-3">{item.quantity}</div>
          <i
            className="bi bi-plus-circle-fill"
            onClick={() => addToCart(item)}
          ></i>
        </div>
      </div>
      <span className="text-center">
        <div className="d-flex">${item.productPrice}</div>
        <Link
          className="text-decoration-none text-danger"
          to="#"
          onClick={() => removeSingleItem(item)}
        >
          Remove
        </Link>
      </span>
    </ListGroup.Item>
  ));
  return (
    <div>
      <header>
        <h1 className="text-center mt-3">Shopping Cart</h1>
      </header>
      <main>
        <Container>
          <ListGroup as="ol" numbered>
            {renderedProducts}
          </ListGroup>
          <div>
            {" "}
            {total > 0 ? (
              <div>
                <h3 className="fw-bold mt-3 text-center">
                  Total: ${total.toFixed(2)}
                </h3>
                <Button
                  disabled={isLoading}
                  className="w-100"
                  onClick={checkout}
                >
                  {isLoading ? "Please wait..." : "Checkout"}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p className="mt-4 fw-bold">Your cart is empty</p>
                <Link to="/products" className="mt-2 text-decoration-none">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}

export default Cart;
