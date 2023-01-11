import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  updateEmail,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  // signInWithRedirect,
} from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";

const AuthContext = React.createContext();

export function UseAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userItems, getUserItems] = useState({});
  const [item, setItem] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [globalLoader, setGlobalLoader] = useState(true);

  async function signup(email, password, name) {
    try {
      //Create user with Firebase Auth
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      //Create user in database.
      await axios.post("/auth", {
        uid: user.user.uid,
        name: user.user.displayName,
        email: user.user.email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  async function updateUserPassword(email, currentPassword, newPassword) {
    const user = auth.currentUser;
    const currentCredentials = EmailAuthProvider.credential(
      email,
      currentPassword
    );
    try {
      const reauthenticated = reauthenticateWithCredential(
        user,
        currentCredentials
      );
     const updatedPassword = updatePassword((await reauthenticated).user, newPassword);
     if(updatedPassword) {
      console.log(updatedPassword)
      toast.success("Your password has been updated");
     }  
    } catch (error) {
      toast.error("Could not update password");
    }
  }

  function sendPasswordReset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(
        auth,
        provider.setCustomParameters({
          prompt: "select_account",
        })
      );
      axios.post("/users", {
        _id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
      });
      await updateProfile(auth.currentUser, {
        displayName: result.user.displayName,
      });
    } catch (error) {
      toast.error("There was a problem logging in");
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
    sendPasswordReset,
    googleLogin,
    signup,
    login,
    logout,
    updateEmail,
    updateUserPassword,
  };

  return (
    <div>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </div>
  );
}
