<template>
    <div class="header">
        <div class="logo"><img src="/static/img/logo.png" alt=""></div>
         <div class="nav">
             <span v-on:click="toNotice()"><img src="/static/img/info_img.png" alt="">消息（{{unMessage}}）</span>
         </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <i class="el-icon-arrow-down" style="margin-left: 10px;"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout" class="dropdown"><img src="/static/img/quit.png" alt="" style="margin-right: 10px;">退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                isShow:true,
                username:'',
                defaultImg:'this.src="'+require('../../../static/img/default_img.png')+'"',
                unMessage:0,
            }
        },
        computed:{
            
        },
        methods:{
            //      获取最新未读消息个数
            getMessage: function () {
                this.$ajax.get('/api/unReadCount').then((res) => {
                    if (res.data.code == '200') {
                        this.unMessage=res.data.data.unMessage
                    }else{
                        this.unMessage=0
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            handleCommand(command) {
            	sessionStorage.clear()
               this.$router.push('/login');
                    
            },
            toNotice(){
                    this.$router.push({ path: "/notice" })
            },
        },
        created:function(){
            this.username = sessionStorage.getItem('username');
            this.getMessage()
            setInterval(()=>{
                this.getMessage()
            },120000)
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background-image: url('/static/img/h_bd.png');
        background-size: 100% 100%;
        padding-left: 34px;
    }
    .header .logo{
        float: left;
        overflow: hidden;
        text-align: center;
        margin-right: 50px;
    }
    .logo img{
        width: 189px;
        height: 25px;
        vertical-align: middle;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .nav{
        font-size: 14px;
        color: white;
        display: inline-block;
        cursor: pointer;
    }
    .nav img{
        width:18px;
        height: 14px;
        vertical-align: middle;
        margin:0 10px 0 20px;
    }
    .info_num{
        background-color: #fc4b6c;
        border-radius: 50%;
        position: relative;
        top:-10px;
        left: -10px;
        width: 10px;
        height: 10px;
        display: inline-block;
    }
    .dropdown:nth-child(1){
        border-bottom: 1px solid #e9f1f3;
    }
    .dropdown{
        font-size: 12px;color: #54667a;line-height: 30px;
    }
    .round{
        margin:0 10px;
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #fc4b6c;
        border-radius: 50%;
    }
    .notice{
        width: 300px;
        line-height: 60px;
        padding:0px 20px;
        right: -39px;
        position: absolute;
        top:72px;
        background-color: white;
        border: 1px solid #e9f1f3;
        z-index: 10000;
        font-size: 12px;
    }
    .notice p{
        color: #54667a;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
