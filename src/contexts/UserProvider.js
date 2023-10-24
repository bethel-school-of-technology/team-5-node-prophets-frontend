import axios from "axios";
import UserContext from "./UserContext";
import { useEffect, useState } from "react";

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const baseUrl = "http://localhost:3000/api/users/";

  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();
  }, []);

  function getAllUsers() {
    return axios.get(baseUrl).then((response) => setUsers(response.data));
  }

  function createUser(
    username,
    password,
    fullname,
    email,
    city,
    state,
    profilePicture
  ) {
    let user = {
      username,
      password,
      fullname,
      email,
      city,
      state,
      profilePicture
    };

    return axios.post(baseUrl, user).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function signInUser(username, password) {
    let user = { username, password };

    return axios.post(`${baseUrl}/login`, user).then((response) => {
      localStorage.setItem("userToken", response.data.token);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getOneProfile(user_id) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };
    return axios.get(baseUrl + user_id, { headers }).then((response) => {
      getAllUsers();
      console.log(response.data);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getOneProfile(user, user_id) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };
    return axios.get(baseUrl + user_id, user, headers).then((response) => {
      getAllUsers();
      console.log(response.data);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function updateUserProfile(user) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };

    return axios
      .put(baseUrl + user.user_id, user, { headers })
      .then((response) => {
        console.log(response.data);
        getAllUsers();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function getUserQaks(user_id) {
    const url = "http://localhost:3000/api/users/qaks/";
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };

    return axios.get(url + user_id, { headers }).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  return (
    <UserContext.Provider
      value={{
        users,
        getAllUsers,
        createUser,
        signInUser,
        getOneProfile,
        getUserQaks,
        updateUserProfile
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
