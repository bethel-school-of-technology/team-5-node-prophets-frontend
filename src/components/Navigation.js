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
import { FaSearch } from "react-icons/fa";
import Search from "./Search";

const Navigation = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  return (
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
                      <Form.Control
                        size="sm"
                        placeholder="username"
                        type="text"
                      />
                      <br></br>
                      <Form.Control
                        size="sm"
                        placeholder="password"
                        type="password"
                      />
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
            {/*Added Search in NavBar */}
            <Nav className="justify-content-end flex-grow-1 pe-3 color-white">
              <div className="position-relative">
                <Nav.Item onClick={() => setShowSearch(!showSearch)}>
                  <FaSearch size={24} />
                </Nav.Item>
                {showSearch && <Search query={query} setQuery={setQuery} />}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Stack gap={3} className="col-md-10 mx-auto mt-3">
        <Outlet />
      </Stack>
    </>
  );
};

export default Navigation;
