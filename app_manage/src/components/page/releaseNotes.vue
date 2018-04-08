<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">发送通知</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <!--<el-button type="primary" round-->
                       <!--style="background-color: #0f8edd;border-color: #0f8edd;margin-bottom: 14px;">添加管理员-->
            <!--</el-button>-->
            <div class="ms-doc_main">
               <p>通知标题</p>
                <el-input v-model="title" style="width: 500px;margin: 20px 0;"></el-input>
                <p>通知内容</p>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 12, maxRows: 12}"
                    placeholder="请输入内容"
                    v-model="message" style="width: 500px;margin: 20px 0;">
                </el-input>
                <p>群发对象</p>
                <el-select v-model="value" placeholder="请选择"  style="width: 160px;margin: 20px 0;" >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div style="text-align: center;">
                    <el-button type="primary" round @click="save()">确认
                    </el-button>
                </div>
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
                message:'',
                options: [{
                    value: '选项1',
                    label: '全部'
                }
                ],
                value:'全部',
            }
        },
        methods: {
            //      发送消息保存
           save: function () {
                this.$ajax.post('/api/Message/massMessage',{title:this.title,msg:this.message}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.title=''
                        this.message=''
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

        },
        mounted() {
        },
        created: function () {

        }
    }
</script>

<style scoped>
    .ms-doc {
        /*max-width: 980px;*/
        max-width: 1300px;
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
    .pro{
        color: #0f8edd;
        padding: 0 10px;
    }
    .proB{
        border-left: 1px solid #bfbfbf;
        border-right: 1px solid #bfbfbf;
    }
</style>
