import React, { useContext, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import QakReplyContext from "../contexts/QakReplyContext";

const QakReplyForm = ({}) => {
  let params = useParams();
  let navigate = useNavigate();
  let [pendingQakReply, setQakReply] = useState({
    qak_id: params.qak_id,
    qakReply: "",
  });

  let { getOneQakReply, createQakReply, updateQakReply } =
    useContext(QakReplyContext);

  let { qak_id, user_id, qakReply } = pendingQakReply;
  let qakReply_id = params.qakReply_id;

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
    if (qakReply_id === undefined) {
      return createQakReply(pendingQakReply);
    } else {
      return updateQakReply(pendingQakReply);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    addOrUpdateQakReply()
      .then((pendingQakReply) => {
        navigate("/qaks");
      })
      .catch((error) => {
        console.log(error);
        navigate("/signin");
      });
  }

  return (
    <div>
      <h1>quak reply</h1>

      <div className="form-wrap">
        <div className="form-case">
          <div className="close-button"></div>

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
        </div>
      </div>
    </div>
  );
};

export default QakReplyForm;
