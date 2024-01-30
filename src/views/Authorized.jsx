import { Navigate, Outlet } from "react-router-dom"
import NavBar from "../components/nav/NavBar";


export const Authorized = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};
