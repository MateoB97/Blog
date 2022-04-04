import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/' || to.path === '/publicaciones' || to.path === '/registro') {
      next()
    } else {
      var user = localStorage.user
      if (user === undefined) {
        next({
          path: '/publicaciones'
        })
      } else {
        user = JSON.parse(user)
        const permisos = user.permisos.permisos.split(',')
        console.log(permisos)
        if (to.matched.some(v => v.meta.permisoRequerido)) {
          if (permisos.indexOf(to.matched[1].meta.permisoRequerido) > -1) {
            next()
          } else {
            next({
              path: '/'
            })
          }
        } else {
          next()
        }
      }
    }
  })

  Vue.router = Router

  return Router
}
