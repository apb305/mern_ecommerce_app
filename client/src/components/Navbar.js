import React, { Fragment } from "react";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UseAuth } from "../contexts/AuthContext";
import { GetCartItems } from "../contexts/CartContext";

export default function NavigationBar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { cartItems } = GetCartItems();
  // const user = useSelector((state) => state.user.user);
  const { currentUser, logout } = UseAuth();

  async function onLogout() {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const authLinks = (
    <Fragment>
      <NavDropdown.Item className=" text-dark" as={Link} to="/account-settings">
        Account Settings
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item className=" text-dark" as={Link} to="/wishlist">
        Wishlist
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item className=" text-dark" onClick={onLogout}>
        <i className="bi bi-box-arrow-right"></i>{" "}
        <span className="hide-sm">Logout</span>
      </NavDropdown.Item>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavDropdown.Item className="text-dark" as={Link} to="/login">
        Login
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item className="text-dark" as={Link} to="/register">
        Register
      </NavDropdown.Item>
    </Fragment>
  );

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav.Link className="navbar-brand" as={Link} to="/">
            eCommerce App
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-link text-dark" as={Link} to="/products">
                Products
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                align="end"
                title={
                  <i
                    className="bi bi-person-circle text-dark"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                }
                id="dropdown-menu-align-end"
              >
                {currentUser ? authLinks : guestLinks}
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                className="nav-link position-relative d-inline-flex"
                as={Link}
                to="/cart"
              >
                <i
                  className="bi bi-cart-fill text-dark"
                  style={{ fontSize: "1.5rem" }}
                ></i>
                {cartItems.length > 0 ? (
                  <span className="cart-basket d-flex align-items-center justify-content-center">
                    {cartItems.length}
                  </span>
                ) : (
                  ""
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
