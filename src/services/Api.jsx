import axios from "axios";
import Cookies from "js-cookie";

const Api = axios.create({
  // Set endpoint API from environment variable
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // Set header axios
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Handle unauthenticated
Api.interceptors.response.use(
  function (response) {
    // Return response
    return response;
  },
  (error) => {
    // Check if response is unauthenticated
    if (401 === error.response.status) {
      // Remove token
      Cookies.remove("token");

      // Remove user
      Cookies.remove("user");

      // Remove permissions
      Cookies.remove("permissions");

      // Redirect to "/"
      window.location = "/";
    } else if (403 === error.response.status) {
      // Redirect to "/forbidden"
      window.location = "/forbidden";
    } else {
      // Reject promise error
      return Promise.reject(error);
    }
  }
);

export default Api;