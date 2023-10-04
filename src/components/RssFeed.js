import React from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import "../styles/RssFeed.css";

const RssFeed = () => {
  return (
    <>
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
                    <Card.Link href="#">Read more...</Card.Link>
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
                      <Card.Link href="#">Read more...</Card.Link>
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
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <ListGroup variant="flush">
                      <ListGroup.Item>Cras justo odio</ListGroup.Item>
                      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
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
