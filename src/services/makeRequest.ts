import axios from "axios"
// import dotenv from "dotenv";
// dotenv.config();

const api = axios.create({
  baseURL: "http://localhost:4000"
})

export function makeRequest(url: any, options?: any) {
  return api(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}