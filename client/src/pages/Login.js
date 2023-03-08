import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

export default function Login() {
  // const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate(-1);
      }
    } catch (error) {
      setLoading(false)
      toast.error("Bad User Credentials");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center mt-5"
      style={{ minHeight: "40vh" }}
    >
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
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className="passwordInput"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                ></Form.Control>
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
              <Link className="text-decoration-none" to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="text-center mt-3">
              Need an account? <Link className="text-decoration-none" to="/register">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
