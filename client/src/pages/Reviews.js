import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { getProduct } from "../features/products/products-thunk";
import { getReviews } from "../features/reviews/review-thunk";


function Reviews() {
  const [formView, setFormView] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productReviews, isLoading } = useSelector((state) => state.reviews);
  const { product } = useSelector((state) => state.products);
//   const showForm = () => setFormView(!formView);

  useEffect(() => {
    dispatch(getReviews(id));
    dispatch(getProduct(id));
  }, [id, dispatch]);

  if (!product || !productReviews) {
    return <Navigate to="/error" />;
  }

  const reviews = (productReviews.map((review) => (
    <div className="border mb-2 p-4" key={review._id}>
      {/* <hr className="mt--3" style={{ height: "1px" }} /> */}
      <div className="d-flex flex-start">
        <div>
          <h5 className="fw-bold mb-1">{review.title}</h5>
          <div className="d-flex align-items-center mb-3">
            <p className="mb-0">
              <small>Maggie M. - March 07, 2021</small>
            </p>
            <a href="#!" className="link-muted">
              <i className="fas fa-pencil-alt ms-2"></i>
            </a>
            <a href="#!" className="link-muted">
              <i className="fas fa-redo-alt ms-2"></i>
            </a>
            <a href="#!" className="link-muted">
              <i className="fas fa-heart ms-2"></i>
            </a>
          </div>
          <p className="mb-0">{review.body}</p>
        </div>
      </div>
    </div>
  )))

  return (
    <>
      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner />
        </div>
      ) : (
        <Container>
          <section>
            <div>
              <div className="row d-flex justify-content-center">
                <h1 className="text-center mt-2">Reviews</h1>
                <small className="text-center">Reviews for {product.productName}</small>
                <div className="p-4">
                  <div className="text-dark">
                    {/* Start of the review */}
                    {reviews ? reviews : (
                        <div>
                        <p className="fw-bold text-center mt-4">
                          No reviews available
                        </p>
                        <div className="mt-5">
                        <ReviewForm />
                        </div>
                      </div>
                    )}
                    {reviews ? (
                      <div>
                        <ReviewForm />
                      </div>
                    ) : (
                      ""
                    )}

                    {/* <div className="text-center mt-3">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={showForm}
                      >
                        Write a review
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      )}
    </>
  );
}

export default Reviews;
