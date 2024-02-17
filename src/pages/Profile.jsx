import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { getAllEvents } from "../services/eventsService";

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
        const events = await getAllEvents(currentUser.id);
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
          <h1 className="text-3xl font-bold mb-4">Hello, {currentUser.firstName}!</h1>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
            <div className="mb-6 bg-Navy p-6 rounded-lg shadow-lg border border-black">
              <i className="fas fa-house-user fa-5x mb-4" style={{ color: '#DAA520' }}></i>
              <h3 className="text-lg font-semibold mb-4"></h3>
              <p className="font-bold text-2xl text-goldenrod mb-4">City: {currentUser.pp_user.city}</p>
              <p className="font-bold text-2xl text-goldenrod mb-4">State: {currentUser.pp_user.state}</p>
              <p className="font-bold text-2xl text-goldenrod mb-4">Zipcode: {currentUser.pp_user.zipcode}</p>
              <p className="font-bold text-2xl text-goldenrod mb-4">Address: {currentUser.pp_user.address}</p>
            </div>
            <div>
              <h1 className="text-lg font-semibold mb-2 underline">My Events</h1>
              {userEvents.length === 0 ? (
                <p>No events found.</p>
              ) : (
                <ul>
                  {userEvents.map((event) => (
                    <li key={event.id} className="mb-4">
                      <Link to={`/create-event/${event.id}`} className="text-blue-500 hover:underline">
                      <p>Date: {event.event_date}</p>
                      <p>Title: {event.title}</p>
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
