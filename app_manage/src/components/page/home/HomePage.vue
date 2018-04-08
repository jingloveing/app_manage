<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="nav">
            <p> <img src="/static/img/notice_icon.png" alt=""><span>待办事项提醒：</span><span class="info">2012-11-11 12:22,卖家师傅的说法是</span></p>
        </div>
        <div class="ms-doc">
              <p class="title">指标数据</p>
            <div class="ms-doc_main">
                <p class="time">更新时间：2043-12-11</p>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data(){
            return{

            }
        },
        mounted(){

        },
        methods:{


        },
        created:function(){

        }
    }

</script>

<style scoped>
    .nav p{
        font-size: 20px;
        color: #54667a;
        line-height: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
    .nav p .info{
        font-size: 14px;
        color: #666;
    }
    .nav img{
        width: 18px;
        height: 20px;
       margin-bottom: -3px;
        margin-right: 5px;
    }
    .ms-doc,.nav{
        max-width: 980px;
        background-color: white;
        padding: 0 40px;
        color: #54667a;
    }
    .title{
        font-size: 20px;
        color: #54667a;
        line-height: 60px;
        border-bottom: 1px solid #e9f1f3;
    }
   .ms-doc_main .time{
        font-size:12px;
        color: #999;
        line-height: 48px;
    }
</style>
