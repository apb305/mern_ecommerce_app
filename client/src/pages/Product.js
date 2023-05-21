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
import Reviews from "../components/Reviews";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.products);
  const { isAuthUser} = useSelector((state) => state.authUser);
  const { productReviews, reviewsLoading } = useSelector(
    (state) => state.reviews
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getReviews(id));
  }, [id, dispatch]);

  const addToFavorites = async (product) => {
    if (!isAuthUser) {
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
                      Add to Wishlist
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
                    <div className="text-dark">
                      {/* Product reviews start here */}
                      {productReviews.length > 0 ? (
                        <div>
                          <div className="my-3">
                            <ReviewForm />
                          </div>
                          {reviewsLoading ? (
                            <Spinner />
                          ) : (
                            <Reviews reviews={productReviews} />
                          )}
                        </div>
                      ) : (
                        <div className="mt-3">
                          <p className="fw-bold text-center mt-4">
                            No reviews available
                          </p>
                          <ReviewForm />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* {productReviews.length > 0 ? (
                    <div className="text-center">
                      <Link
                        className="btn btn-sm btn-primary"
                        to={`/reviews/${product._id}`}
                      >
                        See All Reviews
                      </Link>
                    </div>
                  ) : (
                    ""
                  )} */}
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
