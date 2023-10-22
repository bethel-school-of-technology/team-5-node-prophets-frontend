import React, { useContext } from "react";
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
    if (params.user_id !== user) {
      return alert("You are not allowed to perform this operation").then(() => {
        navigate("/qaks");
      });
    }
    deleteQak(qak_id)
      .then(() => {
        navigate("/qaks");
      })
      .catch((error) => {
        console.log(error);
        alert("You need to sign in to perform this operation");
        navigate("/signin");
      });
  }

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

  return (
    <QakContext.Consumer>
      {({ qak }) => {
        return (
          <div>
            <div className="fixed-content">
              {/* Working around CSS issues with the br code */}
              <br />
              <br />
              <br />
              <h2>Questions Answers Knowledge</h2>
              <Link to="/qaks/new">Create A Question or Share Knowledge</Link>
            </div>
            <div className="content-below-top-panel">
              {qak.map((q) => {
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
