<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="nav">
        	<router-link to="/notice">
        		<p> <img src="/static/img/notice_icon.png" alt=""><span>待办事项提醒：</span><span class="info">{{messageList.create_time}},{{messageList.content}}</span></p>
        	</router-link> 
        </div>
        <div class="ms-doc">
              <p class="title">指标数据</p>
            <div class="ms-doc_main">
                <p class="time">更新时间：2043-12-11</p>
                <div style="font-size: 0;margin-bottom: 30px;">
                    <router-link class="list" to="/userData">
                        <div style="display: flex;align-items: center;margin-bottom: 22px;">
                        	<img src="../../../../static/img/user.png" alt="" class="icon"/>
                        	<div style="height: 60px;display: flex;flex-direction: column;justify-content: space-between;">
                        		<p class="list-title">新增用户</p>
                        		<p class="list-title-num">{{new_member.today}}</p>
                        	</div>
                        </div>
                        <p class="yesterday-title">昨日数据 <span class="yesterday-num">{{new_member.yesterday}}</span></p>
                    </router-link>
                     <router-link class="list" to="/userData">
                        <div style="display: flex;align-items: center;margin-bottom: 22px;">
                        	<img src="../../../../static/img/users.png" alt="" class="icon"/>
                        	<div style="height: 60px;display: flex;flex-direction: column;justify-content: space-between;">
                        		<p class="list-title">累计用户</p>
                        		<p class="list-title-num">{{total_member.today}}</p>
                        	</div>
                        </div>
                        <p class="yesterday-title">昨日数据 <span class="yesterday-num">{{total_member.yesterday}}</span></p>
                    </router-link>
                </div>
                <div style="font-size: 0; margin-bottom: 30px;">
                    <div class="list">
                        <div style="display: flex;align-items: center;margin-bottom: 22px;">
                        	<img src="../../../../static/img/pay.png" alt="" class="icon"/>
                        	<div style="height: 60px;display: flex;flex-direction: column;justify-content: space-between;">
                        		<p class="list-title">财宝支出</p>
                        		<p class="list-title-num">{{acer_count.today}}</p>
                        	</div>
                        </div>
                        <p class="yesterday-title">昨日数据 <span class="yesterday-num">{{acer_count.yesterday}}</span></p>
                    </div>
                     <div class="list">
                        <div style="display: flex;align-items: center;margin-bottom: 22px;">
                        	<img src="../../../../static/img/visite.png" alt="" class="icon"/>
                        	<div style="height: 60px;display: flex;flex-direction: column;justify-content: space-between;">
                        		<p class="list-title">访客数</p>
                        		<p class="list-title-num">{{vistor_count.today}}</p>
                        	</div>
                        </div>
                        <p class="yesterday-title">昨日数据 <span class="yesterday-num">{{vistor_count.yesterday}}</span></p>
                    </div>
                   <div class="list">
                        <div style="display: flex;align-items: center;margin-bottom: 22px;">
                        	<img src="../../../../static/img/glance.png" alt="" class="icon"/>
                        	<div style="height: 60px;display: flex;flex-direction: column;justify-content: space-between;">
                        		<p class="list-title">浏览量</p>
                        		<p class="list-title-num">{{visit_count.today}}</p>
                        	</div>
                        </div>
                        <p class="yesterday-title">昨日数据 <span class="yesterday-num">{{visit_count.yesterday}}</span></p>
                    </div>
                </div>
                <div style="font-size: 0;margin-bottom: 30px;">
                    <router-link class="list" to="/deliverManage">
                        <div style="display: flex;align-items: center;margin-bottom: 22px;">
                        	<img src="../../../../static/img/order.png" alt="" class="icon"/>
                        	<div style="height: 60px;display: flex;flex-direction: column;justify-content: space-between;">
                        		<p class="list-title">商城订单</p>
                        		<p class="list-title-num">{{order_count.today}}</p>
                        	</div>
                        </div>
                        <p class="yesterday-title">昨日数据 <span class="yesterday-num">{{order_count.yesterday}}</span></p>
                    </router-link>
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
                messageList:{},
                new_member:{},
                total_member:{},
                acer_count:{},
                vistor_count:{},
                visit_count:{},
                order_count:{}
            }
        },
        mounted(){

        },
        methods:{
            getNum(){
            	this.$ajax.get("/api/index").then((res)=>{
            		if(res.data.code=='200'){
            			this.messageList=res.data.data.messageList
            			this.new_member=res.data.data.new_member
            			this.total_member=res.data.data.total_member
            			this.acer_count=res.data.data.acer_count
            			this.vistor_count=res.data.data.vistor_count
            			this.visit_count=res.data.data.visit_count
            			this.order_count=res.data.data.order_count
            		}else if(res.data.code=='601'){
            			this.$router.push('/login')
            		}else{
            			this.$message({
							message: res.data.error,
							type: 'error'
						});
            		}
            	},(err)=>{
            		
            	})
            }

        },
        created:function(){
              this.getNum()
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
    .ms-doc_main {
    padding-top: 0;
}
    .list{
    	width: 310px;
    	height: 152px;
    	box-sizing: border-box;
    	padding: 30px;
    	border: 1px solid #e9f1f3;
    	display: inline-block;
    	cursor: pointer;
    }
    .list-title{
    	font-size: 14px;
    	color: #54667a;
    }
    .list-title-num{
    	font-size: 20px;
    	color: #54667a;
    }
    .yesterday-title{
    	font-size: 14px;
    	color: #999;
    }
    .yesterday-num{
        color: #666;
        margin-left: 16px;
    }
    .icon{
    	width: 60px;
    	height: 60px;
    	margin-right: 16px;
    }
</style>
