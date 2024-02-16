import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventDetails } from '../managers/EventManager';


export const EventDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await getEventDetails(eventId);
        setEventDetails(details);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!eventDetails) {
    return <div>Loading...</div>; // You might want to add a loading state
  }

  // Render your event details here using the 'eventDetails' state

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto bg-Navy rounded-md shadow-md p-6 mb-6">
        <h1 className=" text-goldenrod text-3xl font-bold mb-4">{eventDetails.title}</h1>
        <div>
          <h3 className="text-lg  text-goldenrod font-semibold mb-2">Category: {eventDetails.category.label}</h3>
          <p className=" text-goldenrod"><strong>Date:</strong> {eventDetails.event_date}</p>
          <p className=" text-goldenrod"><strong>Start Time:</strong> {eventDetails.event_time}</p>
          <p className=" text-goldenrod"><strong>Description:</strong> {eventDetails.description}</p>
          <p className=" text-goldenrod"><strong>City:</strong> {eventDetails.city}</p>
          <p className=" text-goldenrod"><strong>State:</strong> {eventDetails.state}</p>
          <p className=" text-goldenrod"><strong>Address:</strong> {eventDetails.address}</p>
          <p className=" text-goldenrod"><strong>Zipcode:</strong> {eventDetails.zipcode}</p>
          {/* Add more paragraphs as needed */}
        </div>
        <div className="mt-4 flex justify-center">
          <button className="bg-Seafoam hover:bg-black-700 text-goldenrod py-2 px-4 rounded-lg">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};