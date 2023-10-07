import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/Home.css";

function QakDetail() {
  const { id } = useParams();
  const [qakData, setQakData] = useState(null);

  useEffect(() => {
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
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col md={8} lg={6}>
          {qakData ? (
            <Card>
              <Card.Body>
                <Card.Title>Qak Detail:</Card.Title>
                <Card.Text>{qakData.qak}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default QakDetail;
