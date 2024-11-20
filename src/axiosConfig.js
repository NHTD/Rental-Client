import axios from "axios";

const baseURL =
  process.env.REACT_APP_SERVER_URL ||
  "http://localhost:8088" ||
  "http://localhost:8080";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem("persist:auth");
    const publicUrls = [
      "/rental-home/users",
      "/rental-home/authenticate",
      "/rental-home/categories",
      "/rental-home/provinces",
      "/rental-home/posts",
      "/rental-home/authenticate/social-login",
      "/rental-home/authenticate/social/callback",
    ];

    // console.log(new URL(config.url, process.env.REACT_APP_SERVER_URL).pathname);
    if (
      publicUrls.includes(
        new URL(config.url, process.env.REACT_APP_SERVER_URL).pathname
      )
    ) {
      return config;
    }

    let token =
      window.localStorage.getItem("persist:auth") &&
      JSON.parse(window.localStorage.getItem("persist:auth"))?.token.slice(
        1,
        -1
      );

    config.headers = {
      Authorization: token ? `Bearer ${token}` : null,
    };

    return config;
  },
  function (error) {
    console.log("error: ", error);
    return Promise.reject(error);
  }
);

export default instance;
