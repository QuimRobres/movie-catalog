import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

axios.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/movie")) {
      const token = window.localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } else return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const headers = {
  "Content-Type": "application/json",
};

const get = async (url) => {
  const response = await axios({
    url,
    method: "GET",
    headers,
  });

  return response.data;
};

const post = async (url, body) => {
  const response = await axios({
    url,
    method: "POST",
    headers,
    data: body,
  });
  return response.data;
};

export const http = {
  get,
  post,
};
