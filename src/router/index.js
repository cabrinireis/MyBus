import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/intinerario/:id",
    name: "Intinerario",
    component: () =>
      import(/* webpackChunkName: "intinerario" */ "../views/Intinerario.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
