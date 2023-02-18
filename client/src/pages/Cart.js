import React, { useEffect, useState } from "react";
import { ListGroup, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  getTotal,
  increment,
  remove,
} from "../features/cart/cartSlice";
import instance from "../config/axiosConfig";

function Cart() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems, cartTotal } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotal());
  });

  const checkout = async () => {
    setLoading(true);
    const stripeUrl = await instance.post("/stripe", {
      data: cartItems,
    });
    if (stripeUrl.data.url) {
      window.location.assign(stripeUrl.data.url); // Forwarding user to Stripe
    }
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
            onClick={() => dispatch(decrement(item._id))}
          ></i>
          <div className="mx-3">{item.quantity}</div>
          <i
            className="bi bi-plus-circle-fill"
            onClick={() => dispatch(increment(item._id))}
          ></i>
        </div>
      </div>
      <span className="text-center">
        <div className="d-flex">${item.productPrice}</div>
        <Link
          className="text-decoration-none text-danger"
          to="#"
          onClick={() => dispatch(remove(item._id))}
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
            {cartItems.length > 0 ? (
              <div>
                <h3 className="fw-bold mt-3 text-center">
                  Total: ${cartTotal.toFixed(2)}
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
