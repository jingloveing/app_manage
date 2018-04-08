<template>
    <div class="login-wrap">
        <div>
            <div class="header">
                <img src="/static/img/logo_img.png" alt="" style="vertical-align: middle;margin-right: 10px;">
                   <span style="float: right;cursor: pointer;" class="toQR">联系客服</span>
                   <div class="QR">
                       <img src="/static/img/qr.jpg" alt="">
                       <p>扫码关注微信公众号</p>
                   </div>
                <span style="float: right;cursor: pointer;margin-right: 40px;"><a href="http://web.dxvke.com" style="color: #666;">洞悉官网</a></span>
            </div>
        </div>
        <img src="/static/img/login_logo.png" alt="" width="455px" height="66px" style="position: absolute;left: 236px;margin: 320px auto;">
        <div class="ms-login">
            <p>账号登录</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <!--<input type="text" placeholder="账号" v-model="ruleForm.username" class="input" name="username">-->
                <!--<input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" class="input" name="password">-->
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                    <input type="checkbox" style="vertical-align: middle;" id="rememberMe"><span style="color: #666;font-size: 12px;">记住密码</span>
                <div class="login-btn">
                    <el-button @click="submitForm('ruleForm')" class="btn">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    isRemember:'0'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
//            用户登录
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(document.getElementById("rememberMe").checked){
                            self.ruleForm.isRemember='1'
                        }else{
                            self.ruleForm.isRemember='0'
                        }
                this.$ajax({
                    method: 'POST',
                    url: '/api/doLogin',
                    data:self.ruleForm
                }).then((res) => {
                    if (res.data.code == '200') {
                    	sessionStorage.setItem("token",res.data.data.token)
//                      localStorage.setItem('ms_username',self.ruleForm.username);
//                      localStorage.setItem('ms_password',self.ruleForm.password);
//                      localStorage.setItem('ms_nickname',res.data.data.user_info.nickname);
//                      localStorage.setItem('ms_userPhoto',res.data.data.user_info.head_image);
                        self.$router.push('/home');
                    }else{
                        this.$message({
                            message: res.data.error,
                            type: 'error'
                        });
                    }
                }, (err) => {
                    console.log(err)
                })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created:function(){
//            判断是否记住密码，是否自动登录
            this.$ajax({
                method: 'POST',
                url: '/api/User/loginPage',
            }).then((res) => {
                if (res.data.code == '200') {
                    this.ruleForm.username = res.data.data.username
                    this.ruleForm.password = res.data.data.password
                    if(res.data.code == '200'){
                        this.ruleForm.isRemember='1'
                    }else{
                        this.ruleForm.isRemember='0'
                    }
                }
            }, (err) => {
                console.log(err)
            })
        },
        mounted(){
            if(this.ruleForm.isRemember='1'){
                document.getElementById("rememberMe").checked=true
            }else{
                document.getElementById("rememberMe").checked=false
            }
        }
    }
</script>

<style scoped>
    .header{
        position: absolute;
        top:0;
        background-color: white;
        width: calc(100% - 360px);
        line-height: 54px;
        padding: 0 180px;
        font-size: 14px;
        color: #666;
    }
    .login-wrap{
        width: 100%;
        height: 100%;
        position: relative;
        background-image: url("/static/img/login_bd.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/static/img/login_bd.jpg',sizingMethod='scale');
    }
    .ms-login{
        position: absolute;
        right: 238px;
        top:208px;
        width:254px;
        padding:48px 45px;
        border-radius: 5px;
        background-color: white;
    }
    .ms-login p{
        text-align: center;
        color: #038fc6;
        margin-bottom: 29px;
        font-size: 20px;
    }
    .login-btn{
        text-align: center;
        margin-top: 28px ;
    }
    .btn{
        width: 254px;
        height: 40px;
        color: white;
        background-image: linear-gradient(90deg,
        #0186c2 0%,
        #0bbbd9 100%),
        linear-gradient(90deg,
            #ff5b6b 0%,
            #ff7e7e 100%),
        linear-gradient(
            #000000,
            #000000);
        background-blend-mode: normal,
        normal,
        normal;
        border-radius: 4px;
    }
    .login-btn button{
        width:100%;
        height:40px;
    }
    /*.input{*/
        /*width: 240px;*/
        /*line-height: 38px;*/
        /*padding: 0 8px;*/
        /*margin-bottom: 18px;*/
    /*}*/
    .QR{
        position: absolute;
        width: 132px;
        padding: 8px;
        text-align: center;
        background-color: white;
        right: 130px;
        top:57px;
        border: 1px solid #baab95;
        visibility: hidden;
    }
    .QR img{
        width: 90px;
        height: 90px;
    }
    .QR p{
        line-height: 20px;
        margin-top: -18px;
    }
    .toQR:hover + .QR{
        visibility: visible;
    }
</style>

