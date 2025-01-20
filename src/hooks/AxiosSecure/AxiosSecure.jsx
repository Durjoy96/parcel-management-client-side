import axios from "axios";

const instance = axios.create({
  baseURL: "https://percel-management-server-chi.vercel.app",
});

const AxiosSecure = () => {
  return instance;
};

export default AxiosSecure;
