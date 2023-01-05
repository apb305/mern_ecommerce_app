import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderCompletion from "./components/OrderCompletion";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import ForgotPassword from "./pages/ForgotPassword";
import AccountSettings from "./pages/AccountSettings";
import PrivateRoute from "./components/PrivateRoute";
import Wishlist from "./pages/Wishlist";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <UserProvider>
                <NavigationBar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/account-settings" element={<PrivateRoute />}>
                    <Route path="/account-settings" element={<AccountSettings />} />
                  </Route>
                  <Route path="/wishlist" element={<PrivateRoute />}>
                    <Route path="/wishlist" element={<Wishlist />} />
                  </Route>
                  <Route path="/products" element={<Products />} />
                  {/* <Route path="/payment" element={<Payment />} /> */}
                  <Route path="/success" element={<OrderCompletion />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
              </UserProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </Router>
      <ToastContainer autoClose={1500} hideProgressBar={true} />
    </>
  );
}

export default App;
