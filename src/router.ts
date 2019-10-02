import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import ('./views/Home.vue')
const Listing = () => import ('./views/Listing.vue')
const Search = () => import ('./views/Search.vue')
const Contact = () => import ('./views/Contact.vue')
const Tents = () => import ('./views/Tents.vue')
const Story = () => import ('./views/Story.vue')

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
      name: 'listing',
      path: '/listing/:id',
      component: Listing
    },
    {
      name: 'search',
      path: '/search/:id',
      component: Search
    },
    {
      name: 'story',
      path: '/story/:resortId/:storyIndex',
      component: Story
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/*/',
      redirect: '/'
    },
  ]
})
