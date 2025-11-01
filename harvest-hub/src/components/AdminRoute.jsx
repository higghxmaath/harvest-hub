import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Show nothing or a loading screen while checking
  if (user === undefined) return <div>Checking admin access...</div>;

  // Not logged in → redirect
  if (!user) return <Navigate to="/admin-login" replace />;

  return children;
}
