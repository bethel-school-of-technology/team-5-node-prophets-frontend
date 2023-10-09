import React, { useEffect, useState } from "react";
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
<<<<<<< HEAD
import jwtDecode from "jwt-decode";
=======
import { Button } from "react-bootstrap";
import { SearchProvider } from "./contexts/SearchContext";
import "./styles/App.css";
>>>>>>> 6983eeef6691716669e86bc1adf608c26ceea908

function App() {
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   try {
  //     const jwt = localStorage.getItem("userToken");
  //     const userToken = jwtDecode;
  //     setUser(userToken);
  //     console.log(userToken);
  //   } catch (ex) {}
  // }, []);
  // user = { user };
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
