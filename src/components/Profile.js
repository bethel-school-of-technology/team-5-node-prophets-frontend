import React, { useContext, useEffect, useState } from "react";
import "../styles/Profile.css";
import { Link, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import moment from "moment";
import NewQak from "./NewQak";

const Profile = ({ user }) => {
  let params = useParams();
  const { id } = useParams(); //error handling - Joe
  console.log("Profile ID:", id); //error handling - Joe
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
                  <div className="col-lg-4">
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
                <div className="row"></div>
                <div className="col-8">Latest QAKS</div>
                <div className="col-4">Featured Articles</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h3>Latest Qaks</h3>
            <div className="card mb-4" style={{ height: "500px" }}>
              <div className="card-body" style={{ fontSize: "16px" }}>
                {/* Place your content for Latest Qaks here */}

                <br />

                <div className="card border-primary p-2 ">
                  <p>
                    <strong>John-Smith 12656:</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </p>
                </div>
                <br />

                <div className="card border-primary p-2 ">
                  <p>
                    <strong>John-Smith 12656:</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </p>
                </div>
                <br />
                <div className="card border-primary p-2 ">
                  <p>
                    <strong>John-Smith 12656:</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-4">
            <h3>Featured Articles </h3>
            <div className="row">
              <div className="card">
                <div className="card-body">
                  {/* Place your content for Featured Article 1 here */}
                  <h5> How to Work Smarter with generative AI </h5>
                  <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque...
                  </p>
                  <hr />
                  <h5> Practical (and Powerful) ways to use metaverse </h5>
                  <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque...
                  </p>
                  <hr />
                  <h5> What if we performed 1% better? </h5>
                  <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-4">
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

                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="https://placekitten.com/150/150" // Replace with the actual image URL for Follower 2
                      alt="Follower 2"
                      className="rounded-circle img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <p className="card-text">Gasper Tom </p>
                  </div>
                </div>

                {/* Add more followers here using the same structure */}

                <hr />

                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="https://placekitten.com/150/150" // Replace with the actual image URL for Follower 2
                      alt="Follower 2"
                      className="rounded-circle img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <p className="card-text">Jerry Gasper</p>
                  </div>
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
