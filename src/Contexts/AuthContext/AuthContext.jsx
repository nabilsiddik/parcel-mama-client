import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Swal from "sweetalert2";
import { auth } from "../../Firebase/firebase.init";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const authContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [allTutorials, setAllTutorials] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [limitNumberOfEquipment, setLimitNumberOfEquipment] = useState([]);


  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/users`
      );

      return data;
    },
  });




  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // User registraton with email and password
  const createUser = (email, password, displayName, photoURL) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update profile info after successfully registration
        profileUpdate({ displayName: displayName, photoURL: photoURL });

        Swal.fire({
          position: "center center",
          icon: "success",
          title: "Registration Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error.code}. ${error.message}`,
        });
      });
  };

  // Login in with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
      .then(async(result) => {

        // send user infor to database
      
        Swal.fire({
          position: "center center",
          icon: "success",
          title: "Login With google Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error.code}. ${error.message}`,
        });
      });
  };

  // Login with email and password
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        Swal.fire({
          position: "center center",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error.code}. ${error.message}`,
        });
      });
  };

  // Update user profile
  const profileUpdate = (updatedInfo) => {
    return updateProfile(auth.currentUser, updatedInfo)
      .then(() => {
        Swal.fire({
          position: "center center",
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error.code}. ${error.message}`,
        });
      });
  };

  // Sign out
  const userSignOut = () => {
    return signOut(auth)
      .then(() => {
        Swal.fire({
          position: "center center",
          icon: "success",
          title: "Signed Out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error.code}. ${error.message}`,
        });
      });
  };

  // currently signed in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        // const {data} = await axios.post(`${import.meta.env.VITE_MAIN_URL}/jwt`, {
        //     email: currentUser?.email
        // }, {withCredentials: true})
        // console.log(data)
        console.log(currentUser)

        // Send new user data database
        const {data} = await axios.post(`${import.meta.env.VITE_MAIN_URL}/users/${currentUser?.email}`, {
          name: currentUser?.displayName,
          email: currentUser?.email,
          image: currentUser?.photoURL
        })
      }else{
        console.log('user not available')

        // const {data} = await axios.get(`${import.meta.env.VITE_MAIN_URL}/logout`, {withCredentials: true})
      }

      setLoading(false)

    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authContextValue = {
    createUser,
    signInWithGoogle,
    signIn,
    profileUpdate,
    userSignOut,
    user,
    loading,
    allTutorials,
    setAllTutorials,
    darkMode,
    setDarkMode,
    allUsers
  };

  return (
    <authContext.Provider value={authContextValue}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
