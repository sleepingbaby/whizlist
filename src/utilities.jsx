import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.whizlist.biz/api/",
});

export const toilet = axios.create({
  baseURL: "https://www.refugerestrooms.org/api/v1/restrooms/",
});
