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
import MK_ReferralDetail from '@/views/MK/MK_Referral/MK_ReferralDetail'
import MK_ReferralLogbook from '@/views/MK/MK_Referral/MK_ReferralLogbook'
import MK_Token from '@/views/MK/MK_Token/MK_Token'
import MK_TokenPurchase from '@/views/MK/MK_Token/MK_TokenPurchase'
import MK_User from '@/views/MK/MK_User/MK_User'
import MK_UserProjectDetail from '@/views/MK/MK_User/MK_UserProjectDetail'
import MK_UserProjectAssign from '@/views/MK/MK_User/MK_UserProjectAssign'
import MK_AllPromotion from '@/views/MK/MK_Promotion/MK_AllPromotion'
import MK_Sales from '@/views/MK/MK_Sales/MK_Sales'
import MK_AllProject from '@/views/MK/MK_AllProject/MK_AllProject'
import MK_SalesDetail from '@/views/MK/MK_Sales/MK_SalesDetail'
import MK_Profile from '@/views/MK/MK_Profile/MK_Profile'
import MK_NUP from '@/views/MK/MK_NUP/MK_NUP'
import MK_NUPForm from '@/views/MK/MK_NUP/MK_NUPForm'

// Common
import MK_ProjectDetailCommon from '@/views/MK/MK_ProjectDetailCommon/MK_ProjectDetailCommon'
import MK_AllProjectCommon from '@/views/MK/MK_AllProjectCommon/MK_AllProjectCommon'
import MK_AllPromotionCommon from '@/views/MK/MK_PromotionCommon/MK_AllPromotionCommon'
import MK_UnitTypeCommon from '@/views/MK/MK_UnitTypeCommon/MK_UnitTypeCommon'
import MK_FloorPlanCommon from '@/views/MK/MK_UnitTypeCommon/MK_FloorPlanCommon'

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
            path: '/MK/MK_Referral/Detail',
            name: 'MK_ReferralDetail',
            component: MK_ReferralDetail,
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
            path: '/MK/MK_AllProject',
            name: 'MK_AllProject',
            component: MK_AllProject,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_SalesDetail',
            name: 'MK_SalesDetail',
            component: MK_SalesDetail,
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
        {
            path: '/MK/MK_NUP',
            name: 'MK_NUP',
            component: MK_NUP,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_NUPForm',
            name: 'MK_NUPForm',
            component: MK_NUPForm,
            meta: {
                requiresAuth: true
            }
        },

        // common
        {
            path: '/MK/MK_ProjectDetailCommon',
            name: 'MK_ProjectDetailCommon',
            component: MK_ProjectDetailCommon,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/MK/MK_AllProjectCommon',
            name: 'MK_AllProjectCommon',
            component: MK_AllProjectCommon,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/MK/MK_AllPromotionCommon',
            name: 'MK_AllPromotionCommon',
            component: MK_AllPromotionCommon,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/MK/MK_UnitTypeCommon',
            name: 'MK_UnitTypeCommon',
            component: MK_UnitTypeCommon,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/MK/MK_FloorPlanCommon',
            name: 'MK_FloorPlanCommon',
            component: MK_FloorPlanCommon,
            meta: {
                requiresAuth: false
            }
        },
    ]
}