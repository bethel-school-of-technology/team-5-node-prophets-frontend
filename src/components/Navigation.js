import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Stack,
} from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import "../styles/Navigation.css";
import UserContext from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";

const Navigation = ({ user }) => {
  //const [loggedUser, setLoggedUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false); // Add state for search visibility - Joe

  let { signInUser } = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();
    signInUser(username, password)
      .then(() => {
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        window.alert("Failed Login");
      });
  }

  let { user_id } = useParams;

  // Function to toggle search visibility - Joe
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <>
        <Navbar fixed="top" expand="lg" bg="light">
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

                {user && (
                  <React.Fragment>
                    <Link to={"/profile"} className="nav-link" key={user_id}>
                      Hello {user.fullname}!
                    </Link>
                    <Link to={"/signout"} className="nav-link">
                      SignOut
                    </Link>
                  </React.Fragment>
                )}
                {!user && (
                  <React.Fragment>
                    <Link to="/signup" className="nav-link">
                      Sign Up
                    </Link>
                    <NavDropdown
                      id="nav-dropdown-light-example"
                      title="Sign In"
                      menuVariant="light"
                    >
                      <div>
                        <Form className="sign-in" onSubmit={handleSubmit}>
                          <Form.Group className="mb-6">
                            <Form.Control
                              size="sm"
                              placeholder="username"
                              type="text"
                              name="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <br></br>
                            <Form.Control
                              size="sm"
                              placeholder="password"
                              type="password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Form.Group>
                          <br />
                          <Button type="submit">Sign In</Button>
                        </Form>
                      </div>
                    </NavDropdown>
                  </React.Fragment>
                )}

                <Link to="/rssfeed" className="nav-link">
                  RSS Feed
                </Link>
                <Link to="/about" className="nav-link">
                  QAK
                </Link>
                {/* Search icon - Joe */}
                <div className="nav-search-icon" onClick={toggleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Floating search bar - Joe */}
        {searchVisible && (
          <div className="floating-search">
            <Search query={query} setQuery={setQuery} />
          </div>
        )}

        <Stack gap={3} className="col-md-10 mx-auto mt-3">
          <Outlet />
        </Stack>
      </>
    </>
  );
};

export default Navigation;
