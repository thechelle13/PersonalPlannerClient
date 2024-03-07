export const editUserById = (id, formData, authToken) => {
  console.log('Updating Fetch user:', formData); // Log the data being sent
  return fetch(`http://localhost:8000/ppusers/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${authToken}`, // Use the authToken provided as a parameter
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to edit user');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error editing user:', error.message);
    return null;
  });
};


export const deleteUserById = (id, authToken) => {
  return fetch(`http://localhost:8000/ppusers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error deleting user:', error.message);
    return null;
  });
};

  
