import { useContext } from "react";
import QakContext from "./QakContext";
import axios from "axios";
import { useState } from "react";
import QakReplyContext from "./QakReplyContext";

export const QakReplyProvider = (props) => {
  const [qakReply, setQakReply] = useState([]);
  const baseUrl = "http://localhost:3000/api/qakReply/";

  let { getAllQaks } = useContext(QakContext);

  function createQakReply(qakReply) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    return axios
      .post(baseUrl, qakReply, { headers: myHeaders })
      .then((response) => {
        getAllQaks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function getOneQakReply(qakReply_id) {
    return axios.get(baseUrl + qakReply_id).then((response) => {
      getAllQaks();
      console.log(response.data);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function updateQakReply(qakReply, user_id) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    return axios
      .put(
        baseUrl + qakReply.qakReply_id,
        { ...qakReply, user_id },
        { headers }
      )
      .then((response) => {
        getAllQaks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteQakReply(qakReply_id, user_id) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    return axios.delete(baseUrl + qakReply_id, { headers }).then((response) => {
      getAllQaks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  return (
    <QakReplyContext.Provider
      value={{
        qakReply,
        createQakReply,
        getOneQakReply,
        updateQakReply,
        deleteQakReply,
      }}
    >
      {props.children}
    </QakReplyContext.Provider>
  );
};
