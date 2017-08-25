import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'pages/recommend/recommend'
import singer from 'pages/singer/singer'
import rank from 'pages/rank/rank'
import search from 'pages/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: '/recommend',
      component: recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
