import React, { useContext, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import QakReplyContext from "../contexts/QakReplyContext";
import QakContext from "../contexts/QakContext";

const EditQakReply = () => {
  let params = useParams();
  let navigate = useNavigate();

  let [qakReplyEdit, setQakReplyEdit] = useState({
    qakReply_id: params.qakReply_id,
    qak_id: params.qak_id,
    qakReply: "",
  });

  let { getOneQakReply, updateQakReply } = useContext(QakReplyContext);

  let { qak_id, user_id, qakReply } = qakReplyEdit;

  useEffect(() => {
    if (qakReply_id === undefined) return;

    async function fetch() {
      await getOneQakReply(qakReply_id).then((qakReply) =>
        setQakReplyEdit(qakReply)
      );
    }
    fetch();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setQakReplyEdit((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function update() {
    return updateQakReply(qakReplyEdit);
  }

  function handleSubmit(event) {
    event.preventDefault();
    update(qakReplyEdit)
      .then(() => {
        if (!qakReplyEdit.ok) {
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
        <div className="edit-case">
          <div className="close-button"></div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center mx-3 mb-0">
              Provide Answer or Share Knowledge
            </p>
          </div>

          <Form className="editForm" onSubmit={handleSubmit} key={qakReply_id}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={6}
                cols={65}
                type="text"
                name="qakReply"
                value={qakReply}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              className="mb-3 w-100"
              variant="primary"
              size="sm"
              type="submit"
            >
              Submit Update
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditQakReply;
