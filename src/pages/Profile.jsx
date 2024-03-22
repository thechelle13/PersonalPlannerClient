import { useState, useEffect, useCallback } from "react";
import { Navigate, Link } from "react-router-dom";
import { getUserEvents } from "../managers/EventManager";
import { addProfilePicture, deleteUserById, editUserById, getProfilePicture} from "../managers/userService";


export const Profile = ({ currentUser, setCurrentUser}) => {
  // Check if currentUser is not available (not logged in)

  if (!currentUser) {
    window.alert("You must be a registered user to access this page.");
    return <Navigate to="/login" replace />;
  }
  const setProfilePictureCallback = useCallback((data) => setProfilePicture(data), []);
  const setCurrentUserCallback = useCallback((user) => setCurrentUser(user), []);
  
  const [userEvents, setUserEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); 

//currentUser.pp_user.profile_picture
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    userName: currentUser.username,
    email: currentUser.email,
    city: currentUser.pp_user.city,
    state: currentUser.pp_user.state,
    address: currentUser.pp_user.address,
    zipcode: currentUser.pp_user.zipcode
  });
 
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const events = await getUserEvents(currentUser.id);
         setUserEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Display an error message to the user
        // You can set an error state and render it in the UI
      }
    };
    fetchUserEvents();
  }, [currentUser.id]); // Trigger effect when currentUser changes

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        await getProfilePicture(currentUser.id, currentUser.token, setProfilePictureCallback, setCurrentUserCallback);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    // Fetch profile picture when the component mounts
    fetchProfilePicture();
  }, [currentUser.id, currentUser.token, setProfilePictureCallback, setCurrentUserCallback]);


  // added back into for edit functionality
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to toggle edit mode
  const handleEdit = () => {
    setEditMode(true);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const authToken = currentUser.token;
      console.log("Updating user:", formData);
  
      // Transform the formData to match the expected structure
      const updatedData = {
        user: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.userName,
          email: formData.email,
        },
        city: formData.city,
        state: formData.state,
        address: formData.address,
        zipcode: formData.zipcode,
      };
  
      const updatedUser = await editUserById(currentUser.id, updatedData, authToken);
      console.log("Updated user:", updatedUser);
  
      if (updatedUser) {
        // Update currentUser with the new data
        setCurrentUser({
          ...currentUser,
          firstName: updatedUser.user.first_name,
          lastName: updatedUser.user.last_name,
          userName: updatedUser.user.username,
          email: updatedUser.user.email,
          pp_user: {
            ...currentUser.pp_user,
            city: updatedUser.city,
            state: updatedUser.state,
            address: updatedUser.address,
            zipcode: updatedUser.zipcode,
          }
        });
  
        // Reflect updates immediately
        setEditMode(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
        const authToken = currentUser.token;
        const formData = new FormData();
        formData.append('profile_picture', e.target.files[0]);


        const response = await addProfilePicture(currentUser.id, formData, authToken);


        if (response && response.profile_picture) {
            console.log("Updating profile picture URL:", response.profile_picture);
            setProfilePicture(response.profile_picture);

            // Update currentUser with the new profile picture URL
            setCurrentUser({
                ...currentUser,
                pp_user: {
                    ...currentUser.pp_user,
                    profile_picture: response.profile_picture,
                },
            });
        } else {
            console.error("Failed to upload profile picture or missing properties");
        }
    } catch (error) {
        console.error("Error uploading profile picture:", error);
    }
};

const handleDeleteAccount = async () => {
  // Prompt the user for confirmation before deleting the account
  const confirmDelete = window.confirm("Are you sure you want to delete your account?");
  if (confirmDelete) {
    try {
      const authToken = currentUser.token;
      await deleteUserById(currentUser.id, authToken);
      // After successful deletion, update the currentUser state
      setCurrentUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

return (
  <>
   <div className="p-8">
   <h2 className="text-2xl  text-Seafoam font-bold mb-4">Profile Page</h2>
  <h1 className="text-3xl text-Seafoam font-bold mb-4">Hello, {currentUser.firstName}!</h1>
  <div className="flex flex-col items-center">
    <label htmlFor="upload-input" className="cursor-pointer">
      <div className="flex justify-center"> {/* Center horizontally */}
        <img
          src={`http://https://personal-planner-hryyx.ondigitalocean.app/${currentUser.pp_user.profile_picture}`}
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          className="w-32 h-32 rounded-full mb-4"
        />
      </div>
      <div className="bg-Seafoam px-4 py-2 rounded-lg">
        Upload Profile Photo
      </div>
    </label>
    <input
      type="file"
      id="upload-input"
      accept="image/*"
      onChange={handleUpload}
      className="hidden"
    />
  </div>
</div>


    {editMode ? (
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4 justify-items-center">
        <div className="flex items-center">
          <label htmlFor="firstName" className="font-bold text-lg mr-2 text-Seafoam w-24">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-md"
            autoComplete="given-name"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="lastName" className="font-bold text-lg mr-2 text-Seafoam w-24">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-md"
            autoComplete="family-name"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="userName" className="font-bold text-lg mr-2 text-Seafoam w-24">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-md"
            autoComplete="username"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="email" className="font-bold text-lg mr-2 text-Seafoam w-24">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-md"
            autoComplete="email"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="city" className="font-bold text-lg mr-2 text-Seafoam w-24">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="state" className="font-bold text-lg mr-2 text-Seafoam w-24">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="zipcode" className="font-bold text-lg mr-2 text-Seafoam w-24">Zipcode:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="address" className="font-bold text-lg mr-2 text-Seafoam w-24">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 rounded-md"
            autoComplete="street-address"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <button type="submit" className="bg-Seafoam hover:bg-white text-Black py-2 px-4 rounded-lg">
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-Seafoam hover:bg-black-700 text-goldenrod py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
         </div>
         <button className="bg-red hover:bg-white text-Black py-2 px-4 rounded-lg" onClick={handleDeleteAccount}>
        Delete My Account
      </button>
      </form>
    ) : (
      <div className="min-h-screen ">
       
        <div className="p-8 flex justify-center items-center">
       
          <div className="bg-opacity-50 border border-Seafoam border-opacity-50 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-Seafoam">User Information</h3>
            <div className="flex items-center flex-wrap mb-4">
              <i className="fas fa-house-user text-4xl md:text-5xl mr-4 text-Seafoam"></i>
              <div>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-Seafoam">First Name:</span>
                    <span className="font-bold text-lg text-goldenrod">{currentUser.firstName}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-Seafoam">Last Name:</span>
                    <span className="font-bold text-lg text-goldenrod">{currentUser.lastName}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-Seafoam">User Name:</span>
                    <span className="font-bold text-lg text-goldenrod">{currentUser.username}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-Seafoam">Email:</span>
                    <span className="font-bold text-lg text-goldenrod">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-Seafoam">City:</span>
                    <span className="font-bold text-lg text-goldenrod">{currentUser.pp_user.city}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-Seafoam">State:</span>
                    <span className="font-bold text-lg text-goldenrod">{currentUser.pp_user.state}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-Seafoam">Zipcode:</span>
                    <span className="font-bold text-lg text-goldenrod">{currentUser.pp_user.zipcode}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-Seafoam">Address:</span>
                    <span className="font-bold text-lg text-goldenrod">{currentUser.pp_user.address}</span>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-Seafoam hover:bg-white text-Black py-2 px-4 rounded-lg"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="bg-opacity-50 border border-Seafoam border-opacity-50 p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl text-Seafoam font-semibold mb-2 underline">My Events</h1>
            {userEvents.length === 0 ? (
              <p className="text-Seafoam">No events found.</p>
            ) : (
              <ul>
                {userEvents.map((event) => (
                  <li key={event.id} className="mb-4">
                    <Link to={`/create-event/${event.id}`} className="text-blue-500 hover:underline">
                      <p className="text-Seafoam">Date: {event.event_date}</p>
                      <p className="text-Seafoam">Title: {event.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);
};