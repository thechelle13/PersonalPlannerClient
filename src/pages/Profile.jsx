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
      <div className="min-h-screen">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Hello, {currentUser.firstName}!</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">User Information</h3>
            <p>City: {currentUser.pp_user.city}</p>
            <p>State: {currentUser.pp_user.state}</p>
            <p>Zipcode: {currentUser.pp_user.zipcode}</p>
            <p>Address: {currentUser.pp_user.address}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 underline">My Events</h3>
            {/* Add your events rendering logic here */}
            {/* For example, you can map through user's events and display them */}
            {/* {currentUser.events.map(event => (
              <div key={event.id} className="mb-4">
                <p className="text-sm font-semibold">Event Name: {event.name}</p>
                <p className="text-sm">Date: {event.date}</p>
                {/* Add more event details as needed */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};