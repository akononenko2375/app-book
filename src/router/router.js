import Vue from "vue";
import Router from 'vue-router';

import Cart from "@/components/Cart";
import Catalog from "@/components/Catalog";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Catalog,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      props: true
    }
  ],
  mode: "history",
})

export default router;