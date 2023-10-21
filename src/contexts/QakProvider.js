import axios from "axios";
import { useEffect, useState } from "react";
import QakContext from "./QakContext";

export const QakProvider = (props) => {
  const [qak, setQak] = useState([]);
  const [allQaks, setAllQaks] = useState([]);
  const baseUrl = "http://localhost:3000/api/qaks/";

  useEffect(() => {
    async function fetchData() {
      await getAllQaks();
    }
    fetchData();
  }, []);

  function getAllQaks() {
    return axios.get(baseUrl).then((response) => setQak(response.data));
  }

  useEffect(() => {
    async function fetchData() {
      await getAllUserWithQaks();
    }
    fetchData();
  }, []);

  function getAllUserWithQaks() {
    console.log(allQaks);
    return axios
      .get("http://localhost:3000/api/qaks/")
      .then((response) => setAllQaks(response.data));
  }

  function getQak(_id) {
    return axios.get(baseUrl + _id).then((response) => {
      getAllQaks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function createQak(qak) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };

    return axios.post(baseUrl, qak, { headers: myHeaders }).then((response) => {
      getAllQaks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function editQak(qak, user_id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };
    return axios
      .put(baseUrl + qak.qak_id, qak, user_id, { headers: myHeaders })
      .then((response) => {
        getAllQaks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteQak(_id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };
    return axios
      .delete(baseUrl + _id, { headers: myHeaders })
      .then((response) => {
        getAllQaks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <QakContext.Provider
      value={{
        qak,
        allQaks,
        getQak,
        createQak,
        editQak,
        deleteQak,
        getAllUserWithQaks
      }}
    >
      {props.children}
    </QakContext.Provider>
  );
};
