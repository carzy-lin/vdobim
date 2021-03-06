import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/login/login'], resolve)

const Index = resolve => require(['@/components/index/index'], resolve)

const myProblem = resolve => require(['@/components/my-problem/my-problem'], resolve)

const news = resolve => require(['@/components/news/news'], resolve)

const collection = resolve => require(['@/components/mine/collection'], resolve)

const mine = resolve => require(['@/components/mine/mine'], resolve)

const quit = resolve => require(['@/components/mine/quit/quit'], resolve)

const userInfo = resolve => require(['@/components/mine/user-info/user-info'], resolve)

const modifyName = resolve => require(['@/components/mine/user-info/modify-name'], resolve)

const modifyRealName = resolve => require(['@/components/mine/user-info/modify-realName'], resolve)

const modifyEmail = resolve => require(['@/components/mine/user-info/modify-email'], resolve)

const modifyQQ = resolve => require(['@/components/mine/user-info/modify-QQ'], resolve)

const modifyWeChat = resolve => require(['@/components/mine/user-info/modify-weChat'], resolve)

const modifyAvatar = resolve => require(['@/components/mine/user-info/modify-avatar'], resolve)

const Home = resolve => require(['@/components/home/home'], resolve)

const model = resolve => require(['@/components/model/model'], resolve)

const plan = resolve => require(['@/components/plan/plan'], resolve)

const problem = resolve => require(['@/components/problem/problem'], resolve)

const drawing = resolve => require(['@/components/drawing/drawing'], resolve)

const document = resolve => require(['@/components/document/document'], resolve)

const scene = resolve => require(['@/components/scene/scene'], resolve)

const scenePicture = resolve => require(['@/components/scene/picture'], resolve)

const video = resolve => require(['@/components/scene/video'], resolve)

const device = resolve => require(['@/components/scene/device'], resolve)

const setting = resolve => require(['@/components/setting/setting'], resolve)

const briefing = resolve => require(['@/components/briefing/briefing'], resolve)

const contractIndex = resolve => require(['@/components/contract/contract-index'], resolve)

const contract = resolve => require(['@/components/contract/contract'], resolve)

const paymentPlan = resolve => require(['@/components/contract/payment-plan'], resolve)

const visaManagement = resolve => require(['@/components/visa/visa-management'], resolve)

const visaSummary = resolve => require(['@/components/visa/visa-summary'], resolve)

const visaIndex = resolve => require(['@/components/visa/visa-index'], resolve)

const approvalIndex = resolve => require(['@/components/approval/approval-index'], resolve)

const pendApproval = resolve => require(['@/components/approval/pend-approval'], resolve)

const alreadyApproval = resolve => require(['@/components/approval/already-approval'], resolve)

const initiateApproval = resolve => require(['@/components/approval/initiate-approval'], resolve)

const AiFg = resolve => require(['@/components/AI/AI'], resolve)

const overview = resolve => require(['@/components/overview/overview'], resolve)

const basicInformation = resolve => require(['@/components/overview/basic-information/basic-information'], resolve)

const dynamic = resolve => require(['@/components/overview/dynamic/dynamic'], resolve)

const member = resolve => require(['@/components/overview/member/member'], resolve)

const notice = resolve => require(['@/components/overview/notice/notice'], resolve)

const rendering = resolve => require(['@/components/overview/rendering/rendering'], resolve)

const panorama = resolve => require(['@/components/overview/rendering/child/panorama'], resolve)

const picture = resolve => require(['@/components/overview/rendering/child/picture'], resolve)

const AiDetails = resolve => require(['@/base/AI-list/AI-details/AI-details'], resolve)





export default new Router({
    mode: 'history',  //对页面进行渲染
    base: '/base/',
    routes: [
       {
            path: '/',
            //props: true,  //根据对路径传的的id对路径进行转换复杂化路径
            //props: (route) => ({id: route.query.b}),
            redirect: '/index',
            meta: {
              requireLogin: true // 添加该字段，表示进入这个路由是需要登录的
            },
            component: Index
        }, 
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/index',
            component: Index,
            meta: {
              index: 1
            },
            children: [
              {
                path: ':id',
                name: ':id',
                component: Home,
                meta: {
                  index: 2
                },
                children: [
                  {
                    path: 'AI',
                    component: AiFg,
                    meta: {
                      index: 3
                    },
                    children: [
                      {
                         path: ':id',
                         component: AiDetails,
                         meta: {
                            index: 4
                         }
                      }
                    ]
                  },
                  {
                    path: 'overview',
                    name: 'overview',
                    component: overview,
                    meta: {
                      index: 3
                    },
                    children: [
                      {
                        path: 'basic-information',
                        name: 'basic-information',
                        component: basicInformation,
                        meta: {
                          index: 4
                        },
                      },
                      {
                        path: 'dynamic',
                        name: 'dynamic',
                        component: dynamic,
                        meta: {
                          index: 4
                        }
                      },
                      {
                        path: 'member',
                        name: 'member',
                        component: member,
                        meta: {
                          index: 4
                        }
                      },
                      {
                        path: 'notice',
                        name: 'notice',
                        component: notice,
                        meta: {
                          index: 4
                        }
                      },
                      {
                        path: 'rendering',
                        name: 'rendering',
                        component: rendering,
                        meta: {
                          index: 4
                        },
                        children: [
                          {
                            path: 'picture',
                            name: 'picture',
                            component: picture,
                            meta: {
                              index: 5
                            }
                          },
                          {
                            path: 'panorama',
                            name: 'panorama',
                            component: panorama,
                            meta: {
                              index: 5
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    path: 'model',
                    name: 'model',
                    component: model,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'plan',
                    name: 'plan',
                    component: plan,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'problem',
                    name: 'problem',
                    component: problem,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'drawing',
                    name: 'drawing',
                    component: drawing,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'document',
                    name: 'document',
                    component: document,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'scene',
                    name: 'scene',
                    component: scene,
                    meta: {
                      index: 3
                    },
                    children: [
                      {
                         path: 'scenePicture',
                         name: 'scenePicture',
                         component: scenePicture,
                         meta: {
                            index: 3
                         }
                      },
                      {
                         path: 'video',
                         name: 'video',
                         component: video,
                         meta: {
                            index: 3
                         }
                      },
                      {
                         path: 'device',
                         name: 'device',
                         component: device,
                         meta: {
                            index: 3
                         }
                      }
                    ]
                  },
                  {
                    path: 'setting',
                    name: 'setting',
                    component: setting,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'briefing',
                    name: 'briefing',
                    component: briefing,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'contractIndex',
                    name: 'contractIndex',
                    component: contractIndex,
                    meta: {
                      index: 3
                    },
                    children: [
                      {
                        path: 'contract',
                        name: 'contract',
                        component: contract,
                        meta: {
                          index: 4
                        }
                      },
                      {
                        path: 'paymentPlan',
                        name: 'paymentPlan',
                        component: paymentPlan,
                        meta: {
                          index: 4
                        }
                      }
                    ]
                  },
                  {
                    path: 'visaIndex',
                    name: 'visaIndex',
                    component: visaIndex,
                    meta: {
                      index: 3
                    },
                    children: [
                      {
                        path: 'visaManagement',
                        name: 'visaManagement',
                        component: visaManagement,
                        meta: {
                          index: 4
                        },
                      },
                      {
                        path: 'visaSummary',
                        name: 'visaSummary',
                        component: visaSummary,
                        meta: {
                          index: 4
                        }
                      }
                    ]
                  },
                  {
                    path: 'approvalIndex',
                    name: 'approvalIndex',
                    component: approvalIndex,
                    meta: {
                      index: 3
                    },
                    children: [
                      {
                        path: 'pendApproval',
                        name: 'pendApproval',
                        component: pendApproval,
                        meta: {
                          index: 4
                        }
                      },
                      {
                        path: 'alreadyApproval',
                        name: 'alreadyApproval',
                        component: alreadyApproval,
                        meta: {
                          index: 4
                        }
                      },
                      {
                        path: 'initiateApproval',
                        name: 'initiateApproval',
                        component: initiateApproval,
                        meta: {
                          index: 4
                        }
                      }
                    ]
                  }
                ]
              }
            ]
        },
        {
            path: '/my-problem',
            name: 'my-problem',
            component: myProblem,
            meta: {
              index: 1
            }
        },
        {
            path: '/news',
            name: 'news',
            component: news,
            meta: {
              index: 1
            }
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine,
            meta: {
              index: 1
            },
            children: [
              {
                path: 'collection',
                name: 'collection',
                component: collection,
                meta: {
                  index: 1
                }
              },
              {
                path: 'user-info',
                name: 'user-info',
                component: userInfo,
                meta: {
                  index: 2
                },
                children: [
                  {
                    path: 'modify-name',
                    component: modifyName,
                    meta: {
                       index: 3
                    }
                  },
                  {
                    path: 'modify-realName',
                    component: modifyRealName,
                    meta: {
                       index: 3
                    }
                  },
                  {
                    path: 'modify-email',
                    component: modifyEmail,
                    meta: {
                       index: 3
                    }
                  },
                  {
                    path: 'modify-QQ',
                    component: modifyQQ,
                    meta: {
                       index: 3
                    }
                  },
                  {
                    path: 'modify-weChat',
                    component: modifyWeChat,
                    meta: {
                       index: 3
                    }
                  },
                  {
                    path: 'modify-avatar',
                    component: modifyAvatar,
                    meta: {
                       index: 3
                    }
                  }
                ]
              }
            ]
        },
        {
          path: '/quit',
          name: 'quit',
          component: quit
        }
    ]
})