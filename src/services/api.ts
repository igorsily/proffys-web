import axios from "axios";

const api = axios.create({
  baseURL: "https://igorsily-proffys.herokuapp.com/",
});

export default api;
