import axios from "axios";

const apiURL = 'http://localhost:8080/api/'


export const apiClient = axios.create({
    baseURL: apiURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
})


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})