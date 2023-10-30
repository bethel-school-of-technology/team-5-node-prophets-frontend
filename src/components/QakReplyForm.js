import React, { useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import QakReplyContext from "../contexts/QakReplyContext";
import QakContext from "../contexts/QakContext";
import UserContext from "../contexts/UserContext";

const QakReplyForm = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [qakReply, setQakReply] = useState({
    qak_id: params.qak_id,
    user_id: params.user_id,
    qakReply: "",
  });

  let { getOneQakReply, createQakReply, updateQakReply } =
    useContext(QakReplyContext);

  let { qak_id, user_id, qakReply } = qakReply;

  useEffect(() => {
    if (qakReply_id === undefined) return;
    async function fetch() {
      await getOneQakReply(qakReply_id).then((qakReply) =>
        setQakReply(qakReply)
      );
    }
    fetch();
  }, [qakReply_id, getOneQakReply]);

  function handleChange(event) {
    setQakReply((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value };
    });
  }

  function addOrUpdateQakReply() {
    if (qayReply_id === undefined) {
      return createQakReply(qakReply);
    } else {
      return updateQakReply(qakReply);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    create(newQakReply)
      .then(() => {
        addOrUpdateQakReply();
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
                <p className="text-center mx-3 mb-0">
                  Provide Answer or Share Knowledge
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    as={"textarea"}
                    type="text"
                    rows={6}
                    cols={65}
                    name="qakReply"
                    value={qakReply}
                    onChange={handleChange}
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

export default QakReplyForm;
