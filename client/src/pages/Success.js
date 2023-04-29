import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import instance from "../config/axiosConfig";
import { clearCart } from "../features/cart/cartSlice";

function Success() {
  const [orderDetails, setOrderDetails] = useState({
    orderName: "",
    orderEmail: "",
  });
  const [isLoading, setLoading] = useState(null);
  let urlParams = new URLSearchParams(window.location.search);
  let sessionId = urlParams.get("session_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmOrder = async () => {
    if (!sessionId) {
      navigate("/products");
    } else {
      setLoading(true);
      const res = await instance.post("api/stripe/success", {
        sessionId: sessionId,
      });
      setOrderDetails({
        orderName: res.data.name,
        orderEmail: res.data.email,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    confirmOrder();
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Container className="text-center mt-5">
            <header>
              <h1>
                Thank you for your order <span>{orderDetails.orderName}</span>!
              </h1>
            </header>
            <main>
              <div className="container text-center mt-4">
                <p className="mt-4">
                  A confirmation email has been sent to{" "}
                  {orderDetails.orderEmail}. If you have any questions, please
                  email
                  <a
                    className="text-decoration-none"
                    href="mailto:orders@example.com"
                  >
                    {""} orders@example.com.
                  </a>
                </p>
                <Link to={"/products"} className="btn btn-sm btn-primary mt-2">
                  {" "}
                  Continue Shopping
                </Link>
              </div>
            </main>
          </Container>
        </div>
      )}
    </Container>
  );
}

export default Success;
