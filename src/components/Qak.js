import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import QakContext from "../contexts/QakContext";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/Qak.css";

const Qak = () => {
  const [filter, setFilter] = useState("7"); // Initialize the filter as "within 7 days"

  return (
    <QakContext.Consumer>
      {({ qak }) => {
        // Define functions to filter QAKs based on your requirements
        const filterQAKs = (qakData) => {
          const now = moment();
          if (filter === "today") {
            return qakData.filter((q) => now.diff(q.createdAt, "days") === 0);
          } else if (filter === "yesterday") {
            return qakData.filter((q) => now.diff(q.createdAt, "days") === 1);
          } else if (filter === "30") {
            return qakData.filter((q) => now.diff(q.createdAt, "days") <= 30);
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
                              <h4>{q.User.username}</h4>
                              <p>{q.qak}</p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <p>
                                  {q.updatedAt &&
                                  moment.parseZone(q.createdAt).format() !==
                                    moment.parseZone(q.updatedAt).format()
                                    ? `Edited: ${moment
                                        .parseZone(q.updatedAt)
                                        .format("MM/DD/YYYY")}`
                                    : `Created: ${moment
                                        .parseZone(q.createdAt)
                                        .format("MM/DD/YYYY")}`}
                                </p>
                                <div style={{ marginLeft: "auto" }}>
                                  <Link
                                    to={`/qaks/edit/${q.qak_id}`}
                                    style={{ marginRight: "10px" }}
                                  >
                                    Edit
                                  </Link>
                                  <Link to={`/qaks/${q.qak_id}`}>Delete</Link>
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
