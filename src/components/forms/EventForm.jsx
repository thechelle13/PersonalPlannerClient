import React, { useState } from 'react';

export const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Optionally, you can redirect the user after form submission
    // history.push('/some-other-route');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
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
