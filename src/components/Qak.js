import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import QakContext from "../contexts/QakContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "../styles/Qak.css";

const Qak = ({ user }) => {
  let params = useParams();
  let navigate = useNavigate();

  let { deleteQak } = useContext(QakContext);

  function handleDelete(qak_id) {
    if (params.user !== user) {
      window.alert("You are not allowed to perform this operation");
      navigate("/qaks");
    } else {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        deleteQak(qak_id)
          .then(() => {
            navigate("/qaks");
          })
          .catch((error) => {
            console.log(error);
            window.alert("You need to sign in to perform this operation");
            navigate("/qaks");
          });
      }
    }
  }

  const [filter, setFilter] = useState("7"); // Initialize the filter as "within 7 days"

  return (
    <QakContext.Consumer>
      {({ qak }) => {
        const filterQAKs = (qakData) => {
          const now = moment();
          if (filter === "today") {
            return qakData.filter((q) => now.isSame(q.createdAt, "day"));
          } else if (filter === "yesterday") {
            return qakData.filter((q) =>
              now.clone().subtract(1, "day").isSame(q.createdAt, "day")
            );
          } else if (filter === "30") {
            return qakData.filter(
              (q) =>
                now.diff(q.createdAt, "days") <= 30 &&
                now.diff(q.createdAt, "days") >= 0
            );
          } else if (filter === "older") {
            return qakData.filter((q) => now.diff(q.createdAt, "days") > 30);
          } else {
            return qakData.filter((q) => now.diff(q.createdAt, "days") <= 7);
          }
        };

        const filteredQAKs = filterQAKs(qak);

        return (
          <div>
            <div className="fixed-content">
              <br />
              <br />
              <br />
              <h2>Questions Answers Knowledge</h2>
              <Link to="/qaks/new">Create A Question or Share Knowledge</Link>

              <div>
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
                              <Link to={`/profile/${q.user_id}`}>
                                <h4>{q.User.username}</h4>
                              </Link>

                              <p>{q.qak}</p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <p>
                                  {q.updatedAt &&
                                  moment
                                    .parseZone(q.createdAt)
                                    .format("MM/DD/YYYY") !==
                                    moment
                                      .parseZone(q.updatedAt)
                                      .format("MM/DD/YYYY")
                                    ? `Edited: ${moment
                                        .parseZone(q.updatedAt)
                                        .format("MM/DD/YYYY")}`
                                    : `Created: ${moment
                                        .parseZone(q.createdAt)
                                        .format("MM/DD/YYYY")}`}
                                </p>
                                <div style={{ marginLeft: "auto" }}>
                                  <Link
                                    to={`/qaks/${q.qak_id}/edit`}
                                    style={{ marginRight: "10px" }}
                                  >
                                    Edit
                                  </Link>
                                  <Link
                                    to={"#"}
                                    onClick={handleDelete.bind(this, q.qak_id)}
                                  >
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Add a line space here */}
                          <hr style={{ margin: "10px 0" }} />
                        </Accordion.Header>
                        <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </QakContext.Consumer>
  );
};

export default Qak;
