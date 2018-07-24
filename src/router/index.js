import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/login/login'], resolve)

const Index = resolve => require(['@/components/index/index'], resolve)

const myProblem = resolve => require(['@/components/my-problem/my-problem'], resolve)

const news = resolve => require(['@/components/news/news'], resolve)

const mine = resolve => require(['@/components/mine/mine'], resolve)

const Home = resolve => require(['@/components/home/home'], resolve)

const model = resolve => require(['@/components/model/model'], resolve)

const plan = resolve => require(['@/components/plan/plan'], resolve)

const problem = resolve => require(['@/components/problem/problem'], resolve)

const drawing = resolve => require(['@/components/drawing/drawing'], resolve)

const document = resolve => require(['@/components/document/document'], resolve)

const scene = resolve => require(['@/components/scene/scene'], resolve)

const setting = resolve => require(['@/components/setting/setting'], resolve)

const briefing = resolve => require(['@/components/briefing/briefing'], resolve)

const contract = resolve => require(['@/components/contract/contract'], resolve)

const visa = resolve => require(['@/components/visa/visa'], resolve)

const approval = resolve => require(['@/components/approval/approval'], resolve)

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
                    }
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
                    path: 'contract',
                    name: 'contract',
                    component: contract,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'visa',
                    name: 'visa',
                    component: visa,
                    meta: {
                      index: 3
                    }
                  },
                  {
                    path: 'approval',
                    name: 'approval',
                    component: approval,
                    meta: {
                      index: 3
                    }
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
            }
        },
        
    ]
})