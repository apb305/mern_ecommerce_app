import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { getProducts } from "./features/products/products-thunk";

function Products() {
  const { products, isLoading } = useSelector((state) => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

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
                          to={`/product/${product._id}`}
                        >
                          <img src={product.img} className="productImage" alt={product.productName} />
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
            </main>
          </Container>
        </div>
      )}
    </>
  );
}

export default Products;
