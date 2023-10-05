import React from "react";
import "../styles/Home.css";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Container fluid>
      {" "}
      <div className="home-wrap ">
        <h2>Welcome To Our Site!</h2>
      </div>
      <Row>
        <Col>
          <div className="image-container">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
              alt="Outer Space view of Earth"
            />
          </div>
        </Col>

        <Col>
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sit amet pretium urna. Vivamus venenatis velit nec neque ultricies,
            eget elementum magna tristique. Quisque vehicula, risus eget aliquam
            placerat, purus leo tincidunt eros, eget luctus quam orci in velit.
            Praesent scelerisque tortor sed accumsan convallis.
          </p>
        </Col>
      </Row>
      <br />
      <br />
      <Row xs={1} md={5} className="g-5">
        <Col>
          <Card style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              alt="Music Theme"
            />
            <Card.Body className="text-center">
              <Card.Text>Carlito Pedida</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=884&q=80"
              alt="Third Shift Coffee"
            />
            <Card.Body className="text-center">
              <Card.Text>Emmanuel Mefor</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1579458342405-52d7d969e0d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80"
              alt="Chain Breaker"
            />
            <Card.Body className="text-center">
              <Card.Text>Joe Lester</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1604931668626-ab49cb27d952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              alt="Latin Scholar"
            />
            <Card.Body className="text-center">
              <Card.Text>Joseph Miloscia</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1619467416348-6a782839e95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Traveler"
            />
            <Card.Body className="text-center">
              <Card.Text>Taminee Ficklin</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <footer className="footer">
          <p>5NodeProphets</p>
          <p>October 2023</p>
        </footer>
      </Row>
    </Container>
  );
};
export default Home;
