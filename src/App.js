import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import About from "./components/About";
import RssFeed from "./components/RssFeed";
import Search from "./components/Search";
// import UserDetail from "./components/UserDetails";
// import QakDetail from "./components/QakDetails";
import { UserProvider } from "./contexts/UserProvider";
import { SearchProvider } from "./contexts/SearchContext";
import "./styles/App.css";
import jwtDecode from "jwt-decode";
import SignOut from "./components/SignOut";
import QakContext from "./contexts/QakContext";
import Qak from "./components/Qak";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("userToken");
      const userToken = jwtDecode(jwt);
      setUser(userToken);
    } catch (ex) {}
  }, []);

  return (
    <div className="wrap backgroundColor">
      <SearchProvider>
        <UserProvider>
          <BrowserRouter>
            <Navigation user={user} />
            <Routes>
              <Route path="/" element={<Home />} index />
              <Route path="/" element={<Search />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/rssfeed" element={<RssFeed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<Qak />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
