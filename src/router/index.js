import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from './../components/layout'
import billPay from './../components/billpay'
import menuType from './../components/menutype'

const options = {
    mode: 'history',
    routes: [
        {
            name: 'root',
            path: '/',
            component: Layout,
            children: [
                {
                    name: 'billPay',
                    path: 'ext/billPay',
                    component: billPay,
                    meta: {public: true, title: 'MENUPOLY - Bill Pay'},
                },
                {
                    name: 'menutype',
                    path: 'ext/seemenu/:id',
                    component: menuType,
                    props: true,
                    meta: {public: true, title: 'MENUPOLY - See Menu'},
                },
            ]
        }
    ]
}
export default new Router(options)
