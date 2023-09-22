// This component handles the conditional rendering of the Login/Out button

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { Link } from "react-router-dom";

function Login_in_out() {
  const [user, setUser] = useState(null); // State to store the authenticated user

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    // Sign out the user when the logout button is clicked
    signOut(auth);
  };

  return (
    <div>
      {user ? (
        // If a user is authenticated, render the logout button
        <button onClick={handleLogout}>Logout</button>
      ) : (
        // If no user is authenticated, render the login button or other content
        <button>
          <Link to="/login">Login</Link>
        </button>
      )}
    </div>
  );
}

export default Login_in_out;
