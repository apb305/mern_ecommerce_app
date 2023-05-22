import { useEffect } from "react";
import { Card, Button, Container, Placeholder, CardImg } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/features/cart/cartSlice";
import { getProducts } from "../store/features/products/products-thunk";
import Paginate from "../components/Paginate";

function Products() {
  const { products, isLoading, pages, page } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const { pageNumber } = useParams();
  const productsPage = pageNumber || 1;
  const navigate = useNavigate();

  useEffect(() => {
    if (pageNumber > pages || pageNumber < 1) {
      navigate("/products");
    } else {
      dispatch(getProducts(productsPage));
    }
  }, [dispatch, productsPage]);

  return (
    <>
      {isLoading ? (
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
                          to={`/products/${product._id}`}
                        >
                          <img
                            src={product.img}
                            className="productImage"
                            alt={product.productName}
                          />
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
                    </Card>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Paginate page={page} pages={pages} />
              </div>
            </main>
          </Container>
        </div>
      )}
    </>
  );
}

export default Products;
