//import api from '../../http/API'
import api from '../../api/api'
import * as types from '../types'


const state = {
  projectList: {},
  projectDetails: {},
  AiDetails: {},
}


const actions = {
  /*getProjectList({commit,stata},params){
    api.getProject(params).then(resp=>{
          var date = eval(resp.data)
          commit(types.GET_PROJECT,date.response.list);
       }).catch(error=>{
    })
  }*/
}

const getters = {
    projectList: state => state.projectList,
    projectDetails: state => state.projectDetails,
    AiDetails: state => state.AiDetails
}

const mutations = {
  [types.GET_PROJECT](state,res) {
  	state.projectList = res
  },
  [types.GET_PROJECT_DETAILS](state,res) {
    state.projectDetails = res
  },
  [types.GET_AI_DETAILS](state,res) {
    state.AiDetails = res
  },
}

export default {
	state,
	actions,
	getters,
	mutations
}