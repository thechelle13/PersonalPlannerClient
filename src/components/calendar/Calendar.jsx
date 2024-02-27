import React, { useState, useEffect } from "react";
import { CalendarDaysData } from "./CalendarDaysData";
import "./Calendar.css";
import { CategoryFilter } from "./CategoryFilter";
import { useNavigate } from "react-router-dom";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = ({ currentUser }) => {
  const [filteredEventsByCategory, setFilteredEventsByCategory] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);



  useEffect(() => {
    // You can fetch events data here if needed
    // For now, let's assume events are hardcoded or fetched elsewhere
    // const eventsArray = ...; // Fetch or hardcode events
    // const eventsByDate = organizeEventsByDate(eventsArray);
    // setEvents(eventsByDate);
  }, []); // Empty dependency array means this effect runs only once on mount

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  const handlePrevClick = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextClick = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  const filteredEvents = selectedCategory
    ? Object.fromEntries(
        Object.entries(events).map(([date, eventArray]) => [
          date,
          eventArray.filter(
            (event) => event.category === parseInt(selectedCategory)
          ),
        ])
      )
    : events;


  

  const navigate = useNavigate();

  const handleCreateEvent = () => {
    if (!currentUser) {
      alert("You are not authorized to create an event. Please Log in or Register.");
    } else {
      // Redirect to the create event page
      navigate("/create-event");
    }
  };


  return (
    <>
      <div className="calendar">
        <div className="header">
          {currentUser && currentUser.isStaff ? (
            null
          ) : (
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setFilteredEvents={setFilteredEventsByCategory}
            />
          )}
        </div>
        <div className="header">
          <div className="mx-auto flex items-center">
            <i className="fas fa-arrow-left arrow-icon text-4xl mr-8" style={{ color: '#8BE5AD' }} onClick={handlePrevClick}></i>
            <div className="month">{`${months[currentMonth]} ${currentYear}`}</div>
            <i className="fas fa-arrow-right arrow-icon text-4xl ml-8" style={{ color: '#8BE5AD' }} onClick={handleNextClick}></i>
          </div>
        </div>
        <div className="weekdays">
          {days.map((day) => (
            <div className="day" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          <CalendarDaysData
            setEvents={setEvents}
            prevLastDayDate={prevLastDayDate}
            firstDay={firstDay}
            lastDayDate={lastDayDate}
            currentYear={currentYear}
            currentMonth={currentMonth}
            nextDays={nextDays}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="current-date">
          <p>{`Today: ${currentDate.toDateString()}`}</p>
        </div>
        <button
          className="text-center font-bold p-2 border border-black bg-navy bg-Navy text-white rounded-md hover:bg-Seafoam"
          onClick={handleCreateEvent}
        >
        Create An Event
      </button>
      </div>
    </>
  )};