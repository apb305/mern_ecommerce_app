import { useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserData } from "../contexts/UserContext";
import { GetCartItems } from "../contexts/CartContext";

function Wishlist() {
  const [isLoading, setLoading] = useState(true);
  const { getWishlist, wishlistItems, removeFromWishlist } = UserData();
  const { addToCart } = GetCartItems();

  const getUserWishlist = async () => {
    try {
      await getWishlist();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserWishlist();
  }, []);

  const remove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      getWishlist();
      toast.success("Item removed from Wishlist");
    } catch (error) {
      toast.error("Could not remove item from your Wishlist");
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <header>
            <h1 className="text-center mt-3">Wishlist</h1>
          </header>
          <main>
            <Container>
              <ListGroup as="ol" className="mb-5">
                {wishlistItems.length > 0 ? (
                  wishlistItems.map((product) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      key={product._id}
                    >
                      <div className="ms-2 me-auto text-left">
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/product/${product._id}`}
                        >
                          <div className="fw-bold mb-2">{product.productName}</div>
                          <img
                            src={product.img}
                            style={{ width: 50, height: 50 }}
                            alt={product.productName}
                          ></img>
                          <p className="mt-3">${product.productPrice}</p>
                        </Link>
                        <div className="mt-2 justify-content-left">
                          <Button
                            variant="dark text-center btn-sm"
                            onClick={() => addToCart(product)}
                          >
                            Add to cart
                          </Button>
                        </div>
                      </div>
                      {/* <Badge bg="primary" pill>
                      14
                    </Badge> */}

                      <div>
                        <Link
                          to="#"
                          className="text-decoration-none text-danger"
                          onClick={() => remove(product._id)}
                        >
                          Remove
                        </Link>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <p className="fw-bold text-center mt-4">
                    No Wishlist items available
                  </p>
                )}
              </ListGroup>
            </Container>
          </main>
        </div>
      )}
    </>
  );
}

export default Wishlist;
