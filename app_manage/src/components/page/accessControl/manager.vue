<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">管理员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <el-button type="primary" round
                       style="background-color: #0f8edd;border-color: #0f8edd;margin-bottom: 14px;" @click="handleClick()">添加管理员
            </el-button>
            <div class="ms-doc_main">
                <el-table
                    :data="managerList"
                    border
                    style="width: 100%;text-align: center;">
                    <el-table-column
                        prop="username"
                        label="用户名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="用户组" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-for="list in scope.row.group_name">{{list.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="telephone"
                        label="手机号" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="last_login_time"
                        label="最后登录时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="操作"  width="150">
                        <template slot-scope="scope">
                            <!--<a href="" class="pro">修改权限或密码</a>-->
                            <el-button @click="handleClick(scope.row.id)" type="text" size="small" class="pro">修改权限或密码</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--添加管理员弹出框-->
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            :before-close="handleClose" style="width: 1100px;margin: 100px auto;">
            <div style="font-size: 14px;color: #54667a;">
                <div>
                    <span class="model_name" style="float: left;">管理组：</span><el-checkbox-group v-model="user_info.group_id" style="margin-left: 90px;">
                    <el-checkbox :label="list.id" v-for="list in groupList" :key="list.id">{{list.title}}</el-checkbox>
                </el-checkbox-group>
                </div>
                <p><span  class="model_name">姓名：</span><el-input v-model="user_info.username" style="width: 180px;margin: 10px 0 20px;"></el-input></p>
                <p><span  class="model_name">手机号：</span><el-input v-model="user_info.telephone" style="width: 180px;margin: 10px 0 20px;"></el-input></p>
                <p><span  class="model_name">初始密码：</span><el-input v-model="user_info.password" style="width: 180px;margin: 10px 0 20px;"></el-input> <small style="margin-left: 10px;">如不修改密码，留空即可</small></p>
                <p><span  class="model_name">状态：</span>
                    <el-radio v-model="user_info.status" label="1">允许登录</el-radio>
                    <el-radio v-model="user_info.status" label="2">禁止登录</el-radio>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose()">取 消</el-button>
    <el-button type="primary" @click="addManager()" style="background-color: #0f8edd;border-color: #0f8edd;">保存</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                dialogVisible:false,
                input:'',
                managerList:[],
                groupList:[],
                radio: '1',
                user_info:{
                    username:'',
                    telephone:null,
                    password:'',
                    group_id:[],
                    status:'1',
                    id:''
                },
                title:'添加管理员'

            }
        },
        methods: {
            //      获取管理员列表
            getManageList: function () {
                this.$ajax.get('/api/Rule/userList').then((res) => {
                    if (res.data.code == '200') {
                        this.managerList = res.data.data.user_list
                         console.log(this.managerList)
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //      获取管理员分组列表
            getManageGroup: function () {
                this.$ajax.get('/api/Rule/addAdmin').then((res) => {
                    if (res.data.code == '200') {
                        this.groupList = res.data.data.group_list

                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //      添加管理员操作
            addManager: function () {
                if(this.user_info.group_id === undefined || this.user_info.group_id.length == 0){
                    this.$message({
                            message: "请选择管理组",
                            type: 'error'
                        });
                    return
                }else{

                }
//                {username:this.username,telephone:this.telephone,password:this.password,group_id:this.group_id,status:this.status}
                this.$ajax.post('/api/Rule/editAdmin',this.user_info).then((res) => {
                    if (res.data.code == '200') {
                        this.dialogVisible= false
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.getManageList()
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

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.dialogVisible= false
                    })
                    .catch(_ => {});
            },
            handleClick(id) {
                //      获取管理信息
                if(id){
                    this.title='修改权限或密码'
                    this.$ajax.get('/api/Rule/editAdmin',{params:{admin_id:id}}).then((res) => {
                        if (res.data.code == '200') {
                            this.user_info = res.data.data.user_info
                            console.log(this.user_info)
                            console.log(this.user_info.status)
                            this.dialogVisible= true
                        }
                    }, (err) => {
                        console.log(err)
                    })
                }else{
                    this.title='添加管理员'
                    this.user_info={
                        username:'',
                        telephone:'',
                        password:'',
                        group_id:[],
                        status:'1',
                        id:''
                    }
                    this.dialogVisible= true
                }

            }
        },
        mounted() {
        },
        created: function () {
          this.getManageList()
            this.getManageGroup()
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
    .pro{
        color: #0f8edd;
        padding: 0 10px;
    }
    .proB{
        border-left: 1px solid #bfbfbf;
        border-right: 1px solid #bfbfbf;
    }
    .model_name{
        display: inline-block;width: 80px;margin-right: 10px;text-align: right;
    }
</style>
<style>
    /*.el-checkbox{*/
        /*margin-left: 15px;*/
    /*}*/
</style>
