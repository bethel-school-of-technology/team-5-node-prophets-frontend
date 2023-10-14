import React, { useState, useEffect, useContext } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  ListGroup,
  Modal,
  Row
} from "react-bootstrap";
import UserContext from "../contexts/QakContext";
import "../styles/RssFeed.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";

const RssFeed = () => {
  const [topCommenter, setTopCommenter] = useState([]);

  console.log(topCommenter);
  const baseUrl = "http://localhost:3000/api/users";

  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();
  }, []);

  function getAllUsers() {
    return axios
      .get(baseUrl)
      .then((response) => setTopCommenter(response.data));
  }

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchRssFeeds = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/rss/feeds");
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Error fetching RSS feeds:", error);
      }
    };

    fetchRssFeeds();
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
              {articles.slice(1, 6).map((item, idx) => (
                <Col key={idx}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <Card.Link
                          className="link text-secondary"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          {item.title}
                        </Card.Link>
                      </Card.Title>

                      <Card.Text className="p-3">{item.content}</Card.Text>

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
                            className="text-secondary"
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
                <Accordion defaultActiveKey="1" flush>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Artificial Intelligence</Accordion.Header>
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
                <br />

                <Card>
                  <Card.Header>
                    <strong>Top Commenters</strong>
                  </Card.Header>
                  <Card.Body>
                    {topCommenter.slice(1, 6).map((user, id) => (
                      <ListGroup key={id}>
                        <div className="top-com">
                          <ListGroup.Item>
                            <img
                              key={id}
                              alt="Avatar"
                              className="tc-img"
                              src={user.profilePicture}
                            />
                            {user.fullname}
                          </ListGroup.Item>
                        </div>
                      </ListGroup>
                    ))}
                  </Card.Body>
                </Card>
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
            <Modal.Title className="text-primary">
              You are about the leave the ETM website!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mod-txt1">{selectedArticle?.contentSnippet}</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="mod-foot">
              <div>
                <p className="mod-txt2">
                  Author: {selectedArticle?.creator} | Published:{" "}
                  {moment
                    .parseZone(selectedArticle?.pubDate)
                    .local()
                    .format("LLLL")}{" "}
                </p>
              </div>
              <div>
                <Button
                  variant="outline-primary"
                  href={selectedArticle?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setModalShow(false)}
                >
                  Read Full Article
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => setModalShow(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RssFeed;
