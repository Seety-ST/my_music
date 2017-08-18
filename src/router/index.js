import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'pages/recommend/recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      component: recommend
    }
  ]
})
