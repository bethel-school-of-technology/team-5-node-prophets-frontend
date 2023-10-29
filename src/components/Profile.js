import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";
import { Link, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import moment from "moment";
import NewQak from "./NewQak";
import { Card, ListGroup } from "react-bootstrap";

const Profile = ({ user }) => {
  const [userReply, setUserReply] = useState([]);

  //console.log(topCommenter);
  const baseUrl = "http://localhost:3000/api/users";

  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();
  }, []);

  function getAllUsers() {
    return axios.get(baseUrl).then((response) => setUserReply(response.data));
  }

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchRssFeeds = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/rss/feeds");
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Error fetching RSS feeds:", error);
      }
    };

    fetchRssFeeds();
  }, []);
  const [modalShow, setModalShow] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  let params = useParams();
  const [loggedUser, setLoggedUser] = useState([]);
  let { getUserQaks } = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      await getUserQaks(params.user_id).then((result) => setLoggedUser(result));
    }
    fetchData();
  }, [getUserQaks, params.user_id]);
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
  function profileCard() {
    let {
      user_id,
      username,
      fullname,
      email,
      city,
      state,
      createdAt,
      profilePicture,
      Qaks
    } = loggedUser;
    let qaksByUser = [];
    qaksByUser.push({ Qaks });
    console.log(qaksByUser[0]);
    return (
      <div>
        <div className="prof-wrap">
          <div className="prof-case">
            <div className="profile-section">
              <div className="row" key={user}>
                <div className="profile-top">
                  <div className="col-12 col-md-12 col-lg-4">
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <img
                          src={profilePicture}
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "150px", height: "150px" }}
                        />
                        <h5 className="my-3 text-muted">{username}</h5>
                        <h5 className="my-3 text-muted">{email}</h5>

                        <div className="d-flex justify-content-center mb-2">
                          <div>
                            <Link
                              type="button"
                              className="btn btn-primary btn-sm"
                              to={openSignInModal}
                              onClick={openSignInModal}
                            >
                              New QAK
                            </Link>

                            <NewQak
                              show={showSignInModal}
                              handleClose={closeSignInModal}
                              handleSubmit={handleSubmit}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card mb-4 m-5">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Full Name</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{fullname}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">City</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{city}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">State</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">{state}</p>
                          </div>
                        </div>

                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Member Since:</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              {moment.parseZone(createdAt).local().format("LL")}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="d-flex justify-content-center">
                            <Link
                              type="button"
                              className="btn btn-primary btn-sm"
                              to={`/profile/${user_id}/edit`}
                            >
                              Edit Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>
              <div className="row">
                <div className="col-md-8">
                  <div className="divider d-flex align-items-center my-4">
                    <h4 className="latest text-center mx-3 mb-0">
                      {username}'s Qaks
                    </h4>
                  </div>

                  <div className="card mb-4" style={{ height: "500px" }}>
                    <div className="card-body" style={{ fontSize: "16px" }}>
                      {/* Place your content for Latest Qaks here */}

                      <br />

                      <div className="q-card" key={user}>
                        {Qaks?.map((q, idx) => {
                          return (
                            <div key={idx}>
                              <div className="q">
                                <div>
                                  <h4>{username}</h4>
                                </div>
                                <p>{q.qak}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-4">
                  <div className="divider d-flex align-items-center my-4">
                    <h4 className="latest text-center mx-3 mb-0">
                      <h4>Latest Tech News</h4>
                    </h4>
                  </div>

                  <div>
                    <div className="card mb-4 p-2">
                      <div className="card-body">
                        <Link className="text-dec" to={"/rssfeed"}>
                          {/* Place your content for Featured Article 1 here */}
                          <hr />
                          {articles.slice(1, 3).map((item, idx) => (
                            <div>
                              <h5 className="text-hove">{item.title}</h5>
                              <p className="text-hove">{item.contentSnippet}</p>
                              <hr />
                            </div>
                          ))}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Card>
                    <Card.Header>
                      <strong>{username}'s Connections</strong>
                    </Card.Header>
                    <div className="col-12">
                      <Card.Body className="commenter-list">
                        {userReply.slice(1, 6).map((user, id) => (
                          <ListGroup key={id}>
                            <div className="top-com">
                              <Link to="/profile" className="top-com-link">
                                <ListGroup.Item>
                                  <img
                                    key={id}
                                    className="tc-img"
                                    alt="avatar"
                                    src={user.profilePicture}
                                  />

                                  {user.fullname}
                                </ListGroup.Item>
                              </Link>
                            </div>
                          </ListGroup>
                        ))}
                      </Card.Body>
                    </div>
                  </Card>
                  {/* <div className="col-12">
                    <h3>Your Followers</h3>
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4">
                            <img
                              src="https://placekitten.com/150/150" // Replace with the actual image URL for Follower 1
                              alt="Follower 1"
                              className="rounded-circle img-fluid"
                            />
                          </div>
                          <div className="col-md-8">
                            <p className="card-text"> Tom Gasper</p>
                          </div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return profileCard();
};
export default Profile;
