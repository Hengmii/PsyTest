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

import axios from 'axios'


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
    }
  ]
})
