import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Row, Col, Container } from "react-bootstrap";
// import "./styles/SignUp.css";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  console.log(username);
  let { createUser } = useContext(UserContext);
  let navigate = useNavigate();

  const containerStyle = {
    backgroundImage: `url(${"https://webfoundation.org/docs/2017/03/March-12-Letter.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  function handleSubmit(event) {
    event.preventDefault();
    createUser(username, password, fullname, email, city, state, profilePicture)
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
      <Container style={containerStyle}>
        <Row>
          <Col className="signupimg" md={{ span: 6, offset: 3 }}>
            <form onSubmit={handleSubmit}>
              <h1>Register</h1>
              <br></br>
              <input
                placeholder="Enter Username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br></br>
              <br></br>
              <input
                placeholder="Enter Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <br></br>
              <input
                placeholder="Enter Full Name"
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
              <br></br>
              <br></br>
              <input
                placeholder="Enter Email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              <br></br>
              <input
                placeholder="Enter City"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <br></br>
              <br></br>
              <input
                placeholder="Enter State"
                type="text"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <br></br>
              <br></br>
              <input
                placeholder="Enter Image URL"
                type="text"
                name="profilePicture"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              />
              <br />
              <br></br>
              <button>Create Account</button>
            </form>
          </Col>
        </Row>
        <Row>
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
