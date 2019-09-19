import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import ('./views/Home.vue')
const Listing = () => import ('./views/Listing.vue')
const Search = () => import ('./views/Search.vue')
const Contact = () => import ('./views/Contact.vue')
const Tents = () => import ('./views/Tents.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tents',
      component: Tents
    },
    {
      path: '/listing/:id',
      component: Listing
    },
    {
      path: '/search/:id',
      component: Search
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/*/',
      redirect: '/'
    }
  ]
})
