import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UseAuth } from "../contexts/AuthContext";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

export default function Login() {
  // const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { currentUser } = UseAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    try {
      if (Object.keys(errors).length === 0) {
      setLoading(true);
      setFormErrors({})
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate(-1);
      }
    } else {
      setFormErrors(errors);
    }
    } catch (error) {
      setLoading(false);
      toast.error("Bad User Credentials");
    }
  };

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!password) {
      errors.password = "Password is required!";
    } 
    return errors;
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center mt-5"
      style={{ minHeight: "40vh" }}
    >
      {currentUser && (
          <Navigate to="/" replace={true} />
        )}
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body className="bg-light shadow-sm">
            <h4 className="text-center mb-4">Sign in</h4>
            <Form onSubmit={onSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  className="emailInput"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={onChange}
                ></Form.Control>
                <p className="text-danger mt-1">{formErrors.email}</p>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label className="mt-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  className="passwordInput"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                ></Form.Control>
                <p className="text-danger mt-1">{formErrors.password}</p>
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 mt-4 btn-dark"
                type="submit"
              >
                {loading ? "Please wait..." : "Log In"}
              </Button>
              {/* Google Login */}
              {/* <OAuth /> */}
            </Form>
            <div className="text-center mt-4">
              <Link className="text-decoration-none" to="/forgot-password">
                Forgot Password?
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
