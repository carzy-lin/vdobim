import axios from 'axios'
import api from './index'
import qs from 'qs'
const merge = require('webpack-merge')

let base = '/api'

// axios 配置
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
})

//返回状态判断
axios.interceptors.response.use((res) =>{
  if(!res.data.success){
    //return Promise.reject(res);
  }
  return res;
}, (error) => {
  //404等问题可以在这里处理
  return Promise.reject(error);
});

export function fetch(url, params,config) {
    config = (config==null?{}:config);
    
    return new Promise((resolve, reject) => {
        axios.post(url, params,config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}


//export const requestLogin = params => { return axios.post(`${base}/user/checkUser`, params).then(res => res.data) }

export default { 
  
  requestLogin(params) {
    return fetch(`${base}/user/checkUser`, params)
  },
  getUser(params) {
    return fetch(`${base}/user/userMessage`, params)
  },
  getProject(params) {
    return fetch(`${base}/project/projectList`, params)
  },
  getAI(params) {
    return fetch(`${base}/news/newsList`, params)
  },
  getProjectNotice(params) {
    return fetch(`${base}/notice/projectNoticeList`, params)
  },
  getProjectMember(params) {
    return fetch(`${base}/group/projectMemberList`, params)
  },
  getAction(params) {
    return fetch(`${base}/action/getAction`, params)
  },
  getProjectEffectList(params) {
    return fetch(`${base}/picture/pictureList`, params)
  },
  getModelList(params) {
    return fetch(`${base}/module/moduleList`, params)
  },
  getUpdateMould(params) {
    return fetch(`${base}/module/updateModule`, params)
  },
  getCollectModule(params) {
    return fetch(`${base}/module/collectModule`, params)
  },
  getDeleteModule(params) {
    return fetch(`${base}/module/deleteModule`, params)
  },
  getCancelCollect(params) {
    console.log(params)
    return fetch(`${base}/user/cancelCollect`, params)
  },
  getMyProblem(params) {
    return fetch(`${base}/user/myQuestion`, params)
  },
  getProblemMessage(params) {
    return fetch(`${base}/question/questionList`, params)
  },
  getProblemList(params) {
    return fetch(`${base}/question/questionList`, params)
  },
  getMyMessage(params) {
    return fetch(`${base}/user/myMessage`, params)
  },
  getUserMessage(params) {
    return fetch(`${base}/user/userMessage`, params)
  },
  getPlanList(params) {
    return fetch(`${base}/plan/planList`, params)
  },
  getDrawingList(params) {
    return fetch(`${base}/drawing/drawingList`, params)
  },
  getDocumentList(params) {
    return fetch(`${base}/document/documentList`, params)
  },
  getPictureList(params) {
    return fetch(`${base}/picture/pictureList`, params)
  },
  getVideoList(params) {
    return fetch(`${base}/video/videoList`, params)
  },
  getDeviceList(params) {
    return fetch(`${base}/device/deviceList`, params)
  },
  getAgreementList(params) {
    return fetch(`${base}/agreement/agreementList`, params)
  },
  getPayplanList(params) {
    return fetch(`${base}/payplan/payplanList`, params)
  },
  getCollectPlan(params) {
    return fetch(`${base}/plan/collectPlan`, params)
  },
  getUpdatePlan(params) {
    return fetch(`${base}/plan/updatePlan`, params)
  },
  getDeletePlan(params) {
    return fetch(`${base}/plan/deletePlan`, params)
  },
  getPlanTypeList(params) {
    return fetch(`${base}/plan/planTypeList`, params)
  },
  getVisaList(params) {
    return fetch(`${base}/change/changeList`, params)
  },
  getVisaSummaryList(params) {
    return fetch(`${base}/change/changeSummaryList`, params)
  },
  getApprovalList(params) {
    return fetch(`${base}/approval/waitMyApprovalList`, params)
  },
  getInitiateApprovalList(params) {
    return fetch(`${base}/approval/myApprovalList`, params)
  },
  getAlreadyApprovalList(params) {
    return fetch(`${base}/approval/myHasApprovalList`, params)
  },
  getProjectMessage(params) {
    return fetch(`${base}/project/projectMessage`, params)
  },
  getCollection(params) {
    return fetch(`${base}/user/getCollect`, params)
  },
  sendProjectMessage(params) {
    return fetch(`${base}/project/updateProject`, params)
  },
  sendUserMessage(params,config) {
    return fetch(`${base}/user/updateUser`, params,config)
  }
}

