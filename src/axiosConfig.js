import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem("persist:auth");
    const publicUrls = [
      "/rentalHome/users",
      "/rentalHome/authenticate",
      "/rentalHome/categories",
      "/rentalHome/provinces",
      "/rentalHome/posts",
      "/rentalHome/authenticate/social-login",
      "/rentalHome/authenticate/social/callback"
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
