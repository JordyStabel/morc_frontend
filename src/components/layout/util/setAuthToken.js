import axios from "axios";

// Will automatically set the autherization header for every axios request with a token,
// if there is a token. Else it will delete the header.
export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearee ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
