import { Link } from "react-router-dom";
import "./Calendar.css";

export const CalendarDaysData = ({
  prevLastDayDate,
  firstDay,
  lastDayDate,
  currentYear,
  currentMonth,
  events,
  nextDays,
  selectedCategory,
}) => {
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
        const currentDate = new Date(
          currentYear,
          currentMonth,
          dayNumber
        ).toDateString();

        const numberOfEvents = events[currentDate]
          ? events[currentDate].length
          : 0;

        return (
          <div
            className={`day${numberOfEvents > 1 ? " has-multiple-events" : ""}${
              dayNumber === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? " today"
                : ""
            }`}
            style={
              numberOfEvents > 1
                ? { backgroundColor: "#b0daf0", color: "#000" }
                : {}
            }
            key={dayNumber}
          >
            {dayNumber}

            {events[currentDate] &&
              events[currentDate].map((event, eventIndex) => (
                <Link
                  to={`/events/${event.id}`}
                  key={`event-${eventIndex}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex">
                    <div className="event-details">
                      <h3>{event.className}</h3>
                      <p>{event.teacherName}</p>
                      <p>{event.time}</p>
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