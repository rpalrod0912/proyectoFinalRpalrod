/*eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: () => import("../views/InicioApp.vue"),
  },

  {
    path: "/login/:loginMode",
    name: "login",
    component: () => import("../views/LoginApp.vue"),
    props: true,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterApp.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductosApp.vue"),
  },
  {
    path: "/verProducto",

    name: "product",
    component: () => import("../views/VerProductoApp.vue"),
  },

  {
    path: "/pedidos",
    name: "ComprasApp",
    component: () => import("../views/ComprasApp.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pago",
    name: "PasarelaApp",
    component: () => import("../views/PasarelaApp.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/cartLogin",
    name: "cartLogin",
    component: () => import("../views/LoginCartView.vue"),
  },
  {
    path: "/tuinformacion",
    name: "tuInfo",
    component: () => import("../views/UserDataView.vue"),
    children: [],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tuinformacion/password",
    name: "pwdUpdate",
    component: () => import("../views/UserPasswordView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tuinformacion/email",
    name: "emailUpdate",
    component: () => import("../views/UserUpdateMailView"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/guiadecompra",
    name: "guiadecompra",
    component: () => import("../views/GuideView.vue"),
  },
  {
    path: "/Contacto",
    name: "contacto",
    component: () => import("../views/ContactoApp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentAuth = store.state.currentAuth;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentAuth) {
    next("/cartLogin");
  } else next();
});

export default router;
