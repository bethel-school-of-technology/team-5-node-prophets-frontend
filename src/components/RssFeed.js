import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  Nav,
  Row
} from "react-bootstrap";
import "../styles/RssFeed.css";
import { Link } from "react-router-dom";
import Article from "./Article";
import context from "react-bootstrap/esm/AccordionContext";

const RssFeed = () => {
  const [articles, setArticles] = useState([]);
  console.log(articles);

  const getArticles = async () => {
    try {
      const res = await axios.get("http://localhost:4000");
      setArticles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const [modalShow, setModalShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State to hold the selected item

  console.log(selectedItem);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalShow(true);
  };

  return (
    <>
      <>
        {/* <Article show={modalShow} onHide={() => setModalShow(false)} /> */}
      </>
      <h3>RSS Feed</h3>
      <div className="rss g-3">
        <div className="col-9">
          <Row xs={1} md={1} className="g-3">
            {articles.map((item, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <Card.Link
                        href={item.item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.item.title}
                      </Card.Link>
                    </Card.Title>
                    <Card.Text>{item.item.pubDate}</Card.Text>
                    {/* <Card.Text className="text-end">
                      <Card.Link onClick={() => openModal(item)}>
                        Read more...
                      </Card.Link>
                    </Card.Text> */}
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
                  {articles.map((item, idx) => (
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Card.Link>
                          <Card.Title key={idx}>{item.item.title}</Card.Title>
                        </Card.Link>
                      </ListGroup.Item>
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

{
  /* {articles.slice(0, 1).map((item) => {
              <Col>
                <Card>
                  <Card.Header>Featured Article</Card.Header>
                  <Card.Body>
                    <Card.Title>{item.item.title}</Card.Title>
                    <Card.Text></Card.Text>
                    <Card.Text className="text-end">
                      <Card.Link onClick={() => setModalShow(true)}>
                        Read more...
                      </Card.Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
                ;
              </Col>;
            })} */
}
