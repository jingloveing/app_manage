import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
Vue.use(ElementUI);
Vue.prototype.$ajax = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

/******************拦截器设置请参考这部分(开始)******************/
axios.interceptors.request.use(
config => {
	const token = sessionStorage.getItem("token")
//	console.log(token)
//  const token = 'this is a token';
    if (token) {
         config.headers.token = token;
    }
    return config
},
error => {
    return Promise.reject(error)
});
/******************拦截器设置请参考这部分(结束)******************/

