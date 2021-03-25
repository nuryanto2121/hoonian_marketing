import PJ_PromotionMaster from '@/views/PJ/PJ_PromotionMaster/PJ_PromotionMasterList'
import PJ_PromotionMasterForm from '@/views/PJ/PJ_PromotionMaster/PJ_PromotionMasterForm'

export const PJRender = {
    path: '/PJ',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        {
            path: '/PJ/PJ_PromotionMaster/Form',
            name: 'PJ_PromotionMasterForm',
            component: PJ_PromotionMasterForm,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/PJ/PJ_PromotionMaster',
            name: 'PJ_PromotionMaster',
            component: PJ_PromotionMaster,
            meta: {
                requiresAuth: true
            }
        },
    ]
}