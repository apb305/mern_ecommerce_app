// import { useEffect, useState, useRef } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { login, logout, getUserWishlist } from "../features/user/userSlice";
// import { useDispatch, useSelector } from "react-redux";

// export const useAuthStatus = () => {
//   // const isMounted = useRef(true); //*useEffect cleanup function
//   const dispatch = useDispatch();
//   const [status, setStatus] = useState(false)
//   const auth = getAuth();

//   useEffect(() => {
//       onAuthStateChanged(auth, (userAuthenticated) => {
//         if (userAuthenticated) {
//           dispatch(login({
//             email: userAuthenticated.email,
//             uid: userAuthenticated.uid,
//             displayName: userAuthenticated.displayName,
//             photoUrl: userAuthenticated.photoURL,
//           }))
//           dispatch(getUserWishlist(userAuthenticated.uid))
//           setStatus(true)
//         } else {
//           dispatch(logout())
//         }
//       });
//   }, []);
//   return { status }
// };
