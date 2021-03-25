
import DD_Dashboard from '@/views/Dashboard/DD_Dashboard'
import DD_SalesTarget from '@/views/DD/DD_Target/DD_SalesTarget'
import DD_SalesTarget_ByMonth from '@/views/DD/DD_Target/DD_SalesTarget_ByMonth'

import DD_SalesAvailable from '@/views/DD/DD_Sales/DD_SalesAvailable'
import DD_SalesReserved from '@/views/DD/DD_Sales/DD_SalesReserved'
import DD_SalesHold from '@/views/DD/DD_Sales/DD_SalesHold'
import DD_SalesBooked from '@/views/DD/DD_Sales/DD_SalesBooked'
import DD_SalesSold from '@/views/DD/DD_Sales/DD_SalesSold'
import DD_SalesCancelBooking from '@/views/DD/DD_Sales/DD_SalesCancelBooking'
import DD_SalesCancelSales from '@/views/DD/DD_Sales/DD_SalesCancelSales'

import DD_Progress from '@/views/DD/DD_Progress/DD_Progress'
import DD_ProgressDetail from '@/views/DD/DD_Progress/DD_ProgressDetail'

import DD_Promotion from '@/views/DD/DD_Promotion/DD_Promotion'

import DD_NupToken from '@/views/DD/DD_NupToken/DD_NupToken'

import DD_PaymentMethod from '@/views/DD/DD_PaymentMethod/DD_PaymentMethod'
import DD_PaymentMethodDetail from '@/views/DD/DD_PaymentMethod/DD_PaymentMethodDetail'

import DD_SalesPrinciple from '@/views/DD/DD_SalesPrinciple/DD_SalesPrinciple'

import DD_ReservationBooked from '@/views/DD/DD_Reservation/DD_ReservationBooked'
import DD_ReservationSold from '@/views/DD/DD_Reservation/DD_ReservationSold'
import DD_ReservationWaitingList from '@/views/DD/DD_Reservation/DD_ReservationWaitingList'
import DD_ReservationOfflineSales from '@/views/DD/DD_Reservation/DD_ReservationOfflineSales'
import DD_ReservationReferralSales from '@/views/DD/DD_Reservation/DD_ReservationReferralSales'

import DD_OutstandingCommission from '@/views/DD/DD_OutstandingCommission/DD_OutstandingCommission'
import DD_OutstandingHoldBooking from '@/views/DD/DD_OutstandingCommission/DD_OutstandingHoldBooking'
import DD_OutstandingTickets from '@/views/DD/DD_OutstandingCommission/DD_OutstandingTickets'

import DD_InternalMarketingViewAll from '@/views/DD/DD_InternalMarketing/DD_InternalMarketingViewAll'
import DD_SalesEventViewAll from '@/views/DD/DD_SalesEvent/DD_SalesEventViewAll'

import DD_SalesLeadViewAll from '@/views/DD/DD_SalesLead/DD_SalesLeadViewAll'
import DD_SalesLeadUnattended from '@/views/DD/DD_SalesLead/DD_SalesLeadUnattended'

export const DDRender = {
    path: '/DD',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        {
            path: '/DD_Dashboard',
            name: 'DD_Dashboard',
            component: DD_Dashboard,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/DD_SalesTarget',
            name: 'DD_SalesTarget',
            component: DD_SalesTarget,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesTarget_ByMonth',
            name: 'DD_SalesTarget_ByMonth',
            component: DD_SalesTarget_ByMonth,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/DD_SalesAvailable',
            name: 'DD_SalesAvailable',
            component: DD_SalesAvailable,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesReserved',
            name: 'DD_SalesReserved',
            component: DD_SalesReserved,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesHold',
            name: 'DD_SalesHold',
            component: DD_SalesHold,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesBooked',
            name: 'DD_SalesBooked',
            component: DD_SalesBooked,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesSold',
            name: 'DD_SalesSold',
            component: DD_SalesSold,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesCancelBooking',
            name: 'DD_SalesCancelBooking',
            component: DD_SalesCancelBooking,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesCancelSales',
            name: 'DD_SalesCancelSales',
            component: DD_SalesCancelSales,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/DD_Progress',
            name: 'DD_Progress',
            component: DD_Progress,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_ProgressDetail',
            name: 'DD_ProgressDetail',
            component: DD_ProgressDetail,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/DD_Promotion',
            name: 'DD_Promotion',
            component: DD_Promotion,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/DD_NupToken',
            name: 'DD_NupToken',
            component: DD_NupToken,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/DD_PaymentMethod',
            name: 'DD_PaymentMethod',
            component: DD_PaymentMethod,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_PaymentMethodDetail',
            name: 'DD_PaymentMethodDetail',
            component: DD_PaymentMethodDetail,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/DD_SalesPrinciple',
            name: 'DD_SalesPrinciple',
            component: DD_SalesPrinciple,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/DD_ReservationBooked',
            name: 'DD_ReservationBooked',
            component: DD_ReservationBooked,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_ReservationSold',
            name: 'DD_ReservationSold',
            component: DD_ReservationSold,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_ReservationWaitingList',
            name: 'DD_ReservationWaitingList',
            component: DD_ReservationWaitingList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_ReservationOfflineSales',
            name: 'DD_ReservationOfflineSales',
            component: DD_ReservationOfflineSales,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_ReservationReferralSales',
            name: 'DD_ReservationReferralSales',
            component: DD_ReservationReferralSales,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_OutstandingCommission',
            name: 'DD_OutstandingCommission',
            component: DD_OutstandingCommission,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_OutstandingHoldBooking',
            name: 'DD_OutstandingHoldBooking',
            component: DD_OutstandingHoldBooking,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_OutstandingTickets',
            name: 'DD_OutstandingTickets',
            component: DD_OutstandingTickets,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_InternalMarketingViewAll',
            name: 'DD_InternalMarketingViewAll',
            component: DD_InternalMarketingViewAll,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesEventViewAll',
            name: 'DD_SalesEventViewAll',
            component: DD_SalesEventViewAll,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesLeadViewAll',
            name: 'DD_SalesLeadViewAll',
            component: DD_SalesLeadViewAll,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/DD_SalesLeadUnattended',
            name: 'DD_SalesLeadUnattended',
            component: DD_SalesLeadUnattended,
            meta: {
                requiresAuth: true
            }
        },
    ]
}