import axios from "axios"
import { useHistory } from "react-router-dom"

const backend = axios.create({
  baseURL: process.env.REACT_APP_BE_URL_DEV,
  withCredentials: true,
})

const refreshAccessToken = async () => {
  const { data } = await backend.post("/auth/refreshToken")
  return data
}

// Response interceptor
// Retrying requests after refreshing tokens
backend.interceptors.response.use(
  //By default we are forwarding the response as-is
  (response) => response,
  //But here we define the error handler
  async function (error) {
    // The configuration for the request that just failed:
    const failedRequest = error.config
    if (
      // If unauthorized let's try to refresh the tokens...
      error.response.status === 401 &&
      // but won't retry if the failed request was already attempting to refresh the tokens
      failedRequest.url !== "/auth/refreshToken"
    ) {
      await refreshAccessToken()

      const retryRequest = backend(failedRequest)
      return retryRequest
    } else if (failedRequest.url === "/auth/refreshToken") {
      window.location.href = "/login"
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

export default backend
