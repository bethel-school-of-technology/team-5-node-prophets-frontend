import axios from "axios";
import { useEffect, useState } from "react";
import PostContext from "./PostContext";

export const PostProvider = (props) => {
  const [post, setPost] = useState([]);
  const baseUrl = "http://localhost:3000/api/post/";

  useEffect(() => {
    async function fetchData() {
      await getAllPosts();
    }
    fetchData();
  }, []);

  function getAllPosts() {
    return axios.get(baseUrl).then((response) => setPost(response.data));
  }

  function getPost(_id) {
    return axios.get(baseUrl + _id).then((response) => {
      getAllPosts();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function addPost(post) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myPostToken")}`,
    };

    return axios
      .post(baseUrl, post, { headers: myHeaders })
      .then((response) => {
        getAllPosts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function editPost(post) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myPostToken")}`,
    };
    return axios
      .put(baseUrl + post._id, post, { headers: myHeaders })
      .then((response) => {
        getAllPosts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deletePost(_id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("myPostToken")}`,
    };
    return axios
      .delete(baseUrl + _id, { headers: myHeaders })
      .then((response) => {
        getAllPosts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  return (
    <PostContext.Provider
      value={{
        post,
        getPost,
        addPost,
        editPost,
        deletePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
