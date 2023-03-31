import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Success from "./pages/Success";
import ForgotPassword from "./pages/ForgotPassword";
import AccountSettings from "./pages/AccountSettings";
import PrivateRoute from "./components/PrivateRoute";
import Wishlist from "./pages/Wishlist";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./contexts/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
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
            <Route path="/add-product" element={<AdminRoute />}>
              <Route path="/add-product" element={<AddProduct />} />
            </Route>
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/products" element={<Products />} />
            <Route path="/products/page/:pageNumber" element={<Products />} exact />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
      <ToastContainer autoClose={1500} hideProgressBar={true} />
    </>
  );
}

export default App;
