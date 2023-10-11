import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Stack
} from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import "../styles/Navigation.css";
import UserContext from "../contexts/UserContext";
import Search from "./Search";

const Navigation = ({ user }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");

  let { signInUser } = useContext(UserContext);
  //let navigate = useNavigate();

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
  let { userid } = useParams();
  let params = useParams();

  //console.log(loggedUser);

  let { getUserQaks } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await getUserQaks(params.user_id).then((result) => setLoggedUser(result));
    }
    fetchData();
  }, [getUserQaks, params.user_id]);

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

                {user && (
                  <React.Fragment>
                    <Link to={"/"} className="nav-link" key={userid}>
                      Hello {loggedUser.fullname}!
                    </Link>
                    <Link to="/signout" className="nav-link">
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
      </>
    </>
  );
};

export default Navigation;
