import axios from "axios"

// We are creating a request (without defining the type)
// for easy use across the application
export const publicFetch = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER
});
