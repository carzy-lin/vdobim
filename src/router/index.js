import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/login/login'], resolve)

const Index = resolve => require(['@/components/index/index'], resolve)

const Home = resolve => require(['@/components/home/home'], resolve)





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
            children: [
              {
                path: ':id',
                component: Home
              }
            ]
        }
    ]
})