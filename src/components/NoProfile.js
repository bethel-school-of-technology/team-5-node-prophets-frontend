import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import UserContext from "../contexts/UserContext";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/NoProfile.css";

const NoProfile = () => {
  const params = useParams();
  let navigate = useNavigate();
  const [noLoggedUser, setNoLoggedUser] = useState([]);
  console.log(noLoggedUser);

  let { getOneUserQak } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await getOneUserQak(params.user_id).then((result) =>
        setNoLoggedUser(result)
      );
    }
    fetchData();
  }, [getOneUserQak, params.user_id]);

  function profileCard() {
    const {
      username,
      email,
      fullname,
      city,
      state,
      createdAt,
      profilePicture,
      Qaks
    } = noLoggedUser;

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
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "150px", height: "150px" }}
                        />
                        <h5 className="my-3 text-muted">{username}</h5>
                        <h5 className="my-3 text-muted">{email}</h5>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />

            <Link
              className="backtext"
              variant="link"
              onClick={() => navigate(-1)}
            >
              <div className="d-flex justify-content-start">
                <FaArrowLeft className="arrow" size={"25px"} />
                <h5 className="arrow ps-2">Go Back</h5>
              </div>
            </Link>

            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="divider d-flex align-items-center my-4">
                    <h4 className="latest text-center mx-3 mb-0">
                      {username}'s Qaks
                    </h4>
                  </div>

                  <div className="card mb-4">
                    <div className="card-body" style={{ fontSize: "16px" }}>
                      <br />
                      <div className="q-card mb-4" key={username}>
                        {Qaks?.sort(
                          (a, b) =>
                            moment(b.createdAt).valueOf() -
                            moment(a.createdAt).valueOf()
                        ).map((q, idx) => {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return profileCard();
};

export default NoProfile;
