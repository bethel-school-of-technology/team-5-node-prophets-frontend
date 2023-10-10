import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function SignOut() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const jwt = localStorage.removeItem("myPostToken");
      const userToken = jwtDecode(jwt);
      setUser(userToken);
    } catch (ex) {}
  }, []);

  return (window.location = "/");
}

export default SignOut;
