import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Card, Form, Button, Container } from "react-bootstrap";
import { UseAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import OAuth from "../components/OAuth";

export default function Register() {
  // const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { signup } = UseAuth();
  const { isAuthUser } = useSelector((state) => state.auth);
  const { email, password, passwordConfirm, name } = formData;

  // const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    try {
      if (Object.keys(errors).length === 0) {
        setLoading(true);
        setFormErrors({})
        const data = new FormData(event.currentTarget);
        const formData = {
          name: data.get("name"),
          email: data.get("email"),
          password: data.get("password"),
        };
        await signup(formData.email, formData.password, formData.name);
        // navigate(-1);
      } else {
        setFormErrors(errors);
      }
    } catch (error) {
      console.log(error.code)
      setLoading(false);
      if(error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      }
    }
  };

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!name) {
      errors.name = "Name is required!";
    }
    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!password) {
      errors.password = "Password is required!";
    } else if (password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    if (password !== passwordConfirm) {
      errors.password = "Passwords do not match";
    }
    return errors;
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      {isAuthUser && (
          <Navigate to="/" replace={true} />
        )}
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body className="bg-light shadow-sm">
            <h4 className="text-center mb-2">Sign Up</h4>
            <Form onSubmit={onSubmit}>
              <Form.Group id="name">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                ></Form.Control>
                <p className="text-danger mt-1">{formErrors.name}</p>
              </Form.Group>
              <Form.Group id="email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                ></Form.Control>
                <p className="text-danger mt-1">{formErrors.email}</p>
              </Form.Group>
              <Form.Group id="password">
                <Form.Control
                  type="password"
                  // type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                ></Form.Control>
                <p className="text-danger mt-1">{formErrors.password}</p>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Control
                  type="password"
                  // type={showPassword ? "text" : "password"}
                  id="passwordConfirm"
                  placeholder="Confirm Password"
                  name="password"
                  value={passwordConfirm}
                  onChange={onChange}
                ></Form.Control>
                <p className="text-danger mt-1">{formErrors.password}</p>
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 mt-2 btn-dark"
                type="submit"
              >
                {loading ? "Please Wait..." : "Sign Up"}
              </Button>
              {/* Google Login */}
              {/* <OAuth /> */}
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
