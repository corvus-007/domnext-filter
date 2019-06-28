import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Apartment from "./views/Apartment.vue";
import Filter from "./views/Filter.vue";

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  base: '/filtr/',
  routes: [
    {
      path: '/',
      name: 'filter',
      component: Filter,
    },
    {
      path: '/apartment/:id',
      name: 'apartment',
      component: Apartment,
      // props: true
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
