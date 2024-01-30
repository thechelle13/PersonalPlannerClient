import React from 'react';
import './pages.css'


export const Home = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get the total number of days in the current month
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the index of the first day of the month (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendar = () => {
    const calendar = [];
    let dayCounter = 1;

    // Render empty cells for days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
      calendar.push(<div key={`empty-${i}`} className="text-center"></div>);
    }

    // Render days of the month
    for (let i = 1; i <= totalDays; i++) {
      calendar.push(
        <div
          key={`day-${i}`}
          className={`text-center p-2 ${
            i === currentDay ? 'bg-blue-900 text-white' : 'text-black'
          }`}
        >
          {i}
        </div>
      );
      dayCounter++;
    }

    // Render empty cells for days after the last day of the month
    while (dayCounter <= 35) {
      calendar.push(<div key={`empty-${dayCounter}`} className="text-center"></div>);
      dayCounter++;
    }

    return calendar;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, index) => (
          <div
            key={`day-${index}`}
            className="text-center font-bold p-2 bg-blue-900 text-white rounded-md"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
    </div>
  );
};

 
