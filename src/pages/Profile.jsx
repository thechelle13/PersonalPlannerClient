import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { getUserEvents } from "../managers/EventManager";


export const Profile = ({ currentUser }) => {
  // Check if currentUser is not available (not logged in)
  if (!currentUser) {
    window.alert("You must be a registered user to access this page.");
    return <Navigate to="/login" replace />;
  }

  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const events = await getUserEvents(currentUser.id);
         setUserEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Display an error message to the user
        // You can set an error state and render it in the UI
      }
    };

    fetchUserEvents();

    // No cleanup function needed in this case

  }, [currentUser.id]); // Trigger effect when currentUser changes

  // Render the profile content for logged-in users
  return (
    <>
      <div className="min-h-screen">
        <div className="p-8">
          <h1 className="text-3xl text-Seafoam font-bold mb-4">Hello, {currentUser.firstName}!</h1>
          <div className="mb-8">
            <h2 className="text-2xl  text-Seafoam font-bold mb-4">Profile Page</h2>
            <div className="bg-opacity-50 border border-Seafoam border-opacity-50 p-6 rounded-lg shadow-lg mb-8">
  <div className="flex items-center mb-4">
    <i className="fas fa-house-user text-5xl mr-4 text-Seafoam"></i>
    <div>
      <h3 className="text-2xl font-semibold mb-2 text-Seafoam">User Information</h3>
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <span className="font-bold text-lg mr-2 text-Seafoam">City:</span>
          <span className="font-bold text-lg text-goldenrod">{currentUser.pp_user.city}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-bold text-lg mr-2 text-Seafoam">State:</span>
          <span className="font-bold text-lg text-goldenrod">{currentUser.pp_user.state}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-bold text-lg mr-2 text-Seafoam">Zipcode:</span>
          <span className="font-bold text-lg text-goldenrod">{currentUser.pp_user.zipcode}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-bold text-lg mr-2 text-Seafoam">Address:</span>
          <span className="font-bold text-lg text-goldenrod">{currentUser.pp_user.address}</span>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="bg-opacity-50 border border-Seafoam border-opacity-50 p-6 rounded-lg shadow-lg">
  <h1 className="text-3xl text-Seafoam font-semibold mb-2 underline">My Events</h1>
  {userEvents.length === 0 ? (
    <p className="text-Seafoam">No events found.</p>
  ) : (
    <ul>
      {userEvents.map((event) => (
        <li key={event.id} className="mb-4">
          <Link to={`/create-event/${event.id}`} className="text-blue-500 hover:underline">
            <p className="text-Seafoam">Date: {event.event_date}</p>
            <p className="text-Seafoam">Title: {event.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>

          </div>
        </div>
      </div>
    </>
  );
};
