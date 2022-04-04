// import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
  Vue.use(VueAxios, axios)
  Vue.use(VueAuth, {
    auth: {
      request (req, token) {
        this.options.http._setHeaders.call(this, req, { Authorization: 'Bearer ' + token})
      },
      response: function (res) {
        return (res.data.data || {}).token
      }
    },
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    yokenDefaultName: 'blog_jwt_token',
    notFoundRedirect: false,
    rolesVar: 'role',
    registerData: { url: 'auth/register', method: 'POST', redirect: '/' },
    refreshData: { url: 'auth/refresh', method: 'GET', enabled: true, interval: 5}
  })
  Vue.axios.defaults.baseURL = 'http://localhost/blog/back/public/api'

  axios.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  Vue.axios.interceptors.response.use(function (response) {
    if (response.data.message === 'Token has expired and can no longer be refreshed') {
      localStorage.removeItem('blog_jwt_token')
      document.location.reload()
    }
    return response
  }, function (error) {
    if(error.response.status === 401) {
      console.log('blog_jwt_token')
      Vue.auth.refresh()
    }
    if (error.response.status === 403) {
      window.location.replace('http://' + location.host)
    }
  })
}
