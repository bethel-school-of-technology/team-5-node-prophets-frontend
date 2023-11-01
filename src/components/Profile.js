import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import moment from "moment";
import NewQak from "./NewQak";
import { Card, ListGroup } from "react-bootstrap";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

const Profile = ({ user }) => {
  let params = useParams();
  let navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState([]);
  const [userReply, setUserReply] = useState([]);

  const baseUrl = "http://localhost:3000/api/users";

  let { getUserQaks, deleteQak } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await getUserQaks(params.user_id).then((result) => setLoggedUser(result));
    }
    fetchData();
  }, [getUserQaks, params.user_id]);

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

  function handleDelete(qak_id) {
    if (user) {
      window.alert("You are not allowed to perform this operation");
      navigate("/qaks");
    } else {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        deleteQak(qak_id)
          .then(() => {
            navigate(window.location);
          })
          .catch((error) => {
            console.log(error);
            window.alert("You need to sign in to perform this operation");
            navigate(window.location);
          });
      }
    }
  }

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
              <div className="row" key={params.user_id}>
                <div className="profile-top">
                  <div className="col-12 col-md-12 col-lg-4">
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <img
                          src={profilePicture}
                          alt=""
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

                  <div className="card mb-4">
                    <div className="card-body" style={{ fontSize: "16px" }}>
                      {/* Place your content for Latest Qaks here */}

                      <br />
                      <div className="q-card mb-4" key={user}>
                        {Qaks?.sort(
                          (a, b) =>
                            moment(b.createdAt).valueOf() -
                            moment(a.createdAt).valueOf()
                        ).map((q) => {
                          console.log(Qaks);
                          return (
                            <>
                              <div key={q.qak_id}>
                                <div className="q">
                                  <div>
                                    <h4>{username}</h4>
                                  </div>
                                  <p>{q.qak}</p>
                                  <div className="d-flex justify-content-end">
                                    <Link
                                      to={`/userqak/${q.qak_id}/edit`}
                                      className="pe-3"
                                    >
                                      <FaRegEdit size={"23px"} color="purple" />
                                    </Link>
                                    <Link
                                      to={"#"}
                                      onClick={handleDelete.bind(
                                        this,
                                        q.qak,
                                        q.user_id
                                      )}
                                    >
                                      <FaTrashAlt
                                        className="trash"
                                        size={"20px"}
                                        color="green"
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div>
                                {q.QakReplies && q.QakReplies.length > 0 ? (
                                  <div>
                                    {q.QakReplies.map((QakReplies) => (
                                      <div
                                        key={QakReplies.qakReply_id}
                                        style={{ marginBottom: "15px" }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center"
                                          }}
                                        >
                                          <div>
                                            {/* <Link
                                              to={`/noprofile/${QakReplies.user_id}`}
                                            >
                                              <h4>
                                                {QakReplies.User.username}
                                              </h4>
                                            </Link> */}
                                            <p>{QakReplies.user_id}</p>
                                            <p>{QakReplies.qakReply}</p>
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center"
                                              }}
                                            >
                                              <p>
                                                {QakReplies.updatedAt &&
                                                !moment(
                                                  QakReplies.createdAt
                                                ).isSame(
                                                  QakReplies.updatedAt,
                                                  "day"
                                                )
                                                  ? `Edited: ${moment(
                                                      QakReplies.updatedAt
                                                    ).format("MM/DD/YYYY")}`
                                                  : `Created: ${moment(
                                                      QakReplies.createdAt
                                                    ).format("MM/DD/YYYY")}`}
                                              </p>
                                              <p style={{ marginLeft: "auto" }}>
                                                <Link
                                                  to={`/qakReply/edit/${QakReplies.qakReply_id}`}
                                                  style={{
                                                    marginRight: "10px"
                                                  }}
                                                >
                                                  Edit
                                                </Link>
                                                {/* <Link
                                                  to={"#"}
                                                  onClick={handleDeleteQakReply.bind(
                                                    this,
                                                    QakReplies.qakReply_id,
                                                    QakReplies.User.user_id
                                                  )}
                                                >
                                                  Delete
                                                </Link> */}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        {/* Add a line space here */}
                                        <hr style={{ margin: "10px 0" }} />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p>No replies available for this QAK.</p>
                                )}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-4">
                  <div className="divider d-flex align-items-center my-4">
                    <h4 className="latest text-center mx-3 mb-0">
                      Latest Tech News
                    </h4>
                  </div>

                  <div>
                    <div className="card mb-4 p-2">
                      <div className="card-body">
                        <Link className="text-dec" to={"/rssfeed"}>
                          {/* Place your content for Featured Article 1 here */}
                          <hr />
                          {articles.slice(1, 3).map((item, idx) => (
                            <div key={idx}>
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
                              <Link
                                to={`/noprofile/${user.user_id}`}
                                className="top-com-link"
                              >
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

// {user ? (
//   <Link to={`/profile/${q.User.user_id}`}>
//     <h4>{q.User.username}</h4>
//   </Link>
// ) : (
//   <Link to={`/noprofile/${q.user_id}`}>
//     <h4>{q.User.username}</h4>
//   </Link>
// )}
