import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Stack
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
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
                      {/* <Form.Label>username</Form.Label> */}
                      <Form.Control
                        size="sm"
                        placeholder="username"
                        type="text"
                      />
                      <br></br>
                      <Form.Control
                        size="sm"
                        placeholder="password"
                        type="text"
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
  );
};

export default Navigation;
