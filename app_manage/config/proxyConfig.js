module.exports={
    proxy:{
        '/api': {  //将192.168.1.101印射为/api
//             target: 'http://192.168.1.101/api', // 接口域名
            target: 'http://xlk.dxvke.com/api', // 接口域名
//          target: 'http://vkback.dxvke.com',
            pathRewrite: {
                '^/api': ''  //需要rewrite的,
            }
        }
    }
}
