import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080"
  //  baseURL: "https://play-connect.onrender.com"
});

axiosClient.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default axiosClient;