import { useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import {
  getUserWishlist,
  removeFromUserWishlist,
} from "../features/wishlist/wishlist-thunk";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function Wishlist() {
  
  const dispatch = useDispatch();
  const { wishlist, isLoading } = useSelector((state) => state.wishlist);

  useEffect(() =>{
    dispatch(getUserWishlist());
  },[])

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
                {wishlist.length > 0 ? (
                  wishlist.map((product) => (
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
                          <div className="fw-bold mb-2">
                            {product.productName}
                          </div>
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
                            onClick={() => dispatch(addToCart(product))}
                          >
                            Add to cart
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Link
                          to="#"
                          className="text-decoration-none text-danger"
                          onClick={() => dispatch(removeFromUserWishlist(product._id))}
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
