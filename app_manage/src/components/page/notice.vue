<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">通知中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <div class="ms-doc_main" v-show="messageList.length!==0">
                <el-collapse accordion>
                    <div v-for="list in messageList" @click="change(list.id,list.is_read)">
                        <el-collapse-item>
                            <template slot="title">
                                {{list.title}} <span class="date">{{list.create_time}} <i class="round" v-show="list.is_read==0?'1':''"></i></span>
                            </template>
                            <p>{{list.content}}</p>
                        </el-collapse-item>
                    </div>
                </el-collapse>
                <div class="block">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size=limit
                        layout="prev, pager, next, jumper"
                        :total=totalPage>
                    </el-pagination>
                </div>
            </div>
            <p v-show="messageList.length==0" class="empty">暂无任何通知</p>
            
            
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
                page:1,
                limit:20,
                messageList:[],
                totalPage:0,
            }
        },
        methods: {
            //      获取通知中心消息列表
            getMessageList: function (val) {
                this.page=val
                this.$ajax.get('/api/adminMessageList',{params:{page:this.page,limit:this.limit}}).then((res) => {
                    if (res.data.code == '200') {
                        this.messageList = res.data.data.list
                        this.totalPage=res.data.data.total_page
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            handleCurrentChange(val) {
//                获取当前页数的消息
                this.getMessageList(val)
            },
            change(e,status){
            	if(status==0){
            		//                更改已读消息的状态
                this.$ajax.post('/api/setMessageRead',{id:e}).then((res) => {
                    if (res.data.code == '200') {
                        this.getMessageList()
                    }
                }, (err) => {
                    console.log(err)
                })
            	}else{
            		
            	}

            }
        },
        mounted() {
        },
        created: function () {
               this.getMessageList()
        }
    }
</script>

<style scoped>
    .ms-doc {
        width: 100%;
        max-width: 980px;
        /*max-width: 1300px;*/
        background-color: white;
        padding: 40px;
        color: #54667a;
    }

    .ms-doc_main {
        padding: 20px;
        border-top: 1px solid #e9f1f3;
        overflow: hidden;
    }

    .lead_out img {
        margin: 0 10px -3px 0;
        width: 16px;
        height: 18px;
    }
    .block{
        margin: 20px;
        float: right;
    }
    .date{
        float: right;margin-right: 20px;width: 150px;
    }
    .round{
        margin-left: 10px;
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #fc4b6c;
        border-radius: 50%;
        margin-top: 18px;
        float: right;
    }
</style>
<style>
    .el-pager li.active {
        border-color: #0f8edd;
        background-color: #0f8edd;
    }
    .el-icon-arrow-right:before {
        content: "\E606";
    }
</style>
