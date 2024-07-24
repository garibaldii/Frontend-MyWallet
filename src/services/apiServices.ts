import axios from "axios";

const apiURL = 'http://localhost:8080/api/'


export const apiClient = axios.create({
    baseURL: apiURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
})