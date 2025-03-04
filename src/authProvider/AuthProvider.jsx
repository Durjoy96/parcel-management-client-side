import { auth } from "@/firebase/firebase.config";
import AxiosPublic from "@/hooks/AxiosPublic/AxiosPublic";
import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();
  const [userDBId, setUserDBId] = useState();
  const useAxios = AxiosPublic();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const updateUser = (name, imageURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imageURL,
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        // console.log(currentUser);
        const userInfo = { email: currentUser.email };
        useAxios.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        setUser(null);
        setLoading(false);
        localStorage.removeItem("access-token");
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const {} = useQuery({
    enabled: !!user?.email,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await useAxios.get(`/user?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      // console.log(res.data);
      setRole(res.data.role);
      setUserDBId(res.data._id);
      return res.data;
    },
  });

  const authInfo = {
    createUser,
    user,
    loading,
    updateUser,
    googleSignIn,
    signInWithPassword,
    logOut,
    role,
    userDBId,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
