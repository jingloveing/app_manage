<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">用户组管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <el-button type="primary" round
                       style="margin-bottom: 14px;" @click="handleClick()">添加用户组
            </el-button>
            <div class="ms-doc_main">
                <el-table
                    :data="groupList"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="title"
                        label="用户组名">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row.id,scope.row.title)" type="text" size="small"
                                       class="pro">修改
                            </el-button>
                            <el-button @click="del(scope.row.id)" type="text" size="small" class="pro proB">删除
                            </el-button>
                            <el-button @click="operate(scope.row.id)" type="text" size="small" class="pro">分配权限
                            </el-button>
                            <el-button @click="addMember(scope.row.id)" type="text" size="small" class="pro"
                                       style="border-left: 1px solid #bfbfbf;">添加成员
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            :before-close="handleClose" style="width: 1000px;margin: 100px auto;">
            <div>
                <p><span class="model_name">用户组名:</span>
                    <el-input v-model="group_name" style="width: 150px;margin: 10px 0 20px;"></el-input>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGroup()">确 定</el-button>
  </span>
        </el-dialog>
        <!--分配权限弹出框-->
        <el-dialog
            title="分配权限"
            :visible.sync="dialogVisible2"
            :before-close="handleClose" style="min-width: 1300px;">
            <div style="font-size: 14px;color: #54667a;max-height: 500px;">
                <ul class="model_ul">
                    <li v-for="item in allotRule">
                        <div class="model_ul_left">
                                      <!--{{item.title}}-->
                            <el-checkbox-group v-model="have_rule" style="display: inline-block;">
                                <el-checkbox :label="item.id" :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="model_ul_right">
                            <ul style="padding: 5px;border: 1px solid #e9f1f3;margin: 10px 10px;" v-for="list in item._data">
                                <li style="display: inline-block;font-size: 0px;">
                                   <div class="model_ul_left" style="border-right: 1px solid #e9f1f3;">
                                           <!--{{list.title}}-->
                                       <el-checkbox-group v-model="have_rule" style="display: inline-block;">
                                           <el-checkbox :label="list.id" :key="list.id">{{list.title}}
                                           </el-checkbox>
                                       </el-checkbox-group>
                                   </div>
                                    <div class="model_ul_right">
                                        <el-checkbox-group v-model="have_rule" style="display: inline-block;">
                                            <el-checkbox v-for="i in list._data" :label="i.id" :key="i.id">{{i.title}}
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="save()"
               style="background-color: #0f8edd;border-color: #0f8edd;">保存</el-button>
  </span>
        </el-dialog>
        <!--添加成员-->
        <el-dialog
            title="添加成员"
            :visible.sync="dialogVisible3"
            :before-close="handleClose" style="min-width: 1300px;">
            <div style="font-size: 14px;color: #54667a;max-height: 500px;">
                <el-table
                    :data="list"
                    border
                    style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="toAdd(scope.row.id)" type="text" size="small"
                                       class="pro">添加
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="saveAdd()">批量添加</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                dialogVisible: false,
                dialogVisible2: false,
                dialogVisible3: false,
                groupList: [],
                group_name: '',
                id: '',
                allotRule:[],
                have_rule: [],
                isIndeterminate: true,
                list:[],
                multipleSelection:[],
                ids:[],
                title:'添加用户组'
            }
        },
        methods: {
            //      获取分组列表
            getGroup: function () {
                this.$ajax.post('/api/Rule/group').then((res) => {
                    if (res.data.code == '200') {
                        this.groupList = res.data.data.group_list

                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //      增加分组
            addGroup() {
                if (this.group_name === undefined || this.group_name.length == 0) {
                    this.$message({
                        message: "用户组名不能为空",
                        type: 'error'
                    });
                    return
                } else {

                }
                this.$ajax.post('/api/Rule/editGroup', {id: this.id, group_name: this.group_name}).then((res) => {
                    if (res.data.code == '200') {
                        this.dialogVisible = false
                        this.groupList = res.data.data.group_list
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.getGroup()
                    } else {
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
                        done();
                    })
                    .catch(_ => {
                    });
            },
            modify() {
                this.dialogVisible = true
            },
//            增加//编辑分组
            handleClick(id, name) {
                if (id) {
                    this.title='修改用户组'
                    this.id = id
                    this.group_name = name
                    this.dialogVisible = true
                } else {
                    this.title='添加用户组'
                    this.group_id = ''
                    this.group_name = ''
                    this.dialogVisible = true
                }
            },
//            删除分组
            del(id) {
                this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post('/api/Rule/delGroup', {id: id}).then((res) => {
                        if (res.data.code == '200') {
                            this.$message({
                                message: res.data.data.message,
                                type: 'success'
                            });
                            this.getGroup()
                        }else{
                            this.$message({
                                message: res.data.error,
                                type: 'error'
                            });
                        }
                    }, (err) => {
                        console.log(err)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
//            获取分配权限页
            operate(id){
                this.id = id
                this.dialogVisible2=true
                this.$ajax.get('/api/Rule/allotRule',{params:{group_id:id}}).then((res) => {
                    if (res.data.code == '200') {
                        this.allotRule = res.data.data.rule_list
                         this.have_rule=res.data.data.have_rule
                    }
                }, (err) => {
                    console.log(err)
                })
            },

            //      分配权限保存
            save() {
                console.log(this.have_rule)
                this.$ajax.post('/api/Rule/allotRule', {group_id: this.id, rule_id: this.have_rule}).then((res) => {
                    if (res.data.code == '200') {
                        this.id=''
                        this.dialogVisible2 = false
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                    } else {
                        this.id=''
                        this.dialogVisible2 = false
                    }
                }, (err) => {
                    console.log(err)
                })
            },




//             分组添加成员查询
            addMember(id){
                    this.id = id
                    this.dialogVisible3= true
                    this.$ajax.post('/api/Rule/searchUser', {group_id: id}).then((res) => {
                        if (res.data.code == '200') {
                           this.list=res.data.data.admin
                        }
                    }, (err) => {
                        console.log(err)
                    })
            },
//            执行单个添加成员操作
            toAdd(id){
                this.$ajax.post('/api/Rule/doAdduser', {admin_id:id,group_id:this.id}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.addMember(this.id)
                    }else{
                        console.log(res.data.error)
                    }
                }, (err) => {
                    console.log(err)
                })
            },
//            批量添加成员操作
            saveAdd(){
                this.$ajax.post('/api/Rule/doAdduser', {admin_id:this.ids,group_id:this.id}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.addMember(this.id)
                    }else{
                        console.log(res.data.error)
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                //            获取所有选中行数据的id
                let ids=[]
                this.multipleSelection.map((item)=> {
                    ids.push(item.id)
                })
                this.ids=ids
            }

        },
        mounted() {
        },
        created: function () {
            this.getGroup()
        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
    }

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

    .pro {
        color: #0f8edd;
        padding: 0 10px;
    }
    .proB {
        border-left: 1px solid #bfbfbf;
        border-right: 1px solid #bfbfbf;
    }

    .model_name {
        margin-right: 10px;
    }

    .model_ul {
        box-sizing: border-box;
        border-bottom: 1px solid #e9f1f3;
    }

    .model_ul > li {
        font-size: 0;
        border: 1px solid #e9f1f3;
    }

    .model_ul_left {
        width: 150px;
        box-sizing: border-box;
        font-size: 14px;
        display: inline-block;
        padding: 20px;
        vertical-align: top;
    }

    .model_ul_right {
        width: calc(100% - 150px);
        height: 100%;
        box-sizing: border-box;
        display: inline-block;
        font-size: 14px;
        border-left: 1px solid #e9f1f3;
    }
</style>
<style>
    .el-button--small {
        border-radius: 0;
    }
</style>
