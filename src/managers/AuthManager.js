export const loginUser = (user) => {
  return fetch("http://https://personal-planner-hryyx.ondigitalocean.app//login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  }).then((res) => res.json());
};

export const registerUser = (newUser) => {
  return fetch("http://https://personal-planner-hryyx.ondigitalocean.app//register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
};
