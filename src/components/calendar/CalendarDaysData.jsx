import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Calendar.css";
import { getEvents, getEventsByCategory } from "../../managers/EventManager";

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

  const convertToStandardTime = (time) => {
    const [hours, minutes] = time.split(":");
    const isPM = hours >= 12;
    const standardHours = isPM ? hours - 12 : hours;
    return `${standardHours}:${minutes} ${isPM ? "PM" : "AM"}`;
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
  useEffect(() => {
    const fetchEventsByCategory = async () => {
      try {
        const eventsArray = await getEventsByCategory(selectedCategory);
        console.log('Events Array:', eventsArray);
        const organizedEvents = organizeEventsByDate(eventsArray);
        setEventsByDate(organizedEvents);
      } catch (error) {
        console.error('Error fetching events by category:', error);
      }
    };

    // Check if a category is selected before making the fetch
    if (selectedCategory) {
      fetchEventsByCategory();
    }
  }, [selectedCategory]);

  const organizeEventsByDate = (eventsArray) => {
    const eventsByDate = {};

    eventsArray.forEach((event) => {
      const dateKey = event.event_date; // Assuming event_date is the property containing the date
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }

      // Check if the event has the selected category or if no category is selected
      if (!selectedCategory || event.category.id === parseInt(selectedCategory)) {
        eventsByDate[dateKey].push(event);
      }
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
                    <p>{convertToStandardTime(event.event_time)}</p>
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
