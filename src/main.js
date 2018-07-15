// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'


import 'static/css/reset.css'
import 'static/css/fonts.css'
import 'common/css/base.scss'

Vue.prototype.$http = axios;
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error:require('common/img/sl.jpg'),
  loading:require('common/img/sl.jpg'),
  attempt: 3
})

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/reginster') {
        //window.sessionStorage.removeItem('user')
        next()
        //store.dispatch('logout')
    } else {
        let token = window.sessionStorage.getItem('user')
        if (!token && (to.path === '/index')){
            next({ path: '/login' })
        } else {
            next()
        }
    }
})


new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
