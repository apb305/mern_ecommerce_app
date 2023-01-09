import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button, Container } from "react-bootstrap";
import { UseAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

export default function Register() {
  // const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { signup } = UseAuth();
  const { email, password, passwordConfirm, name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      return toast("Passwords do not match");
    }
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const formData = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      };
      await signup(
        formData.email,
        formData.password,
        formData.name
      );
      navigate("/products");
    } catch (error) {
      setLoading(false);
      toast.error("An error has occured");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body className="bg-light shadow-sm">
            <h4 className="text-center mb-2">Sign Up</h4>
            <Form onSubmit={onSubmit}>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  // type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  // type={showPassword ? "text" : "password"}
                  id="passwordConfirm"
                  placeholder="Confirm Password"
                  name="password"
                  value={passwordConfirm}
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4 btn-dark" type="submit">
                {loading ? "Please Wait..." : "Sign Up"}
              </Button>
              <OAuth />
            </Form>
            <div className="text-center mt-4">
              Already have an account?{" "}
              <Link className="text-decoration-none" to="/login">
                Log In
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}