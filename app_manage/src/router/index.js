import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/home',
                    component: resolve => require(['../components/page/home/HomePage.vue'], resolve)
                },
                 {
                    path: '/withdraw',
                    component: resolve => require(['../components/page/withdraw/withdraw.vue'], resolve)
                },
                 {
                    path: '/indexBanner',
                    component: resolve => require(['../components/page/indexManage/indexBanner.vue'], resolve)
                },
                {
                    path: '/indexNews',
                    component: resolve => require(['../components/page/indexManage/indexNews.vue'], resolve)
                },
                {
                    path: '/indexMerchant',
                    component: resolve => require(['../components/page/indexManage/indexMerchant.vue'], resolve)
                },
                {
                    path: '/editShare',
                    component: resolve => require(['../components/page/share/editShare.vue'], resolve)
                },
                {
                    path: '/goodsManage',
                    component: resolve => require(['../components/page/taobaoManage/goodsManage.vue'], resolve)
                },{
                    path: '/bannerManage',
                    component: resolve => require(['../components/page/taobaoManage/bannerManage.vue'], resolve)
                },{
                    path: '/brandBanner',
                    component: resolve => require(['../components/page/brandManage/brandBanner.vue'], resolve)
                },{
                    path: '/brandView',
                    component: resolve => require(['../components/page/brandManage/brandView.vue'], resolve)
                },
                {
                    path: '/specialList',
                    component: resolve => require(['../components/page/specialOffer/specialList.vue'], resolve)
                },
                {
                    path: '/deliverManage',
                    component: resolve => require(['../components/page/specialOffer/deliverManage.vue'], resolve)
                },{
                    path: '/notice',
                    component: resolve => require(['../components/page/notice.vue'], resolve)
                },
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})