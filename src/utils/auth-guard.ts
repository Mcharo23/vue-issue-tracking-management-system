import { useAuthStore } from "../store/auth";
import { ROLE } from "../lib/enum";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  const isAuthenticated: boolean = !!authStore.user;
  const isAdmin = authStore.user?.role === ROLE.ADMIN;
  const isDeveloper = authStore.user?.role === ROLE.DEVELOPER;

  if (!isAuthenticated) {
    return next({ name: "Auth", replace: true });
  }

  const pathname = to.path;

  if (pathname.startsWith("/issue") && !(isAdmin || isDeveloper)) {
    authStore.logout();
    return next({ name: "Auth", replace: true });
  }

  if (pathname.startsWith("/home") && !isAdmin) {
    authStore.logout();
    return next({ name: "Auth", replace: true });
  }

  if (pathname.startsWith("/developer") && !isDeveloper) {
    authStore.logout();
    return next({ name: "Auth", replace: true });
  }

  return next();
};
