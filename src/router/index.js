import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      { path: '/ ', component: () => import('@/views/home') },
      { path: '/video', component: () => import('@/views/video') },
      { path: '/qa', component: () => import('@/views/qa') },
      { path: '/profile', component: () => import('@/views/my') }
    ]
  },
  { path: '/search', component: () => import('@/views/search') },
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article'), props: true }
]

const router = new VueRouter({
  routes
})

export default router
