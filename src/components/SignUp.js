import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  let { createUser } = useContext(UserContext);
  let navigate = useNavigate();

  //console.log(username);

  function handleSubmit(event) {
    event.preventDefault();
    createUser(username, password, fullname, email, city, state)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Failed registration: error creating user");
      });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <br></br>
        <span>Username </span>
        <input
          placeholder="Enter Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br></br>
        <br></br>
        <span>Password </span>
        <input
          placeholder="Enter Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <span>Full Name </span>
        <input
          placeholder="Enter Full Name"
          type="text"
          name="fullname"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br></br>
        <br></br>
        <span>Email </span>
        <input
          placeholder="Enter Email"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <span>City </span>
        <input
          placeholder="Enter City"
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br></br>
        <br></br>
        <span>State </span>
        <input
          placeholder="Enter State"
          type="text"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <br />
        <br></br>
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
