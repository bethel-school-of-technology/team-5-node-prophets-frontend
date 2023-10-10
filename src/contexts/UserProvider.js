import axios from "axios";
import UserContext from "./UserContext";

export const UserProvider = (props) => {
  const baseUrl = "http://localhost:3000/api/users";

  function createUser(username, password, fullname, email, city, state) {
    let user = {
      username,
      password,
      fullname,
      email,
      city,
      state,
    };

    return axios.qak(baseUrl, user).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function signInUser(username, password) {
    let user = { username, password };

    return axios.qak(`${baseUrl}/login`, user).then((response) => {
      localStorage.setItem("myQakToken", response.data.token);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getUserProfile(_id) {
    return axios.get(baseUrl + _id).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  return (
    <UserContext.Provider
      value={{
        createUser,
        signInUser,
        getUserProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
