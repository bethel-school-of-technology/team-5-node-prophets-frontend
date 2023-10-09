import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { SearchContext } from "../contexts/SearchContext";
import "../styles/Search.css";

const Search = ({ query, setQuery }) => {
  const { results, setResults } = useContext(SearchContext);
  const searchContainerRef = useRef(null);

  const sitePages = [
    //supposed to search in site content.....

    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    // ... add other static pages as needed
  ];

  const [localResults, setLocalResults] = useState({
    users: [],
    qaks: [],
    articles: [],
    general: [],
  });

  const [selectedDetail, setSelectedDetail] = useState(null);

  // Determine if results are being shown
  const showingResults =
    localResults.users.length > 0 ||
    localResults.qaks.length > 0 ||
    localResults.articles.length > 0 ||
    localResults.general.length > 0;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/search?q=${query}`);
        const data = await response.json();

        const matchingSitePages = sitePages.filter((page) =>
          page.name.toLowerCase().includes(query.toLowerCase())
        );

        setLocalResults({
          general: matchingSitePages,
          users: data.users || [],
          qaks: data.qaks || [],
          articles: data.articles || [],
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setLocalResults({ users: [], qaks: [], articles: [], general: [] });
    }
  }, [query, results]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSelectedDetail(null);
        setLocalResults({ users: [], qaks: [], articles: [], general: [] });
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function displayDetailedResults(item) {
    setSelectedDetail(item);
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
    setSelectedDetail(null);
    setLocalResults({ users: [], qaks: [], articles: [], general: [] });
  }

  return (
    <div
      className={`search-container mt-2 ${
        showingResults ? "blurred-background" : ""
      }`}
      ref={searchContainerRef}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onClick={() => {
          setSelectedDetail(null);
          setLocalResults({ users: [], qaks: [], articles: [], general: [] });
        }}
      />
      <div className="list-group mt-2 search-results">
        {["users", "qaks", "articles", "general"].map((category) =>
          localResults[category].slice(0, 5).map((item, index) => (
            <Link
              key={item.id || index}
              to={item.link || `/article/${item.title}`}
              className="list-group-item list-group-item-action"
              onClick={() => displayDetailedResults(item)}
            >
              {item.fullname || item.qak || item.title || item.name}
            </Link>
          ))
        )}
      </div>

      <div className="search-results-display">
        {selectedDetail && (
          <Card>
            <Card.Header>
              {selectedDetail.fullname ||
                selectedDetail.qak ||
                selectedDetail.item?.title}
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
              {selectedDetail.item?.description && (
                <Card.Text>
                  Description: {selectedDetail.item.description}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;
