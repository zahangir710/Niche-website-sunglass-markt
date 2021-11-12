import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.initializer";

initializeAuthentication();
const auth = getAuth();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoadding, setIsLoadding] = useState(true);
  const [loginError, setLoginError] = useState("");

  const createUser = (email, password, history, name) => {
    setIsLoadding(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoginError("");
        const newUser = { email, displayName: name };
        setUser(newUser);
        // send name to firebase
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            // Profile updated!
          })
          .catch((error) => {
            setLoginError(error.message);
          });
        history.replace("/home");
      })
      .catch((error) => {
        setLoginError(error.message);
        // ..
      })
      .finally(() => setIsLoadding(false));
  };
  const login = (email, password, history, location) => {
    setIsLoadding(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoginError("");
        const destination = location?.state?.from || "/";
        const user = userCredential.user;
        setUser(user);
        history.replace(destination);
      })
      .catch((error) => {
        setLoginError(error.message);
      })
      .finally(() => {
        setIsLoadding(false);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoadding(true);
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoadding(false);
    });
    return unsubscribe;
  }, []);
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  return {
    createUser,
    loginError,
    user,
    isLoadding,
    login,
    logout,
  };
};
export default useFirebase;
