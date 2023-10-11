import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function SignOut() {
  const [user, setUser] = useState();

  console.log(user);
  useEffect(() => {
    try {
      const jwt = localStorage.removeItem("userToken");
      const userToken = jwtDecode(jwt);
      setUser(userToken).then(() => {
        window.location = "/";
      });
    } catch (ex) {}
  }, []);
}

export default SignOut;
