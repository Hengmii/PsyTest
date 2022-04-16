import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '../components/Main'
import Schedule from '../components/Schedule'
import ConsultantManagement from '../components/ConsultantManagement'
import MonitorManagement from '../components/MonitorManagement'
import ConsultHistory from '../components/ConsultHistory'
import ConsultHistoryC from '../components/ConsultHistoryC'
import ConsultHistoryM from '../components/ConsultHistoryM'
import UserManagement from '../components/UserManagement'
import MainConsult from '../components/MainConsult'
import MainMonitor from '../components/MainMonitor'
import SessionC from '../components/SessionC'
import SessionM from '../components/SessionM'
// import login from '../components/user/login'
import Index from '../index.vue'
import axios from 'axios'
import CurrentConversation from "../components/conversation/current-conversation";

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/Main',
      name: 'Main',
      component: Main
    },
    {
      path:'/MainConsult',
      name: 'MainConsult',
      component: MainConsult
    },
    {
      path:'/MainMonitor',
      name: 'MainMonitor',
      component: MainMonitor
    },
    {
      path:'/Schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/ConsultantManagement',
      name: 'ConsultantManagement',
      component: ConsultantManagement
    },
    {
      path: '/MonitorManagement',
      name: 'MonitorManagement',
      component: MonitorManagement
    },{
      path: '/ConsultHistory',
      name: 'ConsultHistory',
      component: ConsultHistory
    },{
      path: '/ConsultHistoryC',
      name: 'ConsultHistoryC',
      component: ConsultHistoryC
    },{
      path: '/ConsultHistoryM',
      name: 'ConsultHistoryM',
      component: ConsultHistoryM
    },{
      path: '/UserManagement',
      name: 'UserManagement',
      component: UserManagement
    },{
      path: '/SessionC',
      name: 'SessionC',
      component: SessionC
    },{
      path: '/SessionM',
      name: 'SessionM',
      component: Index
    }
    // ,{
    //   path: '/user/login',
    //   name: 'login',
    //   component: login
    // }
  ]
})
