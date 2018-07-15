import * as types from '../types'
//import api from '../../http/API'
import api from '../../api/api'

const state = {
  token: '',
  uid: '',
  unitId: '',
  utype: '',
  getUserList: {},
  getUserMessage: {}
}

const mutations = {
  // 这里的data指提交时：
  // 从/api/login传回的user对象，其中包含name,messeage等信息
  [types.LOGIN](state, data) {
    // vuex的本质作用是管理组件之间复杂的状态的（如购物车逻辑等等...）
    // 所以当刷新浏览器时，这些状态也会一并被清空
    // 所以还是需要有一个长期在浏览器中保存如登录/登出状态的机制
    // 因此这里采用了localStorage
    // 一定要明白vuex这类库的本质作用，它极大的增加了前端逻辑处理的可能性
    // localStorage.setItem('session', data.session.user)
  },
  [types.GET_USER_LIST](state,getUserList) {
    state.getUserList = getUserList
  },
  [types.GET_USER_MESSAGE](state,res) {
    state.getUserMessage = res
  },
  [types.DELSESSION](state) {
    window.localStorage.removeItem('session');
    window.sessionStorage.removeItem('user')
  },
  [types.LOGINOUT](state) {
    state.user = {};
    window.localStorage.removeItem('user');
    window.sessionStorage.removeItem('user')
  },
  [types.TOKEN](state,token) {
    state.token = token
  },
  [types.UID](state,uid) {
    state.uid = uid
  },
  [types.UNIT_ID](state,unitId) {
    state.unitId = unitId
  },
  [types.UTYPE](state,utype) {
    state.utype = utype
  }

}

const getters = {
  checked: state => state.checked,
  token: state => state.token,
  uid: state => state.uid,
  unitId: state => state.unitId,
  utype: state => state.utype,
  getUserList: state => state.getUserList,
  getUserMessage: state => state.getUserMessage
}



 //创建驱动actions可以使得mutations得以启动
const actions = {
  // actions中的函数接受一个与store实例有相同属性和方法的context对像
  // 因此可以调用context中包含的state,getters以及mutations中定义的方法
  // userLogin(context){
  //   context.commit(types.LOGIN);
  // }
  // 使用es6的函数参数结构简化代码，可以直接将context.commit => commit使用
  // 在.vue文件中通过store.dispatch('userLogin') 即可触发状态改变了
  // 这里的data是因为提交mutations时需要获取从/api/login传回的user对象
  
  getUserMessageK({commit,stata},params){
    api.getUser(params).then(resp=>{
          var date = eval(resp)
          //console.log(222222,date.response)
          commit(types.GET_USER_MESSAGE,date.response);
       }).catch(error=>{
    })
  },
  userLogin({commit}, data) {
    commit(types.LOGIN, data);
  },
  userToken({commit}, data) {
    commit(types.TOKEN, data);
  },
  delUserSession({commit}, data) {
    commit(types.DELSESSION, data);
  },
  userLoginOut({commit}) {
    commit(types.LOGINOUT);
  }
}

export default ({
	state,
	mutations,
	actions,
  getters
})