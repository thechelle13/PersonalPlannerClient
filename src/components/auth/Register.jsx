import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";

export const Register = ({ setUser }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const address = useRef();
  const city = useRef();
  const state = useRef();
  const zipcode = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        address: address.current.value,
        city: city.current.value,
        state: state.current.value,
        zipcode: zipcode.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("token" in res && res.token) {
          setUser(res);
          navigate("/login");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };


  return (
    <section className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleRegister}>
        <h1 className="text-3xl font-bold mb-6">Personal Planner</h1>
        <p className="text-lg mb-4">Create an account</p>

                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          ref={firstName}
        />

        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          ref={lastName}
        />

        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          ref={username}
        />

        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          ref={email}
          autoComplete="email"
        />

        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <div className="flex">
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            ref={password}
          />
          <input
            id="verifyPassword"
            type="password"
            placeholder="Verify Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ml-2"
            ref={verifyPassword}
          />
        </div>

        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
          Address
        </label>
        <textarea
          id="address"
          placeholder="Enter your address..."
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          ref={address}
        ></textarea>

        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
          City
        </label>
        <input
          id="city"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          ref={city}
        />

        <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
          State
        </label>
        <input
          id="state"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          ref={state}
        />

        <label htmlFor="zipcode" className="block text-gray-700 text-sm font-bold mb-2">
          Zipcode
        </label>
        <input
          id="zipcode"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          ref={zipcode}
        />

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};
