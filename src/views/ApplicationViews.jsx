import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Weather } from "../pages/Weather";
import { EventForm } from "../components/forms/EventForm";
import { Calendar } from "../components/calendar/Calendar";
import { EventDetails } from "../pages/EventDetails";

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
          <Route path="/calendar" element={<Calendar currentUser={currentUser}/>} />
        <Route path="/weather" element={<Weather currentUser={currentUser} />} />
        </Route>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/profile"
          element={<Authorized currentUser={currentUser} setCurrentUser={setUser} />}
        >
          
          <Route index element={<Profile currentUser={currentUser} setCurrentUser={setUser}  />} />
     

        </Route>
        <Route path="/create-event" element={<Authorized currentUser={currentUser} setCurrentUser={setUser} />}>
          <Route index element={<EventForm />} />
          <Route path=":eventId" element={<EventDetails  currentUser={currentUser} setCurrentUser={setUser}/>} />
        </Route>

        {/* Add other Routes here */}
        
      </Routes>
    </>
  );
};
