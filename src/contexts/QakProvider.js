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

  function addQak(qak) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myQakToken")}`
    };

    return axios.qak(baseUrl, qak, { headers: myHeaders }).then((response) => {
      getAllQaks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function editQak(pqak) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myQakToken")}`
    };
    return axios
      .put(baseUrl + qak._id, qak, { headers: myHeaders })
      .then((response) => {
        getAllQaks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteQak(_id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myQakToken")}`
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
        addQak,
        editQak,
        deleteQak,
        getAllUserWithQaks
      }}
    >
      {props.children}
    </QakContext.Provider>
  );
};
