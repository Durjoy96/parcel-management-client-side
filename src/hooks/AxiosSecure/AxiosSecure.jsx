import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const AxiosSecure = () => {
  return instance;
};

export default AxiosSecure;
