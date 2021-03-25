// import ADM_NotificationForm from '@/views/ADM/ADM_Notification/ADM_NotificationForm'

export const ADMRender = {
    path: '/ADM',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        // {
        //     path: '/ADM/ADM_UserManagement',
        //     name: 'ADM_UserManagement',
        //     component: ADM_UserManagement,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
    
    ]
}