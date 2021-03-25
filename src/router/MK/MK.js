
import MK_BrokerGroup from '@/views/MK/MK_BrokerGroup/MK_BrokerGroupList'
import MK_BrokerGroupView from '@/views/MK/MK_BrokerGroup/MK_BrokerGroupView'
import MK_BrokerGroupForm from '@/views/MK/MK_BrokerGroup/MK_BrokerGroupForm'

import MK_MasterPrinciple from '@/views/MK/MK_MasterPrinciple/MK_MasterPrincipleList'
import MK_MasterPrincipleForm from '@/views/MK/MK_MasterPrinciple/MK_MasterPrincipleForm'

export const MKRender = {
    path: '/MK',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        {
            path: '/MK/MK_BrokerGroup',
            name: 'MK_BrokerGroup',
            component: MK_BrokerGroup,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_BrokerGroup/View',
            name: 'MK_BrokerGroupView',
            component: MK_BrokerGroupView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_BrokerGroup/Form',
            name: 'MK_BrokerGroupForm',
            component: MK_BrokerGroupForm,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_MasterPrinciple',
            name: 'MK_MasterPrinciple',
            component: MK_MasterPrinciple,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MK/MK_MasterPrinciple/Form',
            name: 'MK_MasterPrincipleForm',
            component: MK_MasterPrincipleForm,
            meta: {
                requiresAuth: true
            }
        },
    ]
}