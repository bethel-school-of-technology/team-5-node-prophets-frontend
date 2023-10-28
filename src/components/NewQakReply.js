import React, { useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import "../styles/SignIn.css";
import { useNavigate, useParams } from "react-router-dom";
import QakReplyContext from "../contexts/QakReplyContext";

const NewQakReply = ({ show, handleClose }) => {
  let params = useParams();
  let navigate = useNavigate();

  let [newQakReply, setNewQakReply] = useState({
    qakReply_id: params.qakReply_id,
    qakReply: "",
  });

  let { createQakReply } = useContext(QakReplyContext);

  let { qakReply_id, qakReply } = newQakReply;

  function create() {
    if (qakReply_id === undefined) {
      return createQakReply(newQakReply);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    create(newQakReply)
      .then(() => {
        handleClose();
        navigate("/qaks");
      })
      .catch((error) => {
        console.log(error);
        navigate("/signin");
      });
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <div className="form-wrap">
          <div className="form-case">
            <div className="close-button">
              {/* <CloseButton className="button-close" onClick={handleClose} /> */}
            </div>
            <Modal.Body>
              <p className="register">
                Not a member?{" "}
                <a className="register-link" href="/signup">
                  Register
                </a>{" "}
                It's free!
              </p>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center mx-3 mb-0">Answer or Knowledge</p>
              </div>

              <Form onSubmit={handleSubmit} key={qakReply_id}>
                <Form.Group className="mb-3">
                  <Form.Control
                    as={"textarea"}
                    type="text"
                    rows={6}
                    cols={65}
                    name="qak"
                    value={qakReply}
                    onChange={(e) =>
                      setNewQakReply({
                        ...newQakReply,
                        qakReply: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Button
                  className="mb-3 w-100"
                  variant="primary "
                  size="sm"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewQakReply;
