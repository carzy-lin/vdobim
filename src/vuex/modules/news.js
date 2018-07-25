import * as types from '../types'


const state = {
  getMessage: {},
}


const actions = {

}

const getters = {
    getMessage: state => state.getMessage,
}

const mutations = {
  [types.GET_MESSAGE](state,res) {
  	state.getMessage = res
  }
}

export default {
	state,
	actions,
	getters,
	mutations
}