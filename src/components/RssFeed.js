import React from "react";
import { Card, Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import "../styles/RssFeed.css";
import { Link } from "react-router-dom";
import Article from "./Article";

const RssFeed = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <>
        <Article show={modalShow} onHide={() => setModalShow(false)} />
      </>
      <h3>RSS Feed</h3>
      <div className="rss g-3">
        <div className="col-9">
          <Row xs={1} md={1} className="g-3">
            <div>
              <Card>
                <Card.Header>Featured Article</Card.Header>
                <Card.Body>
                  <Card.Title>Article Title</Card.Title>
                  <Card.Text>
                    Article Teaser Text Here. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </Card.Text>
                  <Card.Text className="text-end">
                    <Card.Link onClick={() => setModalShow(true)}>
                      Read more...
                    </Card.Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Body>
                    <Card.Title>Article Title</Card.Title>
                    <Card.Text>
                      Article Teaser Text Here. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </Card.Text>
                    <Card.Text className="text-end">
                      <Card.Link onClick={() => setModalShow(true)}>
                        Read more...
                      </Card.Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className="trending col-3">
          <Row>
            <Col>
              <Card>
                <Card.Header>Trending</Card.Header>
                <Card.Body>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <ListGroup variant="flush">
                      <Nav.Link onClick={() => setModalShow(true)}>
                        <Card.Title>Cras justo odio...</Card.Title>
                      </Nav.Link>
                      <Nav.Link onClick={() => setModalShow(true)}>
                        <Card.Title>Dapibus ac facilisis in...</Card.Title>
                      </Nav.Link>
                      <Nav.Link onClick={() => setModalShow(true)}>
                        <Card.Title>Vestibulum at eros...</Card.Title>
                      </Nav.Link>
                    </ListGroup>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default RssFeed;
