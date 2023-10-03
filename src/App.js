import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
//removed about page import
import Search from "./components/Search";
import UserDetail from "./components/UserDetails";
import QakDetail from "./components/QakDetails";
import "./styles/App.css";
import RssFeed from "./components/RssFeed";

function App() {
  return (
    <div className="wrap">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/newsfeed" element={<RssFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Search />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/qak/:id" element={<QakDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
