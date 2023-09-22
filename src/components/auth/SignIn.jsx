// This component handles the logging in of a user. It displays the Login Page
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null); // State to track login error
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    setLoginError(null); // Reset any previous login error

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        // Set the login error message based on the Firebase error code
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-login-credentials"
        ) {
          setLoginError("Incorrect email or password. Please try again.");
        } else {
          if (error.code === "auth/too-many-requests") {
            setLoginError(
              "Access has been temporarily disabled due to many failed login attempts. You can reset your password or try again later."
            );
          } else {
            setLoginError(
              "An error occurred while logging in. Please try again later."
            );
          }
        }
      });
  };

  return (
    <div className="relative h-screen pt-32 bg-slate-700">
      <form
        onSubmit={signIn}
        className="absolute flex flex-col items-center p-8 space-y-6 -translate-x-1/2 -translate-y-1/2 border-4 border-black border-solid rounded-md left-1/2 top-1/2"
      >
        <h1 className="pb-20 text-3xl font-bold text-white">Log In to your Account</h1>
        <input
          className="p-1.5 rounded-md pl-2 outline-none  w-72"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-1.5 rounded-md outline-none pl-2 w-72"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="p-2 px-4 font-medium bg-white rounded-md">Log In</button>
        {loginError && <p className="text-white">{loginError}</p>}{" "}
        {/* Render error message if loginError is not null */}
      </form>
    </div>
  );
};

export default SignIn;
