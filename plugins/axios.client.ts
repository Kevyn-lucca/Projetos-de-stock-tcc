import axios from "axios";

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: "https://localhost:8443", // endereço do backend
    withCredentials: true, // importante para cookies HttpOnly
  });

  return {
    provide: {
      api,
    },
  };
});
