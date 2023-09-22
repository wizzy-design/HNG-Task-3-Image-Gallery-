import Nav from "./components/Nav";
import Grids from "./components/Grids";
import SignIn from "./components/auth/SignIn";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [keyWord, setKeyWord] = useState(" ");

  return (
    <div>
      <Nav keyWord={keyWord} setKeyWord={setKeyWord} />
      <Routes>
        <Route
          path="/"
          element={<Grids keyWord={keyWord} setKeyWord={setKeyWord} />}
        />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
