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
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../features/auth/authSlice";

const AuthContext = React.createContext();

export function UseAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  async function signup(email, password, name) {
    //Create user with Firebase Auth
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    //Create user in database.
    await axios.post("/api/signup", {
      uid: data.user.uid,
      name: data.user.displayName,
      email: data.user.email,
    });
    return data;
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
      const updatedPassword = updatePassword(
        (await reauthenticated).user,
        newPassword
      );
      if (updatedPassword) {
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        dispatch(setAuthUser({ email: user.email, name: user.displayName, uid: user.uid }));
      } else {
        dispatch(setAuthUser({ name: null, uid: null, email: null }));
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [dispatch]);

  const value = {
    currentUser,
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
