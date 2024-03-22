
// Function to fetch all events
export const getEvents = async () => {
  try {
    const response = await fetch('http://https://personal-planner-hryyx.ondigitalocean.app//events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Remove Authorization header for unauthenticated requests
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    // Handle errors gracefully
    throw error;
  }
};
export const getUserEvents = async () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));

    if (!currentUser || !currentUser.token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(`http://https://personal-planner-hryyx.ondigitalocean.app//events/list_user_events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${currentUser.token}`, // Assuming you have a function to get the user token
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user events: ${response.statusText}`);
    }

    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching user events:', error.message);
    throw error;
  }
};

  export const postEvent = async (eventData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch('http://https://personal-planner-hryyx.ondigitalocean.app//events', {
        method: 'POST',
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
  
      const createdEvent = await response.json();
      return createdEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };
  
  export const getEventDetails = async (eventId) => {
    try {
      const response = await fetch(`http://https://personal-planner-hryyx.ondigitalocean.app//events/${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
  
      const eventDetails = await response.json();
      return eventDetails;
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  };
  
  export const deleteEvent = async (eventId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch(`http://https://personal-planner-hryyx.ondigitalocean.app//events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
  
  
      return true; // Resolve the promise indicating successful deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };
  export const updateEvent = async (eventId, updatedFields) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch(`http://https://personal-planner-hryyx.ondigitalocean.app//events/${eventId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
  
      // Assuming your API returns the updated event details
      const updatedEvent = await response.json();
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  export const rsvpToEvent = async (eventId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
        const response = await fetch(`http://https://personal-planner-hryyx.ondigitalocean.app//events/${eventId}/rsvp`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${currentUser.token}`, // Assuming you have a function to get the user token
            },
            // You can pass any additional data needed for RSVP in the body
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error('Failed to RSVP to event');
        }
    } catch (error) {
        console.error('Error RSVPing to event:', error);
        throw error;
    }
};

  export const getEventsByCategory = async (categoryId) => {
    try {
      const url = `http://https://personal-planner-hryyx.ondigitalocean.app//events/list_by_category?category_id=${categoryId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // Include Authorization header if needed
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events by category: ${response.statusText}`);
      }

      const events = await response.json();
      return events;
    } catch (error) {
      console.error('Error fetching events by category:', error.message);
      // Handle errors gracefully
      throw error;
    }
  };

