import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import About from "./components/About";
import RssFeed from "./components/RssFeed";
import Search from "./components/Search";
// import UserDetail from "./components/UserDetails";
// import QakDetail from "./components/QakDetails";
import Article from "./components/Article";
import { UserProvider } from "./contexts/UserProvider";
import { Button } from "react-bootstrap";
import { SearchProvider } from "./contexts/SearchContext";
import "./styles/App.css";

function App() {
  return (
    <div className="wrap backgroundColor">
      <SearchProvider>
        <UserProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
              {/* <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} /> */}
              <Route path="/" element={<Home />} index />
              <Route path="/" element={<Search />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/rssfeed" element={<RssFeed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/user/:id" element={<UserDetail />} />
              <Route path="/qak/:id" element={<QakDetail />} /> */}
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
