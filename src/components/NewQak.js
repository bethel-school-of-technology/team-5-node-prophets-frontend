import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QakContext from "../contexts/QakContext";
import { Stack } from "react-bootstrap";

const NewQak = () => {
  let params = useParams();
  let navigate = useNavigate();

  let [newQak, setNewQak] = useState({
    qak_id: params.qak_id,
    qak: ""
  });

  let { createQak } = useContext(QakContext);

  let { qak_id, qak } = newQak;

  function create() {
    if (qak_id === undefined) {
      return createQak(newQak);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    create(newQak)
      .then(() => {
        navigate("/qaks");
      })
      .catch((error) => {
        console.log(error);
        navigate("/signin");
      });
  }

  console.log(newQak);

  return (
    <div>
      <form className="newForm" onSubmit={handleSubmit} key={qak_id}>
        <h3>Ask or Share</h3>
        <Stack>
          <input
            className="qakform"
            name="qak"
            value={qak}
            rows="4"
            cols="50"
            onChange={(e) => setNewQak({ ...newQak, qak: e.target.value })}
          />
          <button type="submit">Submit</button>
        </Stack>
      </form>
    </div>
  );
};

export default NewQak;
