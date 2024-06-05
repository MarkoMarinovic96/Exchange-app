/* eslint-disable no-param-reassign */
import Axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
const client = Axios.create({
  baseURL: "https://api.hnb.hr/tecajn-eur",
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  return config;
}

function authResResponseInterceptor(response: AxiosResponse) {
  return response;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function authErrResponseInterceptor(error: any) {
  const message = error.response?.data?.errors || error.message;

  error.message = message;

  return Promise.reject(error);
}

client.interceptors.request.use(authRequestInterceptor);
client.interceptors.response.use(
  authResResponseInterceptor,
  authErrResponseInterceptor
);

export default client;
