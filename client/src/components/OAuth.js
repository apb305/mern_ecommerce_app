import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import googeIcon from "../assets/svg/googleIcon.svg";
import { Button } from "react-bootstrap";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const onGoogleClick = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider.setCustomParameters({
          prompt: 'select_account'
      }));
      const user = result.user;

      // // Check for user
      // const docRef = doc(db, "users", user.uid);
      // const docSnap = await getDoc(docRef);

      // // Add user to the database if not in database
      // if (!docSnap.exists()) {
      //   await setDoc(doc(db, "users", user.uid), {
      //     name: user.displayName,
      //     email: user.email,
      //     timestamp: serverTimestamp()
      //   });
      // }
      navigate('/products')
    } catch (error) {
        toast.error('Could not authorize with Google')
    }
  };
  return (
    <div className="socialLogin">
  <p className="text-center mt-3">Or</p>{" "}
      <Button className="btn-danger w-100" onClick={onGoogleClick}>
      {location.pathname === "/register" ? "Sign up" : "Log in"} with Google
      </Button>
    </div>
  );
}

export default OAuth;