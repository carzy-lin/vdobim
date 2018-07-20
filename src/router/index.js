import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/login/login'], resolve)

const Index = resolve => require(['@/components/index/index'], resolve)

const Home = resolve => require(['@/components/home/home'], resolve)

const AiFg = resolve => require(['@/components/AI/AI'], resolve)

const overview = resolve => require(['@/components/overview/overview'], resolve)

const basicInformation = resolve => require(['@/components/overview/basic-information/basic-information'], resolve)

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
                      }
                    ]
                  }
                ]
              }
            ]
        },
        
    ]
})