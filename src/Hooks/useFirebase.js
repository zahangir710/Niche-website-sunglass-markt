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
  const [admin, setAdmin] = useState(false);

  const createUser = (email, password, history, name) => {
    setIsLoadding(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = { email, displayName: name };
        // send data to db
        sendUserToDB(newUser);

        setUser(newUser);
        setLoginError("");

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
  //function for Storing user Data to BD
  const sendUserToDB = (user) => {
    const storeUesr = { name: user.displayName, email: user.email };
    fetch("https://hidden-refuge-12669.herokuapp.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(storeUesr),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
  useEffect(() => {
    fetch(`https://hidden-refuge-12669.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  return {
    createUser,
    loginError,
    setLoginError,
    user,
    isLoadding,
    login,
    logout,
    admin,
  };
};
export default useFirebase;
