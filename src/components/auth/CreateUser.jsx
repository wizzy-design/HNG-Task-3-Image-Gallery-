// This component is what creates the User's account

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

const CreateUser = () => {
  createUserWithEmailAndPassword(auth, "user@example.com", "1Password")
    .then((userCredential) => {
      // User created successfully
      // eslint-disable-next-line no-unused-vars
      const user = userCredential.user;
      // You can now use this user object to manage the user's authentication status.
    })
    .catch((error) => {
      // Handle errors, such as if the email is already in use or if the password is too weak.
      console.error(error);
    });
};

export default CreateUser;
