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
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterApp.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductosApp.vue"),
  },
  {
    path: "/verProducto",
    name: "product",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VerProductoApp.vue"),
  },
  {
    path: "/pruebas",
    name: "PruebasApp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PruebaApp.vue"),
  },
  {
    path: "/pedidos",
    name: "ComprasApp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ComprasApp.vue"),
  },
  {
    path: "/pago",
    name: "PasarelaApp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PasarelaApp.vue"),
  },
  {
    path: "/cartLogin",
    name: "cartLogin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginCartView.vue"),
  },
  {
    path: "/tuinformacion",
    name: "tuInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserDataView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
