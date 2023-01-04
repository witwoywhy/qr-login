import axios, { AxiosInstance } from "axios";

let instance: AxiosInstance

export default function GetAxios(): AxiosInstance {
  if (instance) return instance

  instance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      'Content-Type': 'application/json'
    }
  
  })

  return instance
}
