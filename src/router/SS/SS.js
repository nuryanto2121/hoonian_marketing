// import SS_AssignProjectForm from '@/views/SS/SS_AssignProject/SS_AssignProjectForm'

export const SSRender = {
    path: '/SS',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        // {
        //     path: '/SS/SS_AssignProject/Form',
        //     name: 'SS_AssignProjectForm',
        //     component: SS_AssignProjectForm,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        
    ]
}