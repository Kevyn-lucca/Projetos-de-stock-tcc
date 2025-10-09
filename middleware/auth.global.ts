// middleware/auth.global.ts
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isAuthenticated } = useAuth();

  if (to.path !== "/login" && to.path !== "/") {
    if (!isAuthenticated()) {
      return navigateTo("/login");
    }
  }
});
