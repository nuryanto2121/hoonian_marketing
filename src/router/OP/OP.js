// import OP_PrincipleAssignUnit from '@/views/OP/OP_Principle/OP_PrincipleAssignUnit'

export const OPRender = {
    path: '/OP',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        // {
        //     path: '/OP/OP_Principle/AssignUnit',
        //     name: 'OP_PrincipleAssignUnit',
        //     component: OP_PrincipleAssignUnit,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
    ]
}