import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QakContext from "../contexts/QakContext";
import { Button, Container, Stack } from "react-bootstrap";
import "../styles/EditQak.css";

const EditQak = () => {
  let params = useParams();
  let navigate = useNavigate();

  let [qakEdit, setQakEdit] = useState({
    qak_id: params.qak_id,
    qak: ""
  });

  console.log(qakEdit);
  let { getOneQak, editQak } = useContext(QakContext);

  let { qak_id, qak } = qakEdit;

  useEffect(() => {
    if (qak_id === undefined) return;
    async function fetch() {
      await getOneQak(qak_id).then((qak) => setQakEdit(qak));
    }
    fetch();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setQakEdit((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function updateQak() {
    return editQak(qakEdit);
  }

  function handleSubmit(event) {
    event.preventDefault();

    updateQak(qakEdit)
      .then(() => {
        if (!qakEdit.ok) {
          alert("Your Post has been updated!");
        }
        navigate("/qaks");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("You need to be Signed In to perform this operation");
        navigate("/signIn");
      });
  }

  return (
    <div className="edit-wrap">
      <div className="edit-case">
        <form className="editForm" onSubmit={handleSubmit} key={qak_id}>
          <div className="divider d-flex align-items-center my-4">
            <h4 className="edit-label text-center mx-3 mb-0">Edit QAK</h4>
          </div>

          <Stack gap={4} className="mx-auto">
            <textarea
              className="text-area"
              rows={4}
              cols={65}
              type="text"
              name="qak"
              value={qak}
              onChange={handleChange}
            />
            <button className="edit-submit primary">Finish Editing</button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default EditQak;
