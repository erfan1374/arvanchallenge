import Vue from 'vue'
import Router from 'vue-router'
import config from 'SrcConfig'
Vue.use(Router)

const Layout = () => import(/* webpackChunkName: "layout" */ '@/components/layout')
const Login = () => import(/* webpackChunkName: "login" */ '@/components/account/login')
const Register = () => import(/* webpackChunkName: "register" */ '@/components/account/register')
const Page404 = () => import(/* webpackChunkName: "Page404" */ '@/components/shared/page404')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/components/dashboard')

import articles from './articles'
const options = {
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior(to, from) {
    if (to.path !== from.path || to.query['p'] !== from.query['p']) {
      return window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
  },
  routes: [
    {
      name: 'root',
      path: '/',
      component: Layout,
      redirect: '/login',
      meta: {label: 'home'},
      children: [
        {
          name: 'login',
          path: 'login',
          meta: {public: true, title: 'login'},
          component: Login
        },
        {
          name: 'register',
          path: 'register',
          meta: {public: true, title: 'register'},
          component: Register
        },
        articles
      ]
    },
    {
      name: 'catch-all',
      path: '*',
      component: Page404
    }
  ]
}
if (config.homeUrl == '/dashboard') {
  options.routes[0].children.push({
    name: 'dashboard',
    path: 'dashboard',
    meta: {label: 'dashboard', auth: true, title: 'dashboard'},
    component: Dashboard
  })
}
export default new Router(options)
