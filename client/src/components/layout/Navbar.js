import React, { Fragment } from "react";
import { Navbar, Container, Nav, NavDropdown, Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UseAuth } from "../../contexts/AuthContext";

export default function NavigationBar() {
  const { isAuthUser } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart)
  const { signOut } = UseAuth();

 function onLogout() {
    try {
      signOut();
      toast.success("You have logged out successfully")
    } catch (error) {
      console.log(error);
    }
  }

  // const adminLinks = (
  //   <Fragment>
  //     <NavDropdown.Item className=" text-dark" as={Link} to="/admin">
  //       Admin Dashboard
  //     </NavDropdown.Item>
  //     <Dropdown.Divider />
  //     <NavDropdown.Item className=" text-dark" as={Link} to="/add-product">
  //       Add products
  //     </NavDropdown.Item>
  //     <Dropdown.Divider />
  //   </Fragment>
  // )
  
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
          <Navbar.Brand className="navbar-brand">
            <Link className="text-decoration-none text-dark" to="/">eCommerce App</Link>
          </Navbar.Brand>
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
                 {/* {currentUser && userDetails.isAdmin ? adminLinks : ""} */}
                {isAuthUser ? authLinks : guestLinks}
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