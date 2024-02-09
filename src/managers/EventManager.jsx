export const getEvents = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch('http://localhost:8000/events', {
        method: 'GET',
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
  
      const events = await response.json();
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };