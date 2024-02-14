import React, { useState, useEffect } from 'react';
import { postEvent } from '../../managers/EventManager';
import { getCategories } from '../../managers/CategoryManager';


export const EventForm = ({currentUser}) => {
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
    eventCity: '',
    eventState: '',
    eventAddress: '',
    eventZipcode: '',
    categoryId: '', // Add a field for category ID
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ... (existing code)

    const eventData = {
      user: currentUser, // Replace with the actual user ID or get it dynamically
      category: formData.categoryId,
      title: formData.eventTitle,
      description: formData.eventDescription,
      event_date: formData.eventDate,
      event_time: `${formData.eventTime}`, // Assuming start time is provided
      city: formData.eventCity,
      state: formData.eventState,
      address: formData.eventAddress,
      zipcode: parseInt(formData.eventZipcode, 10),
      // Include other fields as needed
    };

    try {
      const createdEvent = await postEvent(eventData);

      console.log('Event created successfully:', createdEvent);
      // Optionally, you can redirect the user after successful form submission
      // history.push('/some-other-route');
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit}>
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
            type="Date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventStartTime" className="block text-sm font-medium text-gray-700">
            Event Start Time
          </label>
          <input
            type="time"
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
            rows="4"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
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
          <label htmlFor="eventZipcode" className="block text-sm font-medium text-gray-700">
            Event Zipcode
          </label>
          <input
            type="number"
            id="eventZipcode"
            name="eventZipcode"
            value={formData.eventZipcode}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Add more form fields as needed */}
        <button
          type="submit"
          className="inline-block p-2 px-4 mr-2 text-sm font-medium leading-5 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring-blue active:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};