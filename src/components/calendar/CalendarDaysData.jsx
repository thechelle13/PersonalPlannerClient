import { Link } from "react-router-dom";
import { useEffect } from "react";

import "./Calendar.css";
import { getEvents } from "../../managers/EventManager";

export const CalendarDaysData = ({
  setEvents,
  prevLastDayDate,
  firstDay,
  lastDayDate,
  currentYear,
  currentMonth,
  events,
  nextDays,
  selectedCategory,
}) => {
  const formatDateKey = (day) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth =
      currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
    const formattedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;
    console.log(`Formatted Date: ${formattedDate}`);
    console.log(`Events for this date:`, events[formattedDate]);
    return formattedDate;
  };
  const organizeEventsByDate = (eventsArray) => {
    const eventsByDate = {};
  
    eventsArray.forEach((event) => {
      const dateKey = event.start_datetime; // Adjust this according to your event date property
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(event);
    });
  
    return eventsByDate;
  };
  
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        // Fetch events
        const eventsArray = await getEvents();

        // Organize events by date
        const eventsByDate = organizeEventsByDate(eventsArray);

        // Set events in state
        setEvents(eventsByDate);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <>
      {/*Rendering previous month at the beginning of the calendar display*/}
      {Array.from({ length: firstDay.getDay() }).map((_, index) => (
        <div className="day prev" key={`prev-${index}`}>
          {prevLastDayDate - firstDay.getDay() + index + 1}
        </div>
      ))}

      {Array.from({ length: lastDayDate }).map((_, index) => {
        const dayNumber = index + 1;
        const formattedDate = formatDateKey(dayNumber);

        const dayEvents = events[formattedDate] || [];

        return (
          <div
            className={`day${dayEvents.length > 0 ? " has-events" : ""}${
              dayNumber === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? " today"
                : ""
            }`}
            key={dayNumber}
          >
            {dayNumber}

            {dayEvents.map((event, eventIndex) => (
              <Link
                to={`/events/${event.id}`}
                key={`event-${eventIndex}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="flex">
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    {/* You can add more event details as needed */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      })}

      {Array.from({ length: nextDays }).map((_, index) => (
        <div className="day next" key={`next-${index}`}>
          {index + 1}
        </div>
      ))}
    </>
  );
};