<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">账号设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <div class="ms-doc_main">
                <p><span class="title">登录账号：</span>{{username}}</p>
                <p><span class="title" style="float: left;margin-top: 20px;">头像：</span><img :src="userPhoto" alt="" class="photo" :onerror="defaultImg" id="photo">
                    <input id="file" type="file"  style="display: none" @change="uploadImg($event)" multiple accept="image/*">
                    <label class="operate" for="file">上传头像</label></p>
                <p><span class="title">昵称：</span><el-input v-model="nickname" style="width: 300px;margin: 20px 0;"></el-input>
                    <label class="operate">修改昵称</label></p>
                <!--<div style="">-->
                    <el-button type="primary" round
                               style="margin:0 0 50px 150px;" @click="saveUserInfo()">保存
                    </el-button>
                <!--</div>-->
                <p><span class="title">密码：</span><el-input  style="width: 300px;margin: 20px 0;"  type="password" v-model="password" disabled></el-input>
                    <label class="operate" v-on:click="toShow()">修改密码</label></p>
                <div v-show="isShow">
                    <p><span class="title">当前密码：</span><el-input minlenght="6" maxlenght="14" v-model="data.old_password" style="width: 300px;margin: 20px 0;" placeholder="6-14个英文和数字组合" type="password"></el-input></p>
                    <p><span class="title">新密码：</span><el-input minlenght="6" maxlenght="14" v-model="data.new_password" style="width: 300px;margin: 20px 0;" placeholder="6-14个英文和数字组合" type="password"></el-input></p>
                    <p><span class="title">确认新密码：</span><el-input minlenght="6" maxlenght="14" v-model="data.sure_password" style="width: 300px;margin: 20px 0;" placeholder="请再次输入新密码" type="password"></el-input></p>

                </div>
                <el-button type="primary" round
                           style="margin:0 0 50px 150px;" @click="savePassword()">保存
                </el-button>
                <p><span class="title" style="float: left;margin-top: 20px;">客服二维码：</span><img :src="QR" alt="" class="photo" :onerror="defaultImg">
                    <input id="rq" type="file"  style="display: none" @change="uploadQR($event)" multiple accept="image/*">
                        <label class="operate" for="rq">上传二维码</label>
                        <span style="font-size: 14px;color: #999999;">(注：该二维码作为在线客服使用)</span>
                </p>
                <el-button type="primary" round
                           style="margin:10px 0 50px 150px;" @click="saveQR()">保存
                </el-button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                title:'',
                content:'',
                isShow: false,
                username:'',
                keys:'',
                nickname:'',
                userPhoto:'',
                img:'',
                defaultImg:'this.src="'+require('../../../static/img/default_img.png')+'"',
                data:{
                    old_password:'',
                    new_password:'',
                    sure_password:''
                },
                QR:'',
            }
        },
        methods: {
            //      获取二维码
            getQR: function () {
                this.$ajax.get('/api/User/ewm').then((res) => {
                    if (res.data.code == '200') {
                        this.QR=res.data.data.ewm
                    }else{
                        this.QR=''
                    }
                }, (err) => {
                    console.log(err)
                })
            },
//            上传用户头像
            uploadImg:function(e){
                const formData = new FormData();
                formData.append('images',e.target.files[0]);
                let config ={
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.$ajax.post('api/Index/upload', formData, config).then((res)=>{
                    if(res.data.code=='200'){
//                        let el = document.getElementById('file');
//                        el.previousElementSibling; // 这就是元素的前一个兄弟节点
                        this.userPhoto = res.data.data.image_url
                    }
                },(err)=>{})
            },
//            上传客服二维码
            uploadQR:function(e){
                const formData = new FormData();
                formData.append('images',e.target.files[0]);
                let config ={
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.$ajax.post('api/Index/upload', formData, config).then((res)=>{
                    if(res.data.code=='200'){
                        this.QR = res.data.data.image_url
                    }
                },(err)=>{})
            },
           toShow(){
               this.isShow=true
           },
//           保存修改用户密码
            savePassword:function(){
//                {old_password:this.old_password,new_password:this.new_password,sure_password:this.sure_password}
                if(this.data.sure_password!==this.data.new_password){
                    this.$message({
                        message: '修改密码不一致，请重新输入',
                        type: 'error'
                    });
                    return
                }else{
                    this.$ajax.post('/api/User/changePassword',this.data).then((res) => {
                        if (res.data.code == '200') {
                            localStorage.setItem('ms_password',this.data.new_password);
                            this.$message({
                                message: res.data.data.message,
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: res.data.error,
                                type: 'error'
                            });
                        }
                    }, (err) => {
                        console.log(err)
                    })
                }

            },
//            保存修改用户头像和昵称
            saveUserInfo(){
                this.$ajax.post('/api/User/editNickName',{nickname:this.nickname,head_image:this.userPhoto}).then((res) => {
                    if (res.data.code == '200') {
                        localStorage.setItem('ms_nickname',this.nickname);
                        localStorage.setItem('ms_userPhoto',this.userPhoto);
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: res.data.error,
                            type: 'error'
                        });
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //            保存修改客服二维码
            saveQR(){
                this.$ajax.post('/api/User/ewm',{ewm:this.QR}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: res.data.error,
                            type: 'error'
                        });
                    }
                }, (err) => {
                    console.log(err)
                })
            }
        },
        mounted() {
        },
        created: function () {
            this.userPhoto = localStorage.getItem('ms_userPhoto');
            this.username= localStorage.getItem('ms_username');
            this.nickname = localStorage.getItem('ms_nickname');
            this.password = localStorage.getItem('ms_password');
            this.getQR()
        },
        computed:{
//            username(){
//                let username =
//                return username ? username : this.name;
//            },
//            password(){
//                let password = localStorage.getItem('ms_password');
//                return password ? password : this.keys;
//            },
//            nickname(){
//                let nickname = localStorage.getItem('ms_nickname');
//                return nickname ? nickname : this.nickName;
//            },
        },
    }
</script>

<style scoped>
    .ms-doc {
        /*width: 100%;*/
        max-width: 980px;
        /*max-width: 1300px;*/
        background-color: white;
        padding: 40px;
        color: #54667a;
        margin-bottom: 54px;
    }

    .ms-doc_main {
        padding: 20px;
        border-top: 1px solid #e9f1f3;
    }

    .lead_out img {
        margin: 0 10px -3px 0;
        width: 16px;
        height: 18px;
    }
    .title{
        display: inline-block;width: 150px;text-align: right;
    }
    .photo{
        width: 80px;
        height: 80px;
        margin-top: 20px;
    }
    .operate{
        font-size: 14px;
        color: #0f8edd;
        margin-left: 20px;
    }
</style>
