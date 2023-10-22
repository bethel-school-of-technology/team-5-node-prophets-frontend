import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import "../styles/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import SignIn from "./SignIn";
import UserContext from "../contexts/UserContext";

const Navigation = ({ user }) => {
  const [query, setQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false); // Add state for search visibility - Joe

  const [showSignInModal, setShowSignInModal] = useState(false);

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Function to toggle search visibility - Joe
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
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
                    <Link
                      to={`/profile/${user.user_id}`}
                      className="nav-link"
                      key={user_id}
                    >
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
                <Link to="/qaks" className="nav-link">
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
