import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import QakContext from "../contexts/QakContext";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "../styles/Qak.css";
import NewQak from "./NewQak";

const Qak = ({ user }) => {
  //let params = useParams();
  let navigate = useNavigate();

  let { deleteQak } = useContext(QakContext);

  function handleDelete(qak_id) {
    if (user) {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        deleteQak(qak_id).then(() => {
          navigate("/qaks");
        });
      } else {
        window.alert("You are not allowed to perform this operation");
        navigate("/qaks").catch((error) => {
          console.log(error);
          window.alert("You need to sign in to perform this operation");
          navigate("/qaks");
        });
      }
    }
  }

  const [filter, setFilter] = useState("7"); // Initialize the filter as "within 7 days"

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

  return (
    <QakContext.Consumer>
      {({ qak }) => {
        const filterQAKs = (qakData) => {
          const now = moment();
          if (filter === "today") {
            return qakData
              .filter((q) => now.isSame(q.createdAt, "day"))
              .sort(
                (b, a) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          } else if (filter === "yesterday") {
            return qakData
              .filter((q) =>
                now.clone().subtract(1, "day").isSame(q.createdAt, "day")
              )
              .sort(
                (a, b) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          } else if (filter === "1month") {
            const oneMonthAgo = now.clone().subtract(1, "month");
            return qakData
              .filter((q) => q.createdAt.isSameOrAfter(oneMonthAgo))
              .sort(
                (a, b) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          } else if (filter === "older") {
            const oneMonthAgo = now.clone().subtract(1, "month");
            return qakData
              .filter((q) => moment(q.createdAt).isBefore(oneMonthAgo))
              .sort(
                (a, b) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          } else {
            return qakData
              .filter((q) => now.diff(q.createdAt, "days") <= 7)
              .sort(
                (a, b) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          }
        };
        const filteredQAKs = filterQAKs(qak);

        return (
          <div className="qak-wrap">
            <div className="qak-case">
              <div>
                <div className="divider d-flex align-items-center my-4">
                  <h4 className="form-title text-center mx-3 mb-0">
                    Question and Answer Knowledge
                  </h4>
                </div>
                <div className="text-center">
                  <Link to={openSignInModal} onClick={openSignInModal}>
                    Create A Question or Share Knowledge
                  </Link>

                  <NewQak
                    show={showSignInModal}
                    handleClose={closeSignInModal}
                    handleSubmit={handleSubmit}
                  />
                </div>

                <div className="text-center">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="7">Within 7 days</option>
                    <option value="30">Within 30 days</option>
                    <option value="older">Older</option>
                  </select>
                </div>
              </div>
              <div className="content-below-top-panel">
                {filteredQAKs.map((q) => {
                  return (
                    <div key={q.qak_id} style={{ marginBottom: "15px" }}>
                      <Accordion defaultActiveKey={null}>
                        <Accordion.Item>
                          <Accordion.Header>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                {q.user_id !== user ? (
                                  <Link to={`/noprofile/${q.user_id}`}>
                                    <h4>{q.User.username}</h4>
                                  </Link>
                                ) : (
                                  <Link to={`/profile/${q.user_id}`}>
                                    <h4>{q.User.username}</h4>
                                  </Link>
                                )}
                                <p>{q.qak}</p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  <p>
                                    {q.updatedAt &&
                                    !moment(q.createdAt).isSame(
                                      q.updatedAt,
                                      "day"
                                    )
                                      ? `Edited: ${moment(q.updatedAt).format(
                                          "MM/DD/YYYY"
                                        )}`
                                      : `Created: ${moment(q.createdAt).format(
                                          "MM/DD/YYYY"
                                        )}`}
                                  </p>
                                  <p style={{ marginLeft: "auto" }}>
                                    <Link
                                      to={`/qaks/${q.qak_id}/edit`}
                                      style={{ marginRight: "10px" }}
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                      to={"#"}
                                      onClick={handleDelete.bind(
                                        this,
                                        q.qak_id,
                                        q.user_id
                                      )}
                                    >
                                      Delete
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* Add a line space here */}
                            <hr style={{ margin: "10px 0" }} />
                          </Accordion.Header>
                          <Accordion.Body>
                            <div>
                              <h5>Username</h5>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                              </p>
                              <p>
                                Created: MM/DD/YYYY{" "}
                                <span className="edit">Edit</span>{" "}
                                <span className="delete">Delete</span>
                              </p>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }}
    </QakContext.Consumer>
  );
};

export default Qak;
