import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { LoadProducts } from "../contexts/ProductContext";
import { GetCartItems } from "../contexts/CartContext";
import { UseAuth } from "../contexts/AuthContext";
import { UserData } from "../contexts/UserContext";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, product, globalLoader, setProduct } = LoadProducts();
  const { addToCart } = GetCartItems();
  const { currentUser } = UseAuth();
  const { addToWishlist, wishlistItems, getWishlist, removeFromWishlist } =
    UserData();

  const loadProduct = async () => {
    try {
      await getProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
    // return () => {
    //   setProduct({});
    // };
  }, [id]);

  if (!product) {
    return <Navigate to="*" />;
  }

  const addToFavorites = async (product) => {
    if (!currentUser) {
      toast.error("Please login to use this feature");
      navigate("/login");
    } else {
      try {
        await addToWishlist(product);
        toast.success("Item added to Wishlist");
      } catch (error) {
        toast.error("Could not add item to your Wishlist");
      }
    }
  };

  // const remove = async (productId) => {
  //   try {
  //    await removeFromWishlist(productId);
  //     getWishlist();
  //     toast.success("Item removed from Wishlist");
  //   } catch (error) {
  //     toast.error("Could not remove item from your Wishlist");
  //     console.log(error);
  //   }
  // };

  // const userWishlist = <>{wishlistItems.find((item) => item._id === product._id) ? (
  //   <Link
  //     to="/wishlist"
  //     className="text-decoration-none"
  //     // onClick={() => remove(product._id)}
  //   >
  //     Saved to Wishlist
  //   </Link>
  // ) : (
  //   <button
  //     type="button"
  //     className="btn btn-outline-secondary btn-sm px-4"
  //     onClick={() => addToFavorites(product)}
  //   >
  //     <i className="bi bi-heart mb-1"></i> Add to Wishlist
  //   </button>
  //  )} </>

  return (
    <Container>
      {globalLoader ? (
        <Spinner />
      ) : (
        <div>
          <main>
            <div className="container col-xxl-8 px-4 py-5">
              <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
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
                      onClick={() => addToCart(product)}
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
                  No Reviews
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
