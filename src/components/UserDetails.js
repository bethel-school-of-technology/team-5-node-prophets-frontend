import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch the data for this user by ID
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          //this is setup for authentication but needs a token to work.
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NzA0MzAwOCwiZXhwIjoxNjg3MDQ2NjA4fQ.levcyWekhjv0tQJnqlTKp4VxRdblmoa6lvUv1o6vR3s", // Replace Token with the actual token we get. HELP Having a dificult time with this.
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.fullname}</h2>
          <p>{userData.email}</p>
          <p>{userData.city}</p>
          <p>{userData.state}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserDetail;
