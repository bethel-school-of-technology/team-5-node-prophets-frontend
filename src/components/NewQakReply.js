import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import QakReplyContext from "../contexts/QakReplyContext";
import QakContext from "../contexts/QakContext";

const NewQakReply = (props) => {
  let params = useParams();
  let navigate = useNavigate();

  let [newQakReply, setNewQakReply] = useState({
    qakReply_id: params.qakReply_id,
    qak_id: params.qak_id,
    user_id: params.user_id,
    qakReply: "",
  });

  let { createQakReply } = useContext(QakReplyContext);

  let { qak_id, user_id, qakReply } = newQakReply;

  function create() {
    if (qakReply_id === undefined) {
      return createQakReply(newQakReply);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    create(newQakReply)
      .then(() => {
        if (!newQakReply.ok) {
          alert("Your QAKReply is posted");
        }
        navigate("/qaks");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("You need to be Signed In to perform this operation");
        navigate("/signIn");
      });
  }

  return (
    <div>
      <div className="form-wrap">
        <div className="form-case">
          <div className="close-button"></div>
          <p className="register">
            Not a member?{" "}
            <a className="register-link" href="/signup">
              Register
            </a>{" "}
            It's free!
          </p>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center mx-3 mb-0">
              Provide Answer or Share Knowledge
            </p>
          </div>

          <Form onSubmit={handleSubmit} key={qakReply_id}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={6}
                cols={65}
                name="qakReply"
                value={qakReply}
                onChange={(e) =>
                  setNewQakReply({ ...newQakReply, qakReply: e.target.value })
                }
              />
            </Form.Group>

            <Button
              className="mb-3 w-100"
              variant="primary"
              size="sm"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewQakReply;
