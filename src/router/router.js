import Router from 'vue-router'
import routes from './index'
import Vue from 'vue'

Vue.use(Router)

export default () => {
	return new Router({
		routes,
		mode: 'history',
		linkActiveClass: 'active-link',
		linkExactActiveClass: 'exact-active-link'
	})
}