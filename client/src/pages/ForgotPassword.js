import React, { useState } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UseAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const { sendPasswordReset } = UseAuth();
 
  const { email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await sendPasswordReset(email);
      toast.success("Check your inbox for further instructions");
    } catch (error) {
      toast.error("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body className="bg-light shadow-sm">
            <div className="text-center mb-4">
              <h4>Forgot your password?</h4>
              <small>Enter your email below to reset your password</small>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  required
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 mt-2 btn-dark"
                type="submit"
              >
                {loading ? "Please Wait..." : "Reset Password"}
              </Button>
            </Form>
            <div className="text-center mt-4">
              Already have an account?{" "}
              <Link className="text-decoration-none" to="/login">
                Login
              </Link>
            </div>
            <div className="text-center mt-3">
              Need an account?{" "}
              <Link className="text-decoration-none" to="/register">
                Sign Up
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
