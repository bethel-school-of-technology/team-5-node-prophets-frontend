import axios from "axios";
import React, { useState, useEffect } from "react";
import { Accordion, Button, Card, Col, Modal, Row } from "react-bootstrap";
import "../styles/RssFeed.css";
import moment from "moment";

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

  const [modalShow, setModalShow] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="rss-wrap">
      <div className="rss-bg">
        <div className="rss">
          <div className="latest col-9" xs={1} md={1}>
            <Row xs={1} md={1} className="g-3">
              <h3>Latest Content</h3>
              {articles.slice(0, 10).map((item, idx) => (
                <Col key={idx}>
                  <Card className="card">
                    <Card.Body>
                      <Card.Title>
                        <Card.Link
                          className="link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </Card.Link>
                      </Card.Title>
                      <Card.Text>{item.content}</Card.Text>
                      <Card.Footer>
                        <Card.Text>
                          Published:{" "}
                          {moment
                            .parseZone(item.pubDate)
                            .local()
                            .format("LLLL")}
                        </Card.Text>
                        <Card.Text className="text-end">
                          <Card.Link
                            onClick={() => {
                              setSelectedArticle(item);
                              setModalShow(true);
                            }}
                          >
                            Read more...
                          </Card.Link>
                        </Card.Text>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <div className="pop-feeds col-3" xs="col-12" md="col-12">
            <Row xs={1} md={1} className="g-3">
              <h3>Popular Feeds</h3>

              <Col>
                <Accordion defaultActiveKey="1">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header className="feed-head">
                      Artificial Intelligence
                    </Accordion.Header>
                    <Accordion.Body>
                      {articles.slice(10, 15).map((item, idx) => (
                        <p
                          key={idx}
                          className="link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header className="feed-head">
                      Coder Cheat Sheet
                    </Accordion.Header>
                    <Accordion.Body>
                      {articles.slice(20, 25).map((item, idx) => (
                        <p
                          key={idx}
                          className="link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header className="feed-head">
                      Cloud Security
                    </Accordion.Header>
                    <Accordion.Body>
                      {articles.slice(30, 35).map((item, idx) => (
                        <p
                          key={idx}
                          className="link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header className="feed-head">
                      Cyber Security
                    </Accordion.Header>
                    <Accordion.Body>
                      {articles.slice(40, 45).map((item, idx) => (
                        <p
                          key={idx}
                          className="link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header className="feed-head">
                      For Developers
                    </Accordion.Header>
                    <Accordion.Body>
                      {articles.slice(50, 55).map((item, idx) => (
                        <p
                          key={idx}
                          className="link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header className="feed-head">
                      Dev Ops
                    </Accordion.Header>
                    <Accordion.Body>
                      {articles.slice(60, 65).map((item, idx) => (
                        <p
                          key={idx}
                          className="link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header className="feed-head">
                      Education
                    </Accordion.Header>
                    <Accordion.Body>
                      {articles.slice(70, 75).map((item, idx) => (
                        <p
                          key={idx}
                          className="link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="modal">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>You are about the leave the ETM website!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedArticle?.contentSnippet}</p>

            <p>
              Author: {selectedArticle?.creator} | Published:{" "}
              {moment
                .parseZone(selectedArticle?.pubDate)
                .local()
                .format("LLLL")}{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              href={selectedArticle?.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setModalShow(false)}
            >
              Read Full Article
            </Button>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RssFeed;
