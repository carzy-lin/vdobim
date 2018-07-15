import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' //保存state状态数据
import User from './modules/user'
import Index from './modules/index'


Vue.use(Vuex)


export default new Vuex.Store({
	modules: {
	 User,
	 Index
	},
	plugins: [createPersistedState()]
})