import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    console.log(code)
    axios
      .post("https://spotifytzback.herokuapp.com/login", { code })
      .then((response) => {

        // If success then cut the code string from the URL and execute the other thing
        window.history.pushState({}, null, "/");
        console.log(response.data.accessToken)
        setAccessToken(response.data.accessToken);

      })
      .catch(() => {
        console.log("Ooooooo")
        //   If fail redirect to home page - Login page
        window.location = "/";
      });
  }, [code]);

  return accessToken
}