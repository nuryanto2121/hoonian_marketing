// import MK_MasterPrincipleForm from '@/views/MK/MK_MasterPrinciple/MK_MasterPrincipleForm'

export const MKRender = {
    path: '/MK',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        // {
        //     path: '/MK/MK_MasterPrincipleForm',
        //     name: 'MK_MasterPrincipleForm',
        //     component: MK_MasterPrincipleForm,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
    ]
}