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
import Search from "./Search";

const Navigation = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <Navbar fixed="top" className="navi bg-body-tertiary" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="logo.png"
              width="30"
              height="30"
              className="brand d-inline-block align-top"
            />{" "}
            ETM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar justify-content-end flex-grow-1 pe-3 color-white">
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
              <Link to="/rssfeed" className="nav-link">
                RSS Feed
              </Link>
              <Link to="/about" className="nav-link">
                QAK
              </Link>

              {/*Search component directly in the Nav bar */}
              <div className="nav-search">
                <Search query={query} setQuery={setQuery} />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Stack gap={3} className="col-md-10 mx-auto mt-3">
        <Outlet />
      </Stack>
    </div>
  );
};

export default Navigation;
