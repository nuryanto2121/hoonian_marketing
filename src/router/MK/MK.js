// import MK_MasterPrincipleForm from '@/views/MK/MK_MasterPrinciple/MK_MasterPrincipleForm'
import MK_Dashboard from '@/views/Dashboard/MK_Dashboard'
import MK_SalesLead from '@/views/MK/MK_SalesLead/MK_SalesLead'
import MK_SalesLeadLogbook from '@/views/MK/MK_SalesLead/MK_SalesLeadLogbook'
import MK_ProjectDetail from '@/views/MK/MK_ProjectDetail/MK_ProjectDetail'
import MK_VirtualLaunching from '@/views/MK/MK_VirtualLaunching/MK_VirtualLaunching'
import MK_VirtualLaunchingDetail from '@/views/MK/MK_VirtualLaunching/MK_VirtualLaunchingDetail'
import MK_Referral from '@/views/MK/MK_Referral/MK_Referral'
import MK_Token from '@/views/MK/MK_Token/MK_Token'

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
        
<<<<<<< HEAD
        {
            path: '/MK/MK_Referral',
            name: 'MK_Referral',
            component: MK_Referral,
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
=======
        // {
        //     path: '/MK/MK_Referral',
        //     name: 'MK_Referral',
        //     component: MK_Referral,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
>>>>>>> 26f981a4832ade1168883fe89b6d2a234700c341
    ]
}