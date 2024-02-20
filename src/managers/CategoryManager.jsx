export const getCategories = async () => {
  try {
    const response = await fetch('http://localhost:8000/categories', {
      method: 'GET',
      headers: {
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
