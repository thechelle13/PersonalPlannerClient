import { useNavigate } from "react-router-dom";
import "./PostNewEventButton.css";

export const PostNewEventButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="post-event-button"
        onClick={() => navigate("/PostNewEvent")}
      >
        Post New Event
      </button>
    </>
  );
};