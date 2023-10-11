import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const [user, setUser] = useState();

  console.log(user);
  useEffect(() => {
    try {
      const jwt = localStorage.removeItem("userToken");
      const userToken = jwtDecode(jwt);
      setUser(userToken).then(() => {});
    } catch (ex) {}
    window.location = "/";
  }, []);
}

export default SignOut;
