import { Navigate } from "react-router-dom";

export const Profile = ({ currentUser }) => {
  // Check if currentUser is not available (not logged in)
  if (!currentUser) {
    
    window.alert("You must be a registered user to access this page.");
    return <Navigate to="/login" replace />;
    // Alternatively, you can show a message without redirection
    // return <p>Please log in to view your profile.</p>;
  }

  // Render the profile content for logged-in users
  return (
    <>
      <h1>Hello, {currentUser.username}!</h1>
      {/* Add other profile content here */}
    </>
  );
};