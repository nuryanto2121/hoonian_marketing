import Vue from 'vue'
import Router from 'vue-router'

import {
  ADMRender
} from './ADM/ADM'

import {
  SSRender
} from './SS/SS'

import {
  PJRender
} from './PJ/PJ'

import {
  DDRender
} from './DD/DD'

import {
  MKRender
} from './MK/MK'

import {
  OPRender
} from './OP/OP'

// CONTAINERS
import LayoutFull from '@/containers/LayoutFull/LayoutFull'

// COMPONENTS
import Dashboard from '@/views/Dashboard/Dashboard'
import MenuPages from '@/views/MenuPages/MenuPages'
// import ChangePassword from '@/views/ChangePassword/ChangePassword_Master'
import SignIn from '@/views/Authentication/SignIn/SignIn'
import ForgetPassword from '@/views/Authentication/ForgetPassword'
import PageNotFound from '@/views/PageNotFound/PageNotFound'
import Notification from '@/views/UserContent/Notification'
import DynamicMenu from '@/views/Setup/Dynamic_Menu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/',
    name: 'LayoutFull',
    component: LayoutFull,
    children: [{
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        breadcrumbs: [{
          name: 'Dashboard'
        }]
      }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: MenuPages,
      meta: {
        requiresAuth: true,
        breadcrumbs: [{
          name: 'Menu'
        }]
      }
    },
    {
      path: '/Notification',
      name: 'Notification',
      component: Notification,
      meta: {
        requiresAuth: true,
        breadcrumbs: [{
          name: 'Notification'
        }]
      }
    },
      ADMRender,
      SSRender,
      MKRender,
      OPRender,
      PJRender,
      DDRender,
    {
      path: '/DynamicMenu',
      name: 'DynamicMenu',
      component: DynamicMenu,
      meta: {
        requiresAuth: true,
        breadcrumbs: [{
          name: 'Dynamic Menu'
        }]
      }
    },{
      path: '/DynamicMenu',
      name: 'DynamicMenu',
      component: DynamicMenu,
      meta: {
        requiresAuth: true,
        breadcrumbs: [{
          name: 'Dynamic Menu'
        }]
      }
    },
    ]
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: ForgetPassword,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '*',
    component: PageNotFound
  }
  ]
})