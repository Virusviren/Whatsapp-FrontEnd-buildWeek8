import axios from "axios"

const backend = axios.create({ baseURL: process.env.REACT_APP_BE_URL_DEV, withCredentials: true })

export default backend
