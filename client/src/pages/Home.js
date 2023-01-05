import { Container } from "react-bootstrap";
import FeaturedItemsCarousel from "../components/FeaturedItemsCarousel";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import HomePageDeals from "../components/HomePageDeals";

function Home() {


  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);


  // const addToFavorites = async (product) => {
  //   if (!user) {
  //     toast.error('Please login to use this feature')
  //     navigate('/login')
  //   } else {
  //     // setLoading(true);
  //     try { 
  //         const userRef = doc(db, "users", user.uid);
  //         await updateDoc(userRef, {
  //           favorites: arrayUnion(product),
  //         });
  //         setItem(prevItems => [...prevItems, product])
  //         toast.success("Item added to Wishlist");
  //       // setLoading(false);
  //     } catch (error) {
  //       toast.error("Could not add item to your Wishlist");
  //       // setLoading(false);
  //     }
  //   }
  // };


  return (
    <>
      {/* {loading ? (
        <Spinner />
      ) : ( */}
        <div>
          <header>
            <FeaturedItemsCarousel />
          </header>
          <Container>
            <main>
              <div className="text-center mt-4">
                <HomePageDeals />
                <div className="d-flex justify-content-between mt-3">
                  <div className="row g-4"></div>
                </div>
              </div>
            </main>
          </Container>
        </div>
      {/* )} */}
    </>
  );
}

export default Home;
