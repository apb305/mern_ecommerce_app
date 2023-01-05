import React from "react";
import { Link } from "react-router-dom";

function FeaturedItemsCarousel() {
  return (
    <>
      <div className="jumbotron p-5 text-center">
        <h1 className="display-4">Electronics eCommerce app</h1>
        <Link to="/products" className="btn btn-sm btn-outline-dark btn-lg px-4">
            Shop Now
          </Link>
      </div>

    </>
  );
}

export default FeaturedItemsCarousel;
