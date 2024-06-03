import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Auth from "./views/Auth.vue";
import Home from "./views/Home.vue";
import Developer from "./views/Developer.vue";
import Employee from "./views/Employees.vue";
import Project from "./views/Project.vue";
import Issue from "./views/Issue.vue";
import { authGuard } from "./utils/auth-guard";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Auth", component: Auth },
  { path: "/home", name: "Home", component: Home, beforeEnter: authGuard },
  {
    path: "/developer",
    name: "Developer",
    component: Developer,
    beforeEnter: authGuard,
  },
  {
    path: "/home/project",
    name: "Project",
    component: Project,
    beforeEnter: authGuard,
  },
  {
    path: "/home/employees",
    name: "Employees",
    component: Employee,
    beforeEnter: authGuard,
  },
  {
    path: "/Home/issues",
    name: "Issue",
    component: Issue,
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
