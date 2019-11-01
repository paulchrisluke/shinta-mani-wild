import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
const Home = () => import('./views/Home.vue')
const Listing = () => import('./views/Listing.vue')
const Search = () => import('./views/Search.vue')
const Contact = () => import('./views/Contact.vue')
const Tents = () => import('./views/Tents.vue')
const Story = () => import('./views/Story.vue')
const Gallery = () => import('./views/Gallery.vue')
const ChickenSink = () => import('./views/ChickenSink.vue')

Vue.use(Router)

let unsubscribeStore: any = null
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      const loading = store.getters['loading/isLoading']
      if (loading) {
        unsubscribeStore = store.subscribe((mutation, state) => {
          const loading = store.getters['loading/isLoading']
          if (mutation.type === 'loading/loading' && loading === false) {
            resolve(savedPosition || { x: 0, y: 0 })
            unsubscribeStore()
          }
        })
      } else {
        resolve(savedPosition || { x: 0, y: 0 })
      }
    })
  },
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
      name: 'gallery',
      path: '/gallery/:resortId/:orderFilter',
      component: Gallery
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/testing',
      component: ChickenSink
    },
    {
      path: '/*/',
      redirect: '/'
    }
  ]
})

router.beforeResolve((to, from, next) => {
  store.commit('loading/loading', true)
  next()
})
router.afterEach((to, from) => {
  const alwaysShowLoadingAtFirst = 700
  setTimeout(() => {
    store.commit('loading/loading', false)
  }, alwaysShowLoadingAtFirst)
})

export default router
