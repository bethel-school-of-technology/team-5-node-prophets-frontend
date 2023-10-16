import React, { useState, useEffect, useContext, useRef } from "react";
import { Card } from "react-bootstrap";
import { SearchContext } from "../contexts/SearchContext";
import debounce from "lodash.debounce";
import { MDBCol } from "mdbreact";
import "../styles/Search.css";

const Search = ({ query, setQuery }) => {
  // Use SearchContext to access and update search results
  const { results, setResults } = useContext(SearchContext);
  const searchContainerRef = useRef(null);

  // Initialize selectedDetail, showingResults, selectedCategory, and sitePages
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showingResults, setShowingResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sitePages = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    // trying to search home and other static pages, still working on it.....
  ];

  // Initialize localResults state to store search results
  const [localResults, setLocalResults] = useState({
    users: [],
    qaks: [],
    articles: [],
    general: [],
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
          general: [],
        };

        // Update localResults based on the selected category
        if (selectedCategory === "Users") {
          newLocalResults.users = data.users || [];
        } else if (selectedCategory === "Qaks") {
          newLocalResults.qaks = data.qaks || [];
        } else if (selectedCategory === "Articles") {
          newLocalResults.articles = rssArticles || [];
        } else if (selectedCategory === "General") {
          newLocalResults.general = sitePages;
        } else if (selectedCategory === "All") {
          newLocalResults.users = data.users || [];
          newLocalResults.qaks = data.qaks || [];
          newLocalResults.articles = rssArticles || [];
          newLocalResults.general = sitePages;
        }

        // Update localResults with the new data
        setLocalResults(newLocalResults);

        // Set showingResults to true to display results
        setShowingResults(true);
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
      setLocalResults({ users: [], qaks: [], articles: [], general: [] });
      setShowingResults(false);
    }
  }, [query, results, selectedCategory]); // Update results when query or selectedCategory changes

  // Handle clicks outside the search container to clear selectedDetail and hide results
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSelectedDetail(null);
        setLocalResults({ users: [], qaks: [], articles: [], general: [] });
        setShowingResults(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Handeling information when a search result is clicked - QUESTION
  function displayDetailedResults(item) {
    if (selectedCategory === "Users") {
      // Show an alert for the "Users" category
      alert("You must be signed in to view this user's profile");
    } else if (selectedCategory === "Qaks") {
      // Show an alert for the "Qaks" category
      alert("Nothing more to view");
    } else if (selectedCategory === "Articles" || selectedCategory === "All") {
      // Open the full link for articles
      if (item.link) {
        window.open(item.link, "_blank");
      }
    } else {
      // Display details for other categories
      setSelectedDetail(item);
    }
  }

  // Handle input changes in the search bar
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Only fetch results if there's a query
    if (newQuery) {
      debounceFetchResults(newQuery);
    } else {
      // Clear results and hide them when the query is empty
      setLocalResults({ users: [], qaks: [], articles: [], general: [] });
      setShowingResults(false);
    }
  };

  // Use debounce to delay fetching results as you type, - help with looping?
  const debounceFetchResults = debounce((newQuery) => {
    // Results are fetched in the useEffect hook based on the newQuery
  }, 500);

  // Handle changes in the selected category from the dropdown
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Define the available categories for searching
  const categories = ["All", "Users", "Qaks", "Articles", "General"];

  return (
    <div className="search-container mt-1" ref={searchContainerRef}>
      <div className="input-group md-form form-sm form-1 pl-0">
        <MDBCol md="10">
          <input
            type="text"
            className="form-control"
            placeholder="Search Here"
            value={query}
            onChange={handleInputChange}
          />
        </MDBCol>
        <div className="pick-category-text">Pick Category</div>
        {/* Display Catagories in Search */}
        <select
          className="ml-2"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
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

      {showingResults && (
        <div className="list-group mt-2 search-results">
          {/* Display RSS Feed results */}
          {selectedCategory === "Articles" &&
            localResults.articles.length > 0 && (
              <div className="result-category">
                <h5 className="category-title">RSS Feed</h5>
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
                          {item.email && (
                            <span className="user-info">
                              Email: {item.email}{" "}
                            </span>
                          )}
                          {item.city && (
                            <span className="user-info">City: {item.city}</span>
                          )}
                          {item.state && <span>State: {item.state}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
        </div>
      )}

      {selectedDetail && (
        <div className="search-results-display">
          <Card>
            <Card.Header>
              {selectedDetail.fullname ||
                selectedDetail.qak ||
                selectedDetail.title}
            </Card.Header>
            <Card.Body>
              {selectedDetail.email && (
                <Card.Text>Email: {selectedDetail.email}</Card.Text>
              )}
              {selectedDetail.city && (
                <Card.Text>City: {selectedDetail.city}</Card.Text>
              )}
              {selectedDetail.state && (
                <Card.Text>State: {selectedDetail.state}</Card.Text>
              )}
              {selectedDetail.description && (
                <Card.Text>Description: {selectedDetail.description}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Search;
