import React, { useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { UseAuth } from "../contexts/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../features/products/products-thunk";
import { addToCart } from "../features/cart/cartSlice";
import { addToUserWishlist } from "../features/wishlist/wishlist-thunk";
import { getReviews } from "../features/reviews/review-thunk";
import ReviewForm from "../components/ReviewForm";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.products);
  const { productReviews } = useSelector((state) => state.reviews);
  const { currentUser } = UseAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getReviews(id));
  }, [id, dispatch]);

  if (!product) {
    return <Navigate to="/error" />;
  }

  const addToFavorites = async (product) => {
    if (!currentUser) {
      toast.error("Please login to use this feature");
      navigate("/login");
    } else {
      try {
        dispatch(addToUserWishlist(product));
        toast.success("Item added to Wishlist");
      } catch (error) {
        toast.error("Could not add item to your Wishlist");
      }
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <main>
            <div className="container col-xxl-8 px-4 py-2">
              <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-2">
                <div className="col-10 col-sm-8 col-lg-6">
                  <img
                    src={product.img}
                    className="d-block mx-lg-auto img-fluid"
                    alt={`${product.productName}`}
                    width="700"
                    height="500"
                    loading="lazy"
                  />
                </div>
                <div className="col-lg-6">
                  <h1 className="display-5 fw-bold lh-1 mb-3">
                    {product.productName}
                  </h1>
                  <h4>${product.productPrice}</h4>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button
                      type="button"
                      className="btn btn-dark btn-sm px-4 me-md-2"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm px-4"
                      onClick={() => addToFavorites(product)}
                    >
                      <i className="bi bi-heart mb-1"></i> Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
              <Tabs
                defaultActiveKey="details"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="details" title="Details">
                  {product.productDescription}
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <div className="row d-flex justify-content-center">
                    <div className="">
                      <div className="text-dark">
                        {/* Start of the review */}
                        {/* {productReviews.length > 0 ? (
                          productReviews.map((review) => (
                            <div className="border mb-3 p-4" key={review._id}>
                              <div className="d-flex flex-start">
                                <div>
                                  <h5 className="fw-bold mb-1">
                                    {review.title}
                                  </h5>
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
                          ))
                        ) : (
                          <div>
                            <p className="fw-bold text-center mt-4">
                              No reviews available
                            </p>
                            <div className="mt-5">
                            <ReviewForm />
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  {productReviews.length > 0 ? (
                    <div className="text-center">
                      <Link
                        className="btn btn-sm btn-primary"
                        to={`/reviews/product/${product._id}`}
                      >
                        See All Reviews
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </Tab>
              </Tabs>
            </div>
          </main>
        </div>
      )}
    </Container>
  );
}

export default Product;
