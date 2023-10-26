import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import QakReplyContext from "../contexts/QakReplyContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "../styles/QakReply.css";
import NewQakReply from "./NewQakReply";
import Qak from "./Qak";

const QakReply = ({ user }) => {
  let params = useParams();
  let navigate = useNavigate();

  let { deleteQakReply } = useContext(QakReplyContext);

  function handleDelete(qakReply_id) {
    if (user !== user) {
      window.alert("You are not allowed to perform this operation");
      navigate("/qaks");
    } else {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        deleteQakReply(qakReply_id)
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
                    Give An Answer or Share Knowledge
                  </Link>

                  <NewQakReply
                    show={showSignInModal}
                    handleClose={closeSignInModal}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
              <div className="content-below-top-panel">
                {filteredQAKs.map((q) => {
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
                                      to={`/qakReply/${q.qakReply_id}/edit`}
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
