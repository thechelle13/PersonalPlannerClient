export const getCategories = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch('http://localhost:8000/categories', {
        method: 'GET',
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
  
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };