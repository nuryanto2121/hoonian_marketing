// import DD_SalesLeadUnattended from '@/views/DD/DD_SalesLead/DD_SalesLeadUnattended'

export const DDRender = {
    path: '/DD',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        // {
        //     path: '/DD_SalesLeadUnattended',
        //     name: 'DD_SalesLeadUnattended',
        //     component: DD_SalesLeadUnattended,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
    ]
}