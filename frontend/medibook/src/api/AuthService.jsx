import axiosClient from "./axiosClient.jsx";

export const AuthService = {
  login: (user, pass) => {
    return axiosClient.post("/user/login", {
      username: user,
      password: pass,
    });
  },
  register: (username, name, email, phoneNumber, password) => {
    return axiosClient.post("/user/register", {
      userDTO: {
        username: username,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
      password: password,
    });
  },
};
