import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const toilet = axios.create({
  baseURL: "https://www.refugerestrooms.org/api/v1/restrooms/",
});
