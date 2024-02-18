import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Calendar.css";
import { getEvents } from "../../managers/EventManager";

export const CalendarDaysData = ({
  prevLastDayDate,
  firstDay,
  lastDayDate,
  currentYear,
  currentMonth,
  nextDays,
  selectedCategory,
}) => {
  const [eventsByDate, setEventsByDate] = useState({});

  const formatDateKey = (day) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
    const formattedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const eventsArray = await getEvents();
        const organizedEvents = organizeEventsByDate(eventsArray);
        setEventsByDate(organizedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventsData();
  }, []);

  const organizeEventsByDate = (eventsArray) => {
    const eventsByDate = {};

    eventsArray.forEach((event) => {
      const dateKey = event.event_date; // Assuming event_date is the property containing the date
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(event);
    });

    return eventsByDate;
  };

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
        const dayEvents = eventsByDate[formattedDate] || [];

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
                to={`/create-event/${event.id}`}
                key={`event-${eventIndex}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="flex">
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <p>{event.event_time}</p>
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
