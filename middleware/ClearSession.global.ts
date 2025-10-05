export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path === "/") {
    if (import.meta.client) {
      sessionStorage.clear();
    }
  }
});
