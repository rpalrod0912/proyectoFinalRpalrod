import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/InicioApp.vue"),
  },

  {
    path: "/login/:loginMode",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginApp.vue"),
    props: true,
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
    children: [],
  },
  {
    path: "/tuinformacion/password",
    name: "pwdUpdate",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserPasswordView.vue"),
  },
  {
    path: "/tuinformacion/email",
    name: "emailUpdate",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserUpdateMailView"),
  },
  {
    path: "/pagos",
    name: "pagos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PaymentMethodsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
