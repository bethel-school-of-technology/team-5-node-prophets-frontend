import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Row, Col } from "react-bootstrap";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  console.log(username);
  let { createUser } = useContext(UserContext);
  let navigate = useNavigate();

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
    <>
      <Row>
        <Col>
          <div className="signupimg">
            <img
              alt="site img"
              src="https://gaba.healthcare/wp-content/uploads/2017/11/telepsychiatry-safe-practices-1.jpg"
            />
          </div>
        </Col>
        <Col>
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
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
