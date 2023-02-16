import { Card, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/products/products-thunk";
import { addToCart } from "../features/cart/cartSlice";
import { addToUserWishlist, getUserWishlist, removeFromUserWishlist } from "../features/wishlist/wishlist-thunk";
import { toast } from "react-toastify";

function Products() {
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.user)


  useEffect(() => {
    dispatch(getProducts())
  }, []);

  // const addToFavorites = (product) => {
  //   if (!userDetails) {
  //     toast.error("Please login to use this feature");
  //     navigate("/login");
  //   } else {
  //     try {
  //       dispatch(addToUserWishlist(product));
  //       dispatch(getUserWishlist(userDetails.uid));
  //       toast.success("Item added to Wishlist");
  //     } catch (error) {
  //       toast.error("Could not add item to your Wishlist");
  //       console.log(error);
  //     }
  //   }
  // };

  // const removeFromWishlist = (product) => {
  //   try {
  //     dispatch(removeFromUserWishlist(product));
  //     dispatch(getUserWishlist(userDetails.uid));
  //     // toast.success("Item removed from Wishlist");
  //   } catch (error) {
  //     toast.error("Could not remove item from your Wishlist");
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {isLoading ? (
        <Spinner />
        // <Container>
        //   <main>
        //     <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        //       <CardSkeleton />
        //     </div>
        //   </main>
        // </Container>
      ) : (
        <div>
          <header>
            <h1 className="text-center mt-2">Electronics</h1>
          </header>
          <Container>
            <main>
              <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
                {products.map((product) => (
                  <div className="col text-center mt-5" key={product._id}>
                    <Card className="text-center">
                      <Card.Body>
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/product/${product._id}`}
                        >
                          <img src={product.img} className="productImage" />
                          <Card.Title className="mt-2">
                            {product.productName}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            $ {product.productPrice}
                          </Card.Subtitle>
                        </Link>
                        <Button
                          variant="dark text-center btn-sm mt-3"
                          onClick={() => dispatch(addToCart(product))}
                        >
                          Add to cart
                        </Button>
                      </Card.Body>

                      {/* <div className="mb-2">
          {userDetails.wishlist.find((item) => item._id === product._id) ? (
            <Link
            // to="/wishlist"
              className="text-decoration-none"
              onClick={() => removeFromWishlist(product._id)}
            >
               Remove from Wishlist
            </Link>
          ) : (
            <button
              type="button"
              disabled={isLoading}
              className="btn btn-outline-dark btn-sm px-4"
              onClick={() => addToFavorites(product)}
            >
              <i className="bi bi-heart mb-1"></i> Add to Wishlist
            </button>
          )}
        </div> */}
                    </Card>
                  </div>
                ))}
              </div>
            </main>
          </Container>
        </div>
      )}
    </>
  );
}

export default Products;
