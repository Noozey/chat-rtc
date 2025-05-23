// AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase-setting";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      try {
        if (!user) {
          setUser(null);
          return;
        }
        const newUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };
        setUser(newUser);
      } catch (error) {
        console.error("Error during auth state change:", error);
      }
    });

    return () => unsub();
  }, []);

  const signUserOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUserOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
