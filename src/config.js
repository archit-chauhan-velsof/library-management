import axios from "axios";

export const itemsPerPage = 5;
export const pageRangeDisplayed = 5;

export const baseUrl = 'https://jsonplaceholder.typicode.com/';


export const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
