import { Navigate, Outlet } from "react-router-dom"

export const Authorized = ({ currentUser, setUser  }) => {
  if (currentUser) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}
