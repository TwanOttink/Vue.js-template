import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import inlog from "../components/inlog";
import register from "../components/register";

Vue.use(VueRouter)

function guardMyroute (to, from, next)
{
  var isAuthenticated = false;

  if (localStorage.getItem("token")) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
    console.log("log eens heel gauw in!")
  }

  if (isAuthenticated) {
    next();
  } else {
    next ('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: guardMyroute,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/games',
    name: 'Games',
    beforeEnter: guardMyroute,
    component: () => import('../views/Games.vue')
  },
  {
    path: '/users',
    name: 'Users',
    beforeEnter: guardMyroute,
    component: () => import('../views/Users.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: inlog
  },
  {
    path: '/register',
    name: 'Register',
    component: register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
