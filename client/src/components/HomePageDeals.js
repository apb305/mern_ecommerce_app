import React from "react";

function HomePageDeals() {
  return (
    <div>
      <div className="container col-xxl-8 px-4">
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-2">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://res.cloudinary.com/dq0dmnn7q/image/upload/v1672768426/ipadpro_m7ozvo.jpg"
              className="img-fluid"
              alt="Bootstrap Themes"
              width="200"
              height="200"
              loading="lazy"
            />
          </div>

          {/* Featured Deal */}
          <div className="col-lg-6">
            <h2 className=" fw-bold lh-1 mb-3">Featured Deal</h2>
            <small>Regular Price:$ 1999.99</small> 
            <p className="lead">Now: $ 899.99</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="button"
                className="btn btn-sm btn-dark btn-lg px-4 me-md-2"
              >
                Buy Now
              </button>
            </div>
          </div>

{/* Product Category */}

<div>

</div>

        </div>
      </div>
    </div>
  );
}

export default HomePageDeals;
