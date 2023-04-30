import React, { useEffect, useState } from "react";
import { ListGroup, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
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
  const { userDetails } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch]);

  const checkout = async () => {
    try {
      setLoading(true);
      const stripeUrl = await instance.post("/api/stripe/checkout", {
        items: cartItems,
        id: userDetails.uid
      });
      if (stripeUrl.data.url) {
        window.location.assign(stripeUrl.data.url); // Forwarding user to Stripe
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const increase = (id) => {
    dispatch(increment(id));
    dispatch(getTotal());
  };

  const decrease = (id) => {
    dispatch(decrement(id));
    dispatch(getTotal());
  };

  const removeProduct = (id) => {
    dispatch(remove(id));
    dispatch(getTotal());
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
            onClick={() => decrease(item._id)}
          ></i>
          <div className="mx-3">{item.quantity}</div>
          <i
            className="bi bi-plus-circle-fill"
            onClick={() => increase(item._id)}
          ></i>
        </div>
      </div>
      <span className="text-center">
        <div className="d-flex">${item.productPrice}</div>
        <Link
          className="text-decoration-none text-danger"
          to="#"
          onClick={() => removeProduct(item._id)}
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
                <p className="fw-bold mt-3">Total: ${cartTotal.toFixed(2)}</p>
                {/* <Link to="#" className="btn float-right" onClick={() => dispatch(clearCart())}>Clear cart</Link> */}
                <div className="text-center">
                  <Button
                    disabled={isLoading}
                    className="w-50 btn-sm"
                    onClick={checkout}
                  >
                    {isLoading ? "Please wait..." : "Checkout"}
                  </Button>
                </div>
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
