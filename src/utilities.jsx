import axios from "axios";

export const api = axios.create({
  baseURL: "http://54.153.46.22/api/",
});

export const toilet = axios.create({
  baseURL: "https://www.refugerestrooms.org/api/v1/restrooms/",
});
