import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mt-5" style={{background: "rgb(247,247,247"}}>
      <div className="container">
        <footer className="py-3 mt-4">
          <ul className="nav justify-content-center pb-3 mb-3">
            <li className="nav-item ">
              <Link to="/" className="nav-link px-2 text-dark">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link px-2 text-dark">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link px-2 text-dark">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link px-2 text-dark">
                FAQs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link px-2 text-dark">
                About
              </Link>
            </li>
          </ul>
          <p className="text-center text-dark">© 2022 Some Ecommerce Company, Inc</p>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
