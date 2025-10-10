// middleware/auth.global.ts
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isAuthenticated } = useAuth();

  if (
    to.path !== "/login" &&
    to.path !== "/" &&
    to.path !== "/sobre" &&
    to.path !== "/login/cadastro"
  ) {
    if (!isAuthenticated()) {
      return navigateTo("/login");
    }
  }
});
