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
                },{
                    path: '/shareImage',
                    component: resolve => require(['../components/page/shareImage/shareImage.vue'], resolve)
                },{
                    path: '/versionInfo',
                    component: resolve => require(['../components/page/versionInfo/versionInfo.vue'], resolve)
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
                    path: '/shareBanner',
                    component: resolve => require(['../components/page/share/shareBanner.vue'], resolve)
                },
                {
                    path: '/goodsManage',
                    component: resolve => require(['../components/page/taobaoManage/goodsManage.vue'], resolve)
                },{
                    path: '/bannerManage',
                    component: resolve => require(['../components/page/taobaoManage/bannerManage.vue'], resolve)
                },{
                    path: '/affirmOrder',
                    component: resolve => require(['../components/page/taobaoManage/affirmOrder.vue'], resolve)
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
                },{
                    path: '/userData',
                    component: resolve => require(['../components/page/data_analysis/userData.vue'], resolve)
                },{
                    path: '/appVisit',
                    component: resolve => require(['../components/page/data_analysis/appVisit.vue'], resolve)
                },{
                    path: '/selfVisit',
                    component: resolve => require(['../components/page/data_analysis/selfVisit.vue'], resolve)
                },
                {
                    path: '/banner',
                    component: resolve => require(['../components/page/smallRoutine/banner.vue'], resolve)
                },
                {
                    path: '/rewardManage',
                    component: resolve => require(['../components/page/smallRoutine/rewardManage.vue'], resolve)
                },
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
