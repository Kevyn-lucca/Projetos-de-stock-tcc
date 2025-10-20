import axios from "axios";

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
  });

  return {
    provide: {
      api,
    },
  };
});
