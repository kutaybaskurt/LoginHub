import { useAuthStore } from "@/stores/auth";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/default.vue";
import AuthLayout from "../layouts/authentication.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AuthLayout, // We place DefaultLayout here
      children: [
        {
          path: "",
          name: "home",
          component: Home,
          meta: { requiresAuth: true },
        },
        {
          path: "profile",
          name: "profile",
          component: Profile,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/login",
      component: DefaultLayout,
      children: [{ path: "", name: "login", component: Login }],
    },
    {
      path: "/register",
      component: DefaultLayout,
      children: [{ path: "", name: "register", component: Register }],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (
    authStore.isAuthenticated &&
    (to.name === "login" || to.name === "register")
  ) {
    // Do not allow access to login or register pages if the user is already logged in
    next({ name: "home" });
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to the login page if not authenticated and trying to access a protected page
    next({ name: "login" });
  } else {
    // Allow access
    next();
  }
});

export default router;
