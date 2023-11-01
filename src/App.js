import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import RssFeed from "./components/RssFeed";
import Search from "./components/Search";
import { UserProvider } from "./contexts/UserProvider";
import { SearchProvider } from "./contexts/SearchContext";
import { QakProvider } from "./contexts/QakProvider";
import "./styles/App.css";
import jwtDecode from "jwt-decode";
import SignOut from "./components/SignOut";
import Qak from "./components/Qak";
import SignIn from "./components/SignIn";
import NewQak from "./components/NewQak";
import EditQak from "./components/EditQak";
import EditProfile from "./components/EditProfile";
import NoProfile from "./components/NoProfile";

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
      <QakProvider>
        <SearchProvider>
          <UserProvider>
            <BrowserRouter>
              <Navigation user={user} />

              <Routes>
                <Route path="/" element={<Home />} index />
                <Route path="/search" element={<Search />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signout" element={<SignOut />} />
                <Route path="/rssfeed" element={<RssFeed />} />
                <Route path="/qaks" element={<Qak />} />
                <Route path="/qaks/new" element={<NewQak />} />
                <Route path="/qaks/:qak_id/edit" element={<EditQak />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/profile/:id/edit" element={<EditProfile />} />
                <Route path="/noprofile/:user_id" element={<NoProfile />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </SearchProvider>
      </QakProvider>
    </div>
  );
}

export default App;
