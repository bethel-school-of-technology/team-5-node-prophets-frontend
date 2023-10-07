import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import "../styles/Search.css";

const Search = ({ query, setQuery }) => {
  const { results, setResults } = useContext(SearchContext);

  const [localResults, setLocalResults] = useState({
    users: [],
    qaks: [],
    articles: [],
  });

  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/search?q=${query}`);
        const data = await response.json();
        // process the data and set the local results state

        let articleResults = [];
        if (results) {
          articleResults = results.filter((article) =>
            article.item.title.includes(query)
          );
        }

        setLocalResults({
          users: data.users || [],
          qaks: data.qaks || [],
          articles: articleResults,
          // Add other categories if needed...
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setLocalResults({ users: [], qaks: [], articles: [] });
      // Reset other categories if needed...
    }
  }, [query, results]);

  function displayDetailedResults(item) {
    setSelectedDetail(item);
  }

  return (
    <div className="search-container mt-2">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="list-group mt-2 search-results">
        {localResults.users.slice(0, 5).map((user) => (
          <Link
            key={user.user_id}
            to={`/user/${user.user_id}`}
            className="list-group-item list-group-item-action"
            onMouseOver={() => displayDetailedResults(user)}
            onClick={() => displayDetailedResults(user)}
          >
            {user.fullname}
          </Link>
        ))}

        {localResults.qaks.slice(0, 5).map((qak) => (
          <Link
            key={qak.qak_id}
            to={`/qak/${qak.qak_id}`}
            className="list-group-item list-group-item-action"
            onMouseOver={() => displayDetailedResults(qak)}
            onClick={() => displayDetailedResults(qak)}
          >
            {qak.qak}
          </Link>
        ))}

        {localResults.articles.slice(0, 5).map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.item.title}`}
            className="list-group-item list-group-item-action"
            onMouseOver={() => displayDetailedResults(article)}
            onClick={() => displayDetailedResults(article)}
          >
            {article.item.title}
          </Link>
        ))}
      </div>

      <div className="search-results-display">
        {selectedDetail && (
          <div>
            <h2>
              {selectedDetail.fullname ||
                selectedDetail.qak ||
                selectedDetail.item?.title}
            </h2>
            {selectedDetail.email && <p>Email: {selectedDetail.email}</p>}
            {selectedDetail.qak && <p>Qak: {selectedDetail.qak}</p>}
            {selectedDetail.item?.description && (
              <p>Description: {selectedDetail.item.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
