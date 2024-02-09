import React, { useState, useEffect } from "react";
import { CalendarDaysData } from "./CalendarDaysData";
import { PostNewEventButton } from "./PostNewEventButton";
import "./Calendar.css";
import { CategoryFilter } from "./CategoryFilter";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = ({ currentUser }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
            (event) => event.categoryId === parseInt(selectedCategory)
          ),
        ])
      )
    : events;

  const filterEventsBySearch = (events, searchQuery) => {
    return Object.fromEntries(
      Object.entries(events).map(([date, eventArray]) => [
        date,
        eventArray.filter((event) =>
          event.className.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      ])
    );
  };

  const searchedEvents = filterEventsBySearch(filteredEvents, searchQuery);

  return (
    <>
      <div className="calendar">
        <div className="header">
          <div className="month">{`${months[currentMonth]} ${currentYear}`}</div>
          {currentUser.isStaff ? (
            <>
              <PostNewEventButton />
            </>
          ) : (
            
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          <input
            type="text"
            placeholder="Search Events"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="btns">
            {/* Use HTML version of the arrow icon */}
            <i
              className="fas fa-arrow-right arrow-icon"
              onClick={handleNextClick}
            ></i>
            <i
            className="fas fa-arrow-right arrow-icon rotate-180"
            onClick={handlePrevClick}
          ></i>
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
            prevLastDayDate={prevLastDayDate}
            firstDay={firstDay}
            lastDayDate={lastDayDate}
            currentYear={currentYear}
            currentMonth={currentMonth}
            nextDays={nextDays}
            events={searchedEvents}
          />
        </div>
        <div className="current-date">
          <p>{`Today: ${currentDate.toDateString()}`}</p>
        </div>
      </div>
    </>
  );
};
