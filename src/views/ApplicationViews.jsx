import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("current_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (newUser) => {
    localStorage.setItem("current_user", JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Authorized currentUser={currentUser} setCurrentUser={setUser} />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/profile"
          element={<Authorized currentUser={currentUser} setCurrentUser={setUser} />}
        >
          <Route index element={<Profile currentUser={currentUser} />} />
        </Route>
        {/* Add other Routes here */}
      </Routes>
    </>
  );
};
