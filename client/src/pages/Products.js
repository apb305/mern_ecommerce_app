import { Card, Button, Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  addToUserWishlist,
  getUserWishlist,
  removeFromUserWishlist,
} from "../features/user/userSlice";
import { LoadProducts } from "../contexts/ProductContext";
import { UseAuth } from "../contexts/AuthContext";
import { GetCartItems } from "../contexts/CartContext";

function Products() {
  const navigate = useNavigate();
  const { getProducts, products, globalLoader } = LoadProducts();
  const { currentUser } = UseAuth();
  const { addToCart } = GetCartItems();

  const loadProducts = async () => {
    try {
      await getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // const addToFavorites = (product) => {
  //   if (!currentUser) {
  //     toast.error("Please login to use this feature");
  //     navigate("/login");
  //   } else {
  //     try {
  //       const item = { product: product, id: currentUser.uid };
  //       dispatch(addToUserWishlist(item));
  //       dispatch(getUserWishlist(currentUser.uid));
  //       toast.success("Item added to Wishlist");
  //     } catch (error) {
  //       toast.error("Could not add item to your Wishlist");
  //       console.log(error);
  //     }
  //   }
  // };

  // const removeFromWishlist = (product) => {
  //   try {
  //     const item = { product: product, id: currentUser.uid };
  //     dispatch(removeFromUserWishlist(item));
  //     dispatch(getUserWishlist(currentUser.uid));
  //     toast.success("Item removed from Wishlist");
  //   } catch (error) {
  //     toast.error("Could not remove item from your Wishlist");
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {globalLoader ? (
        <Spinner />
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
                          onClick={() => addToCart(product)}
                        >
                          Add to cart
                        </Button>
                      </Card.Body>

                      {/* <div className="mb-2">
          {user && wishlist.find((item) => item.id === product.id) ? (
            <Link
            to="/wishlist"
              className="text-decoration-none"
              // onClick={() => removeFromWishlist(product)}
            >
               Saved to Wishlist
            </Link>
          ) : (
            <button
              type="button"
              disabled={loading}
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
