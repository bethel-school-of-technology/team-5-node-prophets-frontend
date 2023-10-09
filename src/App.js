import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import About from "./components/About";
import "./styles/App.css";
import RssFeed from "./components/RssFeed";
import SignUp from "./components/SignUp";
import { UserProvider } from "./contexts/UserProvider";
import jwtDecode from "jwt-decode";

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
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/rssfeed" element={<RssFeed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
