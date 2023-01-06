import React, { useContext, useState, useEffect } from "react";
import {
  updateProfile,
  updateEmail,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../config/firebase";

const UserContext = React.createContext();

export function UserData() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userItems, getUserItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [globalLoader, setGlobalLoader] = useState(true);

  async function loadUser() {
    setGlobalLoader(true);
    try {
      const token = await currentUser.getIdToken();
      const id = currentUser.uid;
      const user = await axios.post(
        "/users",
        { uid: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (user.data) {
        setUserDetails(user.data);
      }
      setGlobalLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUser(data) {
    const token = await currentUser.getIdToken();
    const id = currentUser.uid;
    setGlobalLoader(true);
    try {
      // Updates firebase data
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        email: data.email,
      });
      await axios.put(
        "/users",
        {
          uid: id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          bio: data.bio,
          photoURL: data.photoURL,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGlobalLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadUserImage(base64Image) {
    const token = await currentUser.getIdToken();
    const id = currentUser.uid;
    setGlobalLoader(true);
    try {
      await axios.put(
        "http://localhost:5000/edit-profile-image",
        {
          _id: id,
          data: base64Image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGlobalLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToWishlist(product) {
    const token = await currentUser.getIdToken();
    const id = currentUser.uid;
    setGlobalLoader(true);
    try {
      await axios.post(
        "/wishlist",
        {
          uid: id,
          data: product,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGlobalLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getWishlist() {
    const token = await currentUser.getIdToken();
    const id = currentUser.uid;
    setGlobalLoader(true);
    try {
      const userData = await axios.get(
        `/wishlist/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (userData) {
        setWishlistItems(userData.data);
        setGlobalLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(wishListItemId) {
    const token = await currentUser.getIdToken();
    const id = currentUser.uid;
    setGlobalLoader(true);
    try {
      await axios.put(
        "/wishlist",
        {
          uid: id,
          _id: wishListItemId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGlobalLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userItems,
    userDetails,
    globalLoader,
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    wishlistItems,
    uploadUserImage,
    loadUser,
    updateEmail,
    updateUser,
  };

  return (
    <div>
      <UserContext.Provider value={value}>
        {!loading && children}
      </UserContext.Provider>
    </div>
  );
}
