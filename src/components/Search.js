import React, { useState, useEffect, useContext } from "react";
import { useSearch } from "../contexts/SearchContext";
import debounce from "lodash.debounce";
import Modal from "react-bootstrap/Modal";
import "../styles/Search.css";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Search = ({ show, handleClose }) => {
  const { query, setQuery } = useSearch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize selectedDetail, showingResults, selectedCategory, and NoResults
  const [, setSelectedDetail] = useState(null);
  const [showingResults, setShowingResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  // Initialize localResults state to store search results
  const [localResults, setLocalResults] = useState({
    users: [],
    qaks: [],
    articles: [],
  });

  // Fetch search results based on the query and selected category
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Define the category to search
        let categoryParam = "";
        if (selectedCategory !== "All") {
          categoryParam = `&category=${selectedCategory.toLowerCase()}`;
        }

        // Fetch search results using query and category parameters
        const response = await fetch(
          `http://localhost:3000/search?q=${query}${categoryParam}`
        );
        const data = await response.json();

        // Extract RSS feed results from the data
        const { rssArticles } = data;

        // Initialize localResults with empty arrays for all categories
        const newLocalResults = {
          users: [],
          qaks: [],
          articles: [],
        };

        // Update localResults based on the selected category
        if (selectedCategory === "Users") {
          newLocalResults.users = data.users || [];
        } else if (selectedCategory === "Qaks") {
          newLocalResults.qaks = data.qaks || [];
        } else if (selectedCategory === "Articles") {
          newLocalResults.articles = rssArticles || [];
        } else if (selectedCategory === "All") {
          newLocalResults.users = data.users || [];
          newLocalResults.qaks = data.qaks || [];
          newLocalResults.articles = rssArticles || [];
        }

        // Update localResults with the new data
        setLocalResults(newLocalResults);

        // Set showingResults to true to display results
        setShowingResults(true);
        // Check if there are no results in any category
        const hasNoResults = Object.values(newLocalResults).every(
          (categoryResults) => categoryResults.length === 0
        );

        // Set noResults state accordingly
        setNoResults(hasNoResults);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
        console.error(error); // Logging the whole error for more details

        // Set showingResults to false in case of an error
        setShowingResults(false);
      }
    };

    // Only fetch results if there's a query
    if (query) {
      fetchResults();
    } else {
      // Clear results and hide them when the query is empty
      setLocalResults({ users: [], qaks: [], articles: [] });
      setShowingResults(false);
    }
  }, [query, selectedCategory]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Handling information when a search result is clicked
  const displayDetailedResults = (item) => {
    switch (selectedCategory) {
      case "Users":
        if (isLoggedIn) {
          navigate(`/profile/${item.id}`);
        } else {
          setCurrentUser(item);
          setShowUserModal(true);
        }
        break;
      case "Qaks":
        navigate(`/qaks/${item.qak_id}/edit`); // existing navigation to edit a QAK
        break;
      case "Articles":
      case "All":
        if (item.link) {
          window.open(item.link, "_blank");
        } else if (item.user_id) {
          if (isLoggedIn) {
            navigate(`/profile/${item.user_id}`);
          } else {
            setShowLoginModal(true); // Display login modal for unauthenticated users
          }
        } else {
          console.error("No link or user_id available for this item:", item);
        }
        break;
      default:
        console.error("Unknown category:", selectedCategory);
    }
  };

  // Handle input changes in the search bar
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Only fetch results if there's a query
    if (newQuery) {
      debounceFetchResults(newQuery);
    } else {
      // Clear results and hide them when the query is empty
      setLocalResults({ users: [], qaks: [], articles: [] });
      setShowingResults(false);
    }
  };

  // Use debounce to delay fetching results as you type
  const debounceFetchResults = debounce((newQuery) => {
    // Results are fetched in the useEffect hook based on the newQuery
  }, 500);

  // Handle changes in the selected category from the dropdown
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  // Define the available categories for searching
  const categories = ["All", "Users", "Qaks", "Articles"];

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-md-8">
              {/* Text input for search */}
              <input
                type="text"
                className="form-control"
                placeholder="Search Here"
                value={query}
                onChange={handleInputChange}
                aria-label="Search Input"
              />
            </div>
            <div className="col-md-4">
              {/* Category dropdown */}
              <select
                className="custom-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                aria-label="Category Dropdown"
              >
                <option value="" disabled>
                  Pick Category
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className={cat === "All" ? "all-category" : ""}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showingResults && (
            <div className="list-group mt-2 search-results">
              {noResults ? (
                <div className="result-category">
                  <h5 className="category-title">
                    Sorry folks, Search Result Not Found
                  </h5>

                  <p>No matching results found for "{query}".</p>
                </div>
              ) : (
                // Display RSS Feed results and other categories
                <>
                  {/* Display RSS Feed results */}
                  {selectedCategory === "Articles" &&
                    localResults.articles.length > 0 && (
                      <div className="result-category">
                        <h5 className="category-title">Articles</h5>
                        {localResults.articles.map((rssItem, index) => (
                          <a
                            key={rssItem.id || index}
                            href={rssItem.link} // Link to the RSS Feed item
                            className="list-group-item list-group-item-action d-flex justify-content-between"
                          >
                            <div>
                              <strong>{rssItem.title}</strong>
                            </div>
                            <div>
                              {rssItem.description && (
                                <span>Description: {rssItem.description}</span>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    )}

                  {/* Display other search categories */}
                  {selectedCategory !== "Articles" &&
                    Object.keys(localResults).map((category) => {
                      if (localResults[category].length > 0) {
                        return (
                          <div
                            key={category}
                            className="result-category d-flex flex-column"
                          >
                            <h5 className="category-title">{category}</h5>
                            {localResults[category].map((item, index) => (
                              <div
                                key={item.id || index}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                onClick={() => displayDetailedResults(item)}
                              >
                                <strong>
                                  {item.fullname || item.qak || item.title}
                                </strong>
                                <div>
                                  {item.city && (
                                    <span className="user-info">
                                      City: {item.city}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })}
                </>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
