import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QakContext from "../contexts/QakContext";
import Form from "react-bootstrap/Form";

const EditQak = () => {
  const params = useParams();
  const [id, setId] = useState(params.q.qak_id);
  const [qak, setQak] = useState("");

  const { getQAK, updateQAK } = useContext(QakContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) return;

    function fetchQAK() {
      getQAK(id).then((newQAK) => setQak(newQAK.qak));
    }

    fetchQAK();
  }, [id, getQAK]);

  function handleChange(event) {
    setQak(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateQAK({ id, qak })
      .then(() => {
        navigate("/qaks");
      })
      .catch((error) => {
        console.log(error);
        navigate("/signin");
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Update QAK</h1>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{qak}</Form.Label>
        <Form.Control
          as="textarea"
          rows={20}
          name="qak"
          value={qak}
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <button>Update QAK</button>
      </Form.Group>
    </Form>
  );
};

export default EditQak;
