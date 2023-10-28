import React, { useState } from "react";
import "../styles/Profile.css";
import { Modal, Button, Form } from "react-bootstrap";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [displayedText, setDisplayedText] = useState(""); // New state variable

  const handleShowModal = () => {
    setInputValue(""); // Clear the inputValue when the modal is shown
    setDisplayedText(""); // Clear the displayedText when the modal is shown
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  const handlePost = () => {
    setDisplayedText(inputValue); // Store the entered text in displayedText
    setShowModal(false); // Close the modal
  };

  return (
    <div className="profile-section">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="my-3">John-Smith 12656</h5>
              <h5 className="my-3">John.Smith@example.com</h5>

              <div className="d-flex justify-content-center mb-2">
                {/* Button to trigger the Bootstrap modal */}
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleShowModal}
                >
                  QAK
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4 m-5">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">John Smith</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">City</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">Grand Rapids</p>
                </div>
              </div>

              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">State</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">Michigan</p>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Member Since:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">May 04, 2022</p>
                </div>
                <hr />

                <div className="d-flex justify-content-center">
                  <button type="button" class="btn btn-primary btn-lg">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bootstrap Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Any Questions or Thoughts?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Enter Text:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type something..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePost}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row">
          <div className="col-md-8">
            <h3>Latest Qaks</h3>
            <div className="card mb-4" style={{ height: "500px" }}>
              <div className="card-body" style={{ fontSize: "16px" }}>
                {/* Place your content for Latest Qaks here */}

                {/* Display the entered text */}
                {displayedText && (
                  <div className="card border-primary p-2 ">
                    <div className="mt-3">
                      <h5>John-Smith 12656:</h5>
                      <p>{displayedText}</p>
                    </div>
                  </div>
                )}

                <br />

                <div className="card border-primary p-2 ">
                  <p>
                    <strong>John-Smith 12656:</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </p>
                </div>
                <br />

                <div className="card border-primary p-2 ">
                  <p>
                    <strong>John-Smith 12656:</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </p>
                </div>
                <br />
                <div className="card border-primary p-2 ">
                  <p>
                    <strong>John-Smith 12656:</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-4">
            <h3>Featured Articles </h3>
            <div className="row">
              <div className="card">
                <div className="card-body">
                  {/* Place your content for Featured Article 1 here */}
                  <h5> How to Work Smarter with generative AI </h5>
                  <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque...
                  </p>
                  <hr />
                  <h5> Practical (and Powerful) ways to use metaverse </h5>
                  <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque...
                  </p>
                  <hr />
                  <h5> What if we performed 1% better? </h5>
                  <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-4">
            <h3>Your Followers</h3>

            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="https://placekitten.com/150/150" // Replace with the actual image URL for Follower 1
                      alt="Follower 1"
                      className="rounded-circle img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <p className="card-text"> Tom Gasper</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="https://placekitten.com/150/150" // Replace with the actual image URL for Follower 2
                      alt="Follower 2"
                      className="rounded-circle img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <p className="card-text">Gasper Tom </p>
                  </div>
                </div>

                {/* Add more followers here using the same structure */}

                <hr />

                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="https://placekitten.com/150/150" // Replace with the actual image URL for Follower 2
                      alt="Follower 2"
                      className="rounded-circle img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <p className="card-text">Jerry Gasper</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
