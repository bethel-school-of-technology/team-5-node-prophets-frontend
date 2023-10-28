import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import QakReplyContext from "../contexts/QakReplyContext";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import NewQakReply from "./NewQakReply";

// A lot of changes in coding and display design are still needed for this page.
//Primary focus was on the QAK to get something to display.

const QakReply = ({ user }) => {
  let params = useParams();

  return (
    <QakReplyContext.Consumer>
      {({ qakReply }) => {
        const sortByNewestQAKReply = (qakReplyDate) => {
          return qakReplyDate.sort((a, b) => {
            // Sort by the newest created or updated timestamp
            const aTimestamp = moment(b.createdAt || b.updatedAt).valueOf();
            const bTimestamp = moment(a.createdAt || a.updatedAt).valueOf();
            return bTimestamp - aTimestamp;
          });
        };

        const sortedQAKReply = sortByNewestQAKReply(qakReply);

        return (
          <div className="qak-wrap">
            <div className="qak-case">
              <div>
                <div className="divider d-flex align-items-center my-4"></div>
                <div className="text-center">
                  <Link to={openSignInModal} onClick={openSignInModal}>
                    Give an Answer or Share Knowledge
                  </Link>

                  <NewQakReply
                    show={showSignInModal}
                    handleClose={closeSignInModal}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
              <div className="content-below-top-panel">
                {sortedQAKReply.map((q) => {
                  return (
                    <div key={q.qakReply_id} style={{ marginBottom: "15px" }}>
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

                                <p>{q.qakReply}</p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
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
                                      to={`/qakReply/${q.qakReply_id}`}
                                      style={{ marginRight: "10px" }}
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                      to={"#"}
                                      onClick={handleDelete.bind(
                                        this,
                                        q.qakReply_id,
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
    </QakReplyContext.Consumer>
  );
};

export default QakReply;
