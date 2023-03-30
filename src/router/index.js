import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/InicioApp.vue"),
  },
  {
    path: "/prueba",
    name: "prueba",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PruebaApp.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginApp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
