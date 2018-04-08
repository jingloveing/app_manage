<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">积分管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <div class="ms-doc_main">
                <p>积分汇率（元宝汇率）</p>
                <el-input v-model="config.rate" style="width: 200px;margin:20px 20px 20px 0;" placeholder="请输入最低积分"></el-input>
                积分=1元
                <p>获取积分途径</p>
                <el-input placeholder="请输入链接" v-model="config.url" style="width: 300px;margin:20px 20px 20px 0;">
                    <!--<template slot="prepend">http://</template>-->
                </el-input>
                积分=1元
                <p style="margin-bottom: 30px;">注：选填项，当用户积分不足时，可跳转至此链接页面，不填则无配置</p>
                <p>每日支出上线</p>
                <el-input v-model="config.day_limit" style="width: 200px;margin:20px 20px 20px 0;" placeholder="请输入数值"></el-input>元
                <p style="margin-bottom: 30px;">注：选填项，平台每日可消耗的最高金额上限，不填则默认无限制</p>
                <p>每月支出上线</p>
                <el-input v-model="config.month_limit" style="width: 200px;margin:20px 20px 20px 0;" placeholder="请输入最低积分"></el-input>元
                <p style="margin-bottom: 30px;">注：选填项，平台每月可消耗的最高金额上限，不填则默认无限制</p>

            </div>
            <div style="text-align: center;">
                <el-button type="primary" round @click="save()">确认
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
                config:{
                    id:'',
                    rate:'',
                    url:'',
                    day_limit:'',
                    month_limit:'',
                    exchange_brief:''
                }
            }
        },
        methods: {
//         获取积分配置
            getAcerConfig(){
                this.$ajax.get('/api/Acer/acerConfig').then((res) => {
                    if (res.data.code == '200') {
                        this.config=res.data.data.config
                    }else{

                    }
                }, (err) => {
                    console.log(err)
                })
            },
//            保存积分设置
            save(){
                this.$ajax.post('/api/Acer/acerConfig',this.config).then((res) => {
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
           this.getAcerConfig()
        }
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
</style>
