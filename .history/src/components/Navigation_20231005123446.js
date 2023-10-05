import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Stack,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  // State variables for username, password, and authentication status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Function to handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Send a request to your backend for authentication
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Authentication successful
        setAuthenticated(true);
        // You may want to store the token in local storage or a state management solution here.
      } else {
        // Authentication failed
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <>
      <>
        <Navbar expand="lg" bg="light">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              ETM
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3 color-white">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
                <NavDropdown
                  id="nav-dropdown-light-example"
                  title="Sign In"
                  menuVariant="light"
                >
                  <div>
                    <Form className="sign-in">
                      <Form.Group className="mb-6">
                        <div>
                          <Form className="sign-in" onSubmit={handleSignIn}>
                            <Form.Group className="mb-6">
                              <Form.Control
                                size="sm"
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <br></br>
                              <Form.Control
                                size="sm"
                                placeholder="password"
                                type="password" // Use password type for security
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </Form.Group>
                          </Form>
                        </div>
                        {/* <Form.Control
                          size="sm"
                          placeholder="username"
                          type="text"
                        />
                        <br></br>
                        <Form.Control
                          size="sm"
                          placeholder="password"
                          type="text"
                        /> */}
                        <br />
                        <Button>Sign In</Button>
                      </Form.Group>
                    </Form>
                  </div>
                </NavDropdown>
                <Link to="/newsfeed" className="nav-link">
                  RSS Feed
                </Link>
                <Link to="/about" className="nav-link">
                  QAK
                </Link>
              </Nav>
              <Form>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                ></Form.Control>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Stack gap={3} className="col-md-10 mx-auto mt-3">
          <Outlet />
        </Stack>
      </>
    </>
  );
};

export default Navigation;
