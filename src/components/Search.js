import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Search.css";

const Search = ({ query, setQuery }) => {
  const [results, setResults] = useState({ users: [], qaks: [] });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults({ users: [], qaks: [] });
    }
  }, [query]);

  return (
    <div className="search-container mt-2">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="live-search-dropdown">
          <h3>Users:</h3>
          <ul>
            {results.users.map((user) => (
              <li key={user.user_id}>
                <Link to={`/user/${user.user_id}`}>{user.fullname}</Link>
              </li>
            ))}
          </ul>

          <h3>Qaks:</h3>
          <ul>
            {results.qaks.map((qak) => (
              <li key={qak.qak_id}>
                <Link to={`/qak/${qak.qak_id}`}>{qak.qak}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
