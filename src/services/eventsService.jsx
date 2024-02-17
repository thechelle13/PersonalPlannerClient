// export const getAllEvents = () => {
//     return fetch(`http://localhost:8000/events`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${localStorage.getItem("auth_token")}`,
//         "Content-Type": "application/json",
//       },
//     }).then((res) => res.json());
//   };

  export const getAllEvents = () => {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    
        if (!currentUser || !currentUser.token) {
          throw new Error('User not authenticated');
        }  
    return fetch(`http://localhost:8000/events`,
      {
          method: "GET",
          headers: {
            Authorization: `Token ${currentUser.token}`,
              "Content-Type": "application/json"
          }
        }).then((res) => res.json())
    }