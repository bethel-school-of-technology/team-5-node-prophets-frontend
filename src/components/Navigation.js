import React, { useState, useContext, useEffect } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import "../styles/Navigation.css";
import Search from "./Search";
import SignIn from "./SignIn";

const Navigation = ({ user }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [query, setQuery] = useState("");

  const [showSignInModal, setShowSignInModal] = useState(false);

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleSubmit = (e) => {
    // Handle sign-in form submission
    e.preventDefault();
    // Your sign-in form submission logic here
  };

  let { user_id } = useParams();

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
                    <Link
                      to={openSignInModal}
                      className="nav-link"
                      onClick={openSignInModal}
                    >
                      Sign In
                    </Link>
                  </React.Fragment>
                )}

                <Link to="/rssfeed" className="nav-link">
                  RSS Feed
                </Link>
                <Link to="/about" className="nav-link">
                  QAK
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Stack gap={3} className="col-md-10 mx-auto mt-3">
          <Outlet />
        </Stack>
        <SignIn
          show={showSignInModal}
          handleClose={closeSignInModal}
          handleSubmit={handleSubmit}
        />
      </>
    </>
  );
};

export default Navigation;
