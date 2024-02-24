import React, { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import { deleteEvent, getEventDetails, rsvpToEvent, updateEvent } from '../managers/EventManager';
import { getCategories } from '../managers/CategoryManager';


// eslint-disable-next-line react/prop-types
export const EventDetails = ({ currentUser }) => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: '',
    categoryId: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
    eventCity: '',
    eventAddress: '',
    eventState: '',
    eventZipcode: ''
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch event details
        const details = await getEventDetails(eventId);
        setEventDetails(details);

        // Fetch categories
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        // Initialize formData with eventDetails values
        setFormData({
          eventTitle: details.title || '',
          categoryId: details.category.id || '',
          eventDate: details.event_date || '',
          eventTime: details.event_time || '',
          eventDescription: details.description || '',
          eventCity: details.city || '',
          eventAddress: details.address || '',
          eventState: details.state || '',
          eventZipcode: details.zipcode || ''
        });
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!eventDetails) {
    return <div className="text-goldenrod">Loading...</div>;
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      // Extract the fields you want to update from your form state or other sources
      const updatedFields = {
        title: formData.eventTitle,
        event_date: formData.eventDate,
        event_time: formData.eventTime,
        description: formData.eventDescription,
        city: formData.eventCity,
        address: formData.eventAddress,
        state: formData.eventState,
        zipcode: formData.eventZipcode,
        category: formData.categoryId
      };

      // Perform the update using the fetch function
      await updateEvent(eventId, updatedFields);

      // After a successful update, disable edit mode and refetch event details
      setEditMode(false);
      const updatedDetails = await getEventDetails(eventId);
      setEventDetails(updatedDetails);
    } catch (error) {
      console.error('Error updating event:', error);
      // Handle error if needed
    }
  };
  const handleRSVP = async () => {
    try {
        // Assuming you have an API function for RSVP
        await rsvpToEvent(eventId);
        // Refresh event details after RSVP
        const updatedDetails = await getEventDetails(eventId);
        console.log('Updated event details:', updatedDetails);
        setEventDetails(updatedDetails);
        alert('RSVP successful!');
    } catch (error) {
        console.error('Error RSVPing to event:', error);
        // Handle error if needed
    }
};
  const handleDelete = async () => {
    try {
      // Assuming you have a function to delete the event in your manager
      await deleteEvent(eventId);
      navigate('/calendar');
      alert(' Your Event Was Successfully Deleted ');
      // Navigate back to the calendar page after a successful deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      // Handle error, show a message, etc.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // eslint-disable-next-line react/prop-types
  const hasRSVPd = eventDetails.attendees.some((attendee) => attendee.id === currentUser.id);
  console.log('attendees:', eventDetails.attendees);
  console.log('currentUser.id:', currentUser.id);
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto bg-Navy rounded-md shadow-md p-6 mb-6">
        {editMode ? (
          <>
          <div className="mb-4">
            <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">
              Event Display Name/Title
            </label>
            <input
              type="text"
              id="eventTitle"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
              Event Date
            </label>
            <input
              type="text"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">
              Event Time
            </label>
            <input
              type="text"
              id="eventTime"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventCity" className="block text-sm font-medium text-gray-700">
              Event City
            </label>
            <input
              type="text"
              id="eventCity"
              name="eventCity"
              value={formData.eventCity}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventAddress" className="block text-sm font-medium text-gray-700">
              Event Address
            </label>
            <input
              type="text"
              id="eventAddress"
              name="eventAddress"
              value={formData.eventAddress}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventState" className="block text-sm font-medium text-gray-700">
              Event State
            </label>
            <input
              type="text"
              id="eventState"
              name="eventState"
              value={formData.eventState}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventZipcode" className="block text-sm font-medium text-gray-700">
              Event Zipcode
            </label>
            <input
              type="text"
              id="eventZipcode"
              name="eventZipcode"
              value={formData.eventZipcode}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </>
        ) : (
          <>
            <h1 className="text-goldenrod text-3xl font-bold mb-4">{eventDetails.title}</h1>
            <div>
              <h3 className="text-lg text-goldenrod font-semibold mb-2">Category: {eventDetails.category.label}</h3>
              <p className="text-goldenrod">
                <strong>Date:</strong> {eventDetails.event_date}
              </p>
              <p className="text-goldenrod">
                <strong>Start Time:</strong> {eventDetails.event_time}
              </p>
              <p className="text-goldenrod">
                <strong>Description:</strong> {eventDetails.description}
              </p>
              <p className="text-goldenrod">
                <strong>City:</strong> {eventDetails.city}
              </p>
              <p className="text-goldenrod">
                <strong>State:</strong> {eventDetails.state}
              </p>
              <p className="text-goldenrod">
                <strong>Address:</strong> {eventDetails.address}
              </p>
              <p className="text-goldenrod">
                <strong>Zipcode:</strong> {eventDetails.zipcode}
              </p>
              <div className="mt-4 flex justify-center">
                {!hasRSVPd && (
                  <button
                    onClick={handleRSVP}
                    className="bg-Green hover:bg-black-700 text-goldenrod py-2 px-4 rounded-lg"
                  >
                    RSVP Now
                  </button>
                )}
                {hasRSVPd && (
                  <p className="text-goldenrod">
                    You have already RSVP'd to this event.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        <div className="mt-4 flex justify-center">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-Seafoam hover:bg-black-700 text-goldenrod py-2 px-4 rounded-lg mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-Gray hover:bg-black-700 text-goldenrod py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleDelete}
                className="bg-Red hover:bg-black-700 text-goldenrod py-2 px-4 rounded-lg mr-4"
              >
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="bg-Seafoam hover:bg-black-700 text-goldenrod py-2 px-4 rounded-lg"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};