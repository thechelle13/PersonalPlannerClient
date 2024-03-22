export const editUserById = (id, formData, authToken) => {
  console.log('Updating Fetch user:', formData); // Log the data being sent
  return fetch(`https://personalplanner-api-app-3vixh.ondigitalocean.app/ppusers/${id}`, {
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
  return fetch(`https://personalplanner-api-app-3vixh.ondigitalocean.app/ppusers/${id}`, {
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

  
export const addProfilePicture = async (userId, formData, authToken) => {
  try {
    const response = await fetch(`https://personalplanner-api-app-3vixh.ondigitalocean.app/ppusers/${userId}/add-profile-picture`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${authToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error('Failed to upload profile picture - Server Error:', response.statusText);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

export const getProfilePicture = async (userId, authToken, setProfilePicture, setCurrentUser ) => {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));

  try {
    const response = await fetch(`https://personalplanner-api-app-3vixh.ondigitalocean.app/ppusers/${userId}/profile-picture`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch profile picture - Server Error:', response.statusText);
    }

    const data = await response.json();

    if (data && data.profile_picture) {
      setProfilePicture(data.profile_picture);

      // Update currentUser with the new profile picture URL
      setCurrentUser({
        ...currentUser,
        pp_user: {
          ...currentUser.pp_user,
          profile_picture: data.profile_picture,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    throw error;
  }
};