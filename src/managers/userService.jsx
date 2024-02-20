export const getUser = () => {
    return fetch(`http://localhost:8000/users/pickleusers/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  export const UpdateUser = (updatedUser) => {
    return fetch(`http://localhost:8000/users/pickleuser/update/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser), // Include the updated user data in the request body
    }).then((res) => res.json());
  };