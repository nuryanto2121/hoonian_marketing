import MK_SalesLead from '@/views/MK/MK_SalesLead/MK_SalesLead'
import MK_SalesLeadLogbook from '@/views/MK/MK_SalesLead/MK_SalesLeadLogbook'

export const MKRender = {
    path: '/MK',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
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
    ]
}