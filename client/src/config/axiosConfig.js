import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000" || process.env.HOST_URL,
});

export default instance;
