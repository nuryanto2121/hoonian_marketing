import ADM_UserManagement from '@/views/ADM/ADM_UserManagement/ADM_UserManagement'
import ADM_ViewUserManagement from '@/views/ADM/ADM_UserManagement/ADM_ViewUserManagement'
import ADM_AddUserManagement from '@/views/ADM/ADM_UserManagement/ADM_AddUserManagement'
import ADM_UserManagementButtonAccess from '@/views/ADM/ADM_UserManagement/ADM_UserManagementButtonAccess'
import ADM_UserManagementDashboard from '@/views/ADM/ADM_UserManagement/ADM_UserManagementDashboard'
import ADM_NotificationUser from '@/views/ADM/ADM_UserManagement/ADM_NotificationUser'
import ADM_DetailUserManagement from '@/views/ADM/ADM_UserManagement/ADM_DetailUserManagement'

import ADM_UserManagementInternal from '@/views/ADM/ADM_UserManagementInternal/ADM_UserManagementInternal'
import ADM_ViewUserManagementInternal from '@/views/ADM/ADM_UserManagementInternal/ADM_ViewUserManagementInternal'
import ADM_AddUserManagementInternal from '@/views/ADM/ADM_UserManagementInternal/ADM_AddUserManagementInternal'
import ADM_UserManagementButtonAccessInternal from '@/views/ADM/ADM_UserManagementInternal/ADM_UserManagementButtonAccessInternal'
import ADM_UserManagementDashboardInternal from '@/views/ADM/ADM_UserManagementInternal/ADM_UserManagementDashboardInternal'
import ADM_AddPortfolioUserManagementInternal from '@/views/ADM/ADM_UserManagementInternal/ADM_AddPortfolioUserManagementInternal'
import ADM_DetailUserManagementInternal from '@/views/ADM/ADM_UserManagementInternal/ADM_DetailUserManagementInternal'

import ADM_GroupManagement from '@/views/ADM/ADM_GroupManagement/ADM_GroupManagement'
import ADM_AddGroupManagement from '@/views/ADM/ADM_GroupManagement/ADM_AddGroupManagement'
import ADM_GroupManagementDashboard from '@/views/ADM/ADM_GroupManagement/ADM_GroupManagementDashboard'
import ADM_GroupManagementButtonAccess from '@/views/ADM/ADM_GroupManagement/ADM_GroupManagementButtonAccess'
import ADM_DetailGroupManagement from '@/views/ADM/ADM_GroupManagement/ADM_DetailGroupManagement'

import ADM_GroupManagementInternal from '@/views/ADM/ADM_GroupManagementInternal/ADM_GroupManagementInternal'
import ADM_AddGroupManagementInternal from '@/views/ADM/ADM_GroupManagementInternal/ADM_AddGroupManagementInternal'
import ADM_GroupManagementDashboardInternal from '@/views/ADM/ADM_GroupManagementInternal/ADM_GroupManagementDashboardInternal'
import ADM_GroupManagementButtonAccessInternal from '@/views/ADM/ADM_GroupManagementInternal/ADM_GroupManagementButtonAccessInternal'
import ADM_AddPortfolioGroupManagementInternal from '@/views/ADM/ADM_GroupManagementInternal/ADM_AddPortfolioGroupManagementInternal'
import ADM_DetailGroupManagementInternal from '@/views/ADM/ADM_GroupManagementInternal/ADM_DetailGroupManagementInternal'

import ADM_DriverManagement from '@/views/ADM/ADM_DriverManagement/ADM_DriverManagement'
import ADM_ViewDriverManagement from '@/views/ADM/ADM_DriverManagement/ADM_ViewDriverManagement'
import ADM_AddDriverManagement from '@/views/ADM/ADM_DriverManagement/ADM_AddDriverManagement'
import ADM_FleetType from '@/views/ADM/ADM_FleetType/ADM_FleetType'
import ADM_FleetManagement from '@/views/ADM/ADM_FleetManagement/ADM_FleetManagement'
import ADM_AddFleetManagement from '@/views/ADM/ADM_FleetManagement/ADM_AddFleetManagement'
import ADM_ViewFleetManagement from '@/views/ADM/ADM_FleetManagement/ADM_ViewFleetManagement'

import ADM_Reason from '@/views/ADM/ADM_Reason/ADM_ReasonList'
import ADM_ReasonForm from '@/views/ADM/ADM_Reason/ADM_ReasonForm'
import ADM_Image from '@/views/ADM/ADM_Reason/ADM_Image'
import ADM_Portfolio from '@/views/ADM/ADM_Portfolio/ADM_PortfolioList'
import ADM_PortfolioForm from '@/views/ADM/ADM_Portfolio/ADM_PortfolioForm'

import ADM_ChangePortfolio from '@/views/ADM/ADM_ChangePortfolio/ADM_ChangePortfolio'

import ADM_Notification from '@/views/ADM/ADM_Notification/ADM_NotificationList'
import ADM_NotificationForm from '@/views/ADM/ADM_Notification/ADM_NotificationForm'

export const ADMRender = {
    path: '/ADM',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [{
        path: '/ADM/ADM_UserManagement',
        name: 'ADM_UserManagement',
        component: ADM_UserManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_UserManagement/View',
        name: 'ADM_ViewUserManagement',
        component: ADM_ViewUserManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_UserManagement/Form',
        name: 'ADM_AddUserManagement',
        component: ADM_AddUserManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_UserManagementButtonAccess',
        name: 'ADM_UserManagementButtonAccess',
        component: ADM_UserManagementButtonAccess,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_UserManagementDashboard',
        name: 'ADM_UserManagementDashboard',
        component: ADM_UserManagementDashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_NotificationUser',
        name: 'ADM_NotificationUser',
        component: ADM_NotificationUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_DetailUserManagement',
        name: 'ADM_DetailUserManagement',
        component: ADM_DetailUserManagement,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/ADM/ADM_UserManagementInternal',
        name: 'ADM_UserManagementInternal',
        component: ADM_UserManagementInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_UserManagementInternal/View',
        name: 'ADM_ViewUserManagementInternal',
        component: ADM_ViewUserManagementInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_UserManagementInternal/Form',
        name: 'ADM_AddUserManagementInternal',
        component: ADM_AddUserManagementInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_UserManagementButtonAccessInternal',
        name: 'ADM_UserManagementButtonAccessInternal',
        component: ADM_UserManagementButtonAccessInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_UserManagementDashboardInternal',
        name: 'ADM_UserManagementDashboardInternal',
        component: ADM_UserManagementDashboardInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_AddPortfolioUserManagementInternal',
        name: 'ADM_AddPortfolioUserManagementInternal',
        component: ADM_AddPortfolioUserManagementInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_DetailUserManagementInternal',
        name: 'ADM_DetailUserManagementInternal',
        component: ADM_DetailUserManagementInternal,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/ADM/ADM_GroupManagement',
        name: 'ADM_GroupManagement',
        component: ADM_GroupManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_GroupManagement/Form',
        name: 'ADM_AddGroupManagement',
        component: ADM_AddGroupManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_GroupManagementDashboard',
        name: 'ADM_GroupManagementDashboard',
        component: ADM_GroupManagementDashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_GroupManagementButtonAccess',
        name: 'ADM_GroupManagementButtonAccess',
        component: ADM_GroupManagementButtonAccess,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_DetailGroupManagement',
        name: 'ADM_DetailGroupManagement',
        component: ADM_DetailGroupManagement,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/ADM/ADM_GroupManagementInternal',
        name: 'ADM_GroupManagementInternal',
        component: ADM_GroupManagementInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_GroupManagementInternal/Form',
        name: 'ADM_AddGroupManagementInternal',
        component: ADM_AddGroupManagementInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_GroupManagementDashboardInternal',
        name: 'ADM_GroupManagementDashboardInternal',
        component: ADM_GroupManagementDashboardInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_GroupManagementButtonAccessInternal',
        name: 'ADM_GroupManagementButtonAccessInternal',
        component: ADM_GroupManagementButtonAccessInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_AddPortfolioGroupManagementInternal',
        name: 'ADM_AddPortfolioGroupManagementInternal',
        component: ADM_AddPortfolioGroupManagementInternal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_DetailGroupManagementInternal',
        name: 'ADM_DetailGroupManagementInternal',
        component: ADM_DetailGroupManagementInternal,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/ADM/ADM_FleetType',
        name: 'ADM_FleetType',
        component: ADM_FleetType,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_DriverManagement',
        name: 'ADM_DriverManagement',
        component: ADM_DriverManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_DriverManagement/View',
        name: 'ADM_ViewDriverManagement',
        component: ADM_ViewDriverManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_DriverManagement/Form',
        name: 'ADM_AddDriverManagement',
        component: ADM_AddDriverManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_FleetManagement',
        name: 'ADM_FleetManagement',
        component: ADM_FleetManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_FleetManagement/Form',
        name: 'ADM_AddFleetManagement',
        component: ADM_AddFleetManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_FleetManagement/View',
        name: 'ADM_ViewFleetManagement',
        component: ADM_ViewFleetManagement,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/TestList',
        name: 'ADM_Reason',
        component: ADM_Reason,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_Reason/Form',
        name: 'ADM_ReasonForm',
        component: ADM_ReasonForm,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/TestImage',
        name: 'ADM_Image',
        component: ADM_Image,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/ADM/ADM_Portfolio',
        name: 'ADM_Portfolio',
        component: ADM_Portfolio,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_Portfolio/Form',
        name: 'ADM_PortfolioForm',
        component: ADM_PortfolioForm,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_ChangePortfolio',
        name: 'ADM_ChangePortfolio',
        component: ADM_ChangePortfolio,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_Notification',
        name: 'ADM_Notification',
        component: ADM_Notification,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ADM/ADM_Notification/Form',
        name: 'ADM_NotificationForm',
        component: ADM_NotificationForm,
        meta: {
            requiresAuth: true
        }
    },    
    ]
}