// import MK_MasterPrincipleForm from '@/views/MK/MK_MasterPrinciple/MK_MasterPrincipleForm'
import MK_Dashboard from '@/views/Dashboard/MK_Dashboard'
import MK_SalesLead from '@/views/MK/MK_SalesLead/MK_SalesLead'
import MK_SalesLeadLogbook from '@/views/MK/MK_SalesLead/MK_SalesLeadLogbook'
import MK_ProjectDetail from '@/views/MK/MK_ProjectDetail/MK_ProjectDetail'
import MK_ProjectDetailNUP from '@/views/MK/MK_ProjectDetail/MK_ProjectDetailNUP'
import MK_UnitType from '@/views/MK/MK_UnitType/MK_UnitType'
import MK_FloorPlan from '@/views/MK/MK_UnitType/MK_FloorPlan'
import MK_VirtualLaunching from '@/views/MK/MK_VirtualLaunching/MK_VirtualLaunching'
import MK_VirtualLaunchingDetail from '@/views/MK/MK_VirtualLaunching/MK_VirtualLaunchingDetail'
import MK_Referral from '@/views/MK/MK_Referral/MK_Referral'
import MK_ReferralLogbook from '@/views/MK/MK_Referral/MK_ReferralLogbook'
import MK_Token from '@/views/MK/MK_Token/MK_Token'
import MK_TokenPurchase from '@/views/MK/MK_Token/MK_TokenPurchase'
import MK_User from '@/views/MK/MK_User/MK_User'
import MK_UserProjectDetail from '@/views/MK/MK_User/MK_UserProjectDetail'
import MK_UserProjectAssign from '@/views/MK/MK_User/MK_UserProjectAssign'
import MK_AllPromotion from '@/views/MK/MK_Promotion/MK_AllPromotion'
import MK_Sales from '@/views/MK/MK_Sales/MK_Sales'
import MK_Profile from '@/views/MK/MK_Profile/MK_Profile'

export const MKRender = {
    path: '/MK',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        {
            path: '/MK_Dashboard',
            name: 'MK_Dashboard',
            component: MK_Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_SalesLead',
            name: 'MK_SalesLead',
            component: MK_SalesLead,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_SalesLead/LogBook',
            name: 'MK_SalesLeadLogbook',
            component: MK_SalesLeadLogbook,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_ProjectDetail',
            name: 'MK_ProjectDetail',
            component: MK_ProjectDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_ProjectDetail/NUP',
            name: 'MK_ProjectDetailNUP',
            component: MK_ProjectDetailNUP,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_UnitType',
            name: 'MK_UnitType',
            component: MK_UnitType,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_FloorPlan',
            name: 'MK_FloorPlan',
            component: MK_FloorPlan,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_VirtualLaunching',
            name: 'MK_VirtualLaunching',
            component: MK_VirtualLaunching,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_VirtualLaunching/Detail',
            name: 'MK_VirtualLaunchingDetail',
            component: MK_VirtualLaunchingDetail,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/MK/MK_Referral',
            name: 'MK_Referral',
            component: MK_Referral,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_Referral/Logbook',
            name: 'MK_ReferralLogbook',
            component: MK_ReferralLogbook,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/MK/MK_Token',
            name: 'MK_Token',
            component: MK_Token,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_TokenPurchase',
            name: 'MK_TokenPurchase',
            component: MK_TokenPurchase,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/MK/MK_User',
            name: 'MK_User',
            component: MK_User,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_UserProjectDetail',
            name: 'MK_UserProjectDetail',
            component: MK_UserProjectDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_UserProjectAssign',
            name: 'MK_UserProjectAssign',
            component: MK_UserProjectAssign,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/MK/MK_AllPromotion',
            name: 'MK_AllPromotion',
            component: MK_AllPromotion,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_Sales',
            name: 'MK_Sales',
            component: MK_Sales,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/MK/MK_Profile',
            name: 'MK_Profile',
            component: MK_Profile,
            meta: {
                requiresAuth: true
            }
        },
    ]
}