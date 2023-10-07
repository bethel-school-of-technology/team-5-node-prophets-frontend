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

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/search?q=${query}`);
        const data = await response.json();

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
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setLocalResults({ users: [], qaks: [], articles: [] });
    }
  }, [query, results]);

  return (
    <div className="search-container mt-2">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="list-group mt-2">
        {localResults.users.length > 0 && (
          <>
            <h6 className="mt-2">Users:</h6>
            {localResults.users.map((user) => (
              <Link
                key={user.user_id}
                to={`/user/${user.user_id}`}
                className="list-group-item list-group-item-action"
              >
                {user.fullname}
              </Link>
            ))}
          </>
        )}

        {localResults.qaks.length > 0 && (
          <>
            <h6 className="mt-2">Qaks:</h6>
            {localResults.qaks.map((qak) => (
              <Link
                key={qak.qak_id}
                to={`/qak/${qak.qak_id}`}
                className="list-group-item list-group-item-action"
              >
                {qak.qak}
              </Link>
            ))}
          </>
        )}

        {localResults.articles.length > 0 && (
          <>
            <h6 className="mt-2">Articles:</h6>
            {localResults.articles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.item.title}`}
                className="list-group-item list-group-item-action"
              >
                {article.item.title}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
