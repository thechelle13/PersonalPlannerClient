import React from 'react';
import './pages.css';
import { useNavigate } from "react-router-dom";

export const Calendar = ({ currentUser }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const navigate = useNavigate();


  const handleCreateEvent = () => {
    if (!currentUser) {
      alert("You are not authorized to create an event. Please Log in or Register.");
    } else {
      // Redirect to the create event page
      navigate("/create-event");
    }
  };

  const renderCalendar = () => {
    const calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < firstDayIndex; i++) {
      calendar.push(<div key={`empty-${i}`} className="text-center"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      calendar.push(
        <div
          key={`day-${i}`}
          className={`text-center p-2 border border-black ${
            i === currentDay ? 'bg-blue-900 text-white' : 'text-black'
          }`}
        >
          {i}
        </div>
      );
      dayCounter++;
    }

    while (dayCounter <= 35) {
      calendar.push(<div key={`empty-${dayCounter}`} className="text-center"></div>);
      dayCounter++;
    }
    return calendar;
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Calendar</h1>
      <p>Display basic calendar information here.</p>
      <div className="container mx-auto w-80%">
        <div className="flex flex-col items-center mt-4">
          <div className="grid grid-cols-7 gap-1 mb-2 w-full">
            {days.map((day, index) => (
              <div
                key={`day-${index}`}
                className="text-center font-bold p-2 border border-black bg-blue-900 text-white rounded-md"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 w-full">
            {renderCalendar()}
          </div>
          <button
            className="text-center font-bold p-2 border border-black bg-blue-900 text-white rounded-md"
            onClick={handleCreateEvent}
          >
            Create An Event
          </button>
        </div>
      </div>
    </div>
  );
};


