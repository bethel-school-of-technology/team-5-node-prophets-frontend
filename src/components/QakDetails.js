import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function QakDetail() {
  const { id } = useParams();
  const [qakData, setQakData] = useState(null);

  useEffect(() => {
    // Fetch the data for this qak by using the ID
    const fetchQakData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/qaks/${id}`);
        const data = await response.json();
        setQakData(data);
      } catch (error) {
        console.error("Error fetching qak details:", error);
      }
    };

    fetchQakData();
  }, [id]);

  return (
    <div>
      {qakData ? (
        <div>
          <h3>Qaks:</h3>
          <p>{qakData.qak}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default QakDetail;
