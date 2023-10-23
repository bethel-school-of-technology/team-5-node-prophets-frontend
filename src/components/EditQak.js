import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QakContext from "../contexts/QakContext";
import { Stack } from "react-bootstrap";

const EditQak = ({ user }) => {
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
          navigate("/qaks");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("You need to be Signed In to perform this operation");
        navigate("/signIn");
      });
  }

  return (
    <div>
      <form className="editForm" onSubmit={handleSubmit} key={qak_id}>
        <h3>Edit</h3>
        <Stack gap={4} className="mx-auto">
          <textarea
            rows={4}
            cols={65}
            type="text"
            name="qak"
            value={qak}
            onChange={handleChange}
          />
          <button>Submit</button>
        </Stack>
      </form>
    </div>
  );
};

export default EditQak;

//   const params = useParams();
//   const [id, setId] = useState(params.q.qak_id);
//   const [qak, setQak] = useState("");

//   const { getQAK, updateQAK } = useContext(QakContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id === undefined) return;

//     function fetchQAK() {
//       getQAK(id).then((newQAK) => setQak(newQAK.qak));
//     }

//     fetchQAK();
//   }, [id, getQAK]);

//   function handleChange(event) {
//     setQak(event.target.value);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     updateQAK({ id, qak })
//       .then(() => {
//         navigate("/qaks");
//       })
//       .catch((error) => {
//         console.log(error);
//         navigate("/signin");
//       });
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <h1>Update QAK</h1>

//       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>{qak}</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={20}
//           name="qak"
//           value={qak}
//           onChange={handleChange}
//         />
//         <br></br>
//         <br></br>
//         <button>Update QAK</button>
//       </Form.Group>
//     </Form>
//   );
// };
