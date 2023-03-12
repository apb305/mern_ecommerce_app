import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { getReviews } from "../features/reviews/review-thunk";

function Reviews() {
  //   const [formView, setFormView] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { productReviews, product, isLoading } = useSelector(
    (state) => state.reviews
  );
  //   const showForm = () => setFormView(!formView);

  useEffect(() => {
    dispatch(getReviews(id));
    if (!productReviews) {
        navigate("/products")
      }
  }, [dispatch, id ]);

    

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
                {product.productName ? <small className="text-center">
                  Reviews for {product.productName}
                </small> : ""}
                
                <div className="p-4">
                  <div className="text-dark">
                    {/* Start of the review */}
                    {productReviews.length > 0 ? (
                      <div>
                        <div className="my-3">
                          <ReviewForm />
                        </div>
                        {productReviews.map((review) => (
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
                        ))}{" "}
                      </div>
                    ) : (
                      <div>
                        <p className="fw-bold text-center mt-4">
                          No reviews available
                        </p>
                        <div className="mt-5">
                          <ReviewForm />
                        </div>
                      </div>
                    )}
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

