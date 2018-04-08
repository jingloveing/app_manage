<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <el-button type="primary" round
                       style="margin-bottom: 14px;" @click="dialogVisible = true">添加权限
            </el-button>
            <div class="ms-doc_main">
                <div style="width: 100%;text-align: center;font-size: 0;background-color: #f2f7f8;">
                    <div class="table_header">权限名</div>
                    <div class="table_header">操作</div>
                </div>
                <el-tree
                    :data="list"
                    :props="defaultProps"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="renderContent" style="font-size: 14px;">
                </el-tree>


            </div>
        </div>



        <!--添加权限弹出框-->
        <el-dialog
            title="添加权限"
            :visible.sync="dialogVisible"
            :before-close="handleClose" style="width: 1000px;margin: 100px auto;">
           <div>
               <p><span  class="model_name" >权限名:</span><el-input v-model="rule_name" style="width: 150px;margin: 10px 0 20px;"></el-input></p>
               <p><span  class="model_name" >连接:</span><el-input v-model="rule_mca" style="width: 150px;margin: 10px 0 20px;"></el-input> <span style="color: #a6afbb;margin-left: 10px;">输入模块/控制器/方法即可</span></p>
           </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="close1()">取 消</el-button>
    <el-button type="primary" @click="add()" >确 定</el-button>
  </span>
        </el-dialog>
        <!--添加子权限弹出框-->
        <el-dialog
            title="添加权限"
            :visible.sync="dialogVisible2"
            :before-close="handleClose" style="width: 1000px;margin: 100px auto;">
            <div>
                <p><span  class="model_name" >权限名:</span><el-input v-model="name" style="width: 150px;margin: 10px 0 20px;"></el-input></p>
                <p><span  class="model_name" >连接:</span><el-input v-model="mca" style="width: 150px;margin: 10px 0 20px;"></el-input> <span style="color: #a6afbb;margin-left: 10px;">输入模块/控制器/方法即可</span></p>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="close2()">取 消</el-button>
    <el-button type="primary" @click="add2()" >确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    let id = 1000;
    export default {
        components: {},
        data() {
            return {
                dialogVisible: false,
                dialogVisible2: false,
                list: [],
                defaultProps: {
                    children: '_data',
                    label: 'title'
                },
                rule_name:'',
                rule_mca:'',
                rule_id:'',
//                子权限
                name:'',
                mca:'',
                father_id:''

            }
        },
        methods: {
            //      获取权限列表
            getList:function(){
                this.$ajax.post('/api/Rule/index').then((res) => {
                    if (res.data.code == '200') {
                        this.list = res.data.data.list
                        console.log(this.list)
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.rule_name=''
                        this.rule_id=''
                        this.rule_mca=''
                        this.name=''
                        this.mca=''
                        this.father_id=''
                        done();
                    })
                    .catch(_ => {
                    });
            },
//            增加权限----修改权限
            add: function () {
                this.$ajax.post('/api/Rule/editRule',{rule_name:this.rule_name,rule_id:this.rule_id,rule_mca:this.rule_mca}).then((res) => {
                    if (res.data.code == '200') {
                        this.dialogVisible = false
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.rule_name=''
                        this.rule_id=''
                        this.rule_mca=''
                        this.getList()
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
//            添加子权限
            add2: function () {
                this.$ajax.post('/api/Rule/addChildRule',{rule_name:this.name,rule_id:this.father_id,rule_mca:this.mca}).then((res) => {
                    if (res.data.code == '200') {
                        this.dialogVisible2 = false
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.name=''
                        this.mca=''
                        this.father_id=''
                        this.getList()
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
            modify() {
                this.dialogVisible = true
            },

            renderContent:function(createElement, { node, data, store }) {
                var self = this;
                return createElement('span', [
                    createElement('span', node.label),
                    createElement('span', {attrs:{
                        style:"float: right; margin-right: 20px"
                    }},[
                        createElement('el-button',{attrs:{
                            size:"mini"
                        },on:{
                            click:function() {
                                self.dialogVisible2 = true
                                self.father_id=data.id
                            }
                        }},"添加子权限"),
                        createElement('el-button',{attrs:{
                            size:"mini"
                        },on:{
                            click:function() {
                                self.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    self.$ajax.post('/api/Rule/delRule',{rule_id:data.id}).then((res) => {
                                        if (res.data.code == '200') {
                                            self.dialogVisible2 = false
                                            self.$message({
                                                message: res.data.data.message,
                                                type: 'success'
                                            });
                                            self.getList()
                                        }else{
                                            self.$message({
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


                            }
                        }},"删除"),
                        createElement('el-button',{attrs:{
                            size:"mini"
                        },on:{
                            click:function() {
                                self.dialogVisible = true
                                self.rule_name=data.title
                                self.rule_id=data.id
                                self.rule_mca=data.name
                            }
                        }},"修改"),
                    ]),
                ]);
            },
            //取消按钮
            close1(){
                this.dialogVisible = false
                this.rule_name=''
                this.rule_id=''
                this.rule_mca=''
            },
            close2(){
                this.dialogVisible2 = false
                this.name=''
                this.mca=''
                this.father_id=''
            }


        },
        mounted() {
        },
        created: function () {
             this.getList()
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
        cursor: pointer;
    }
    .proB{
        border-left: 1px solid #bfbfbf;
        border-right: 1px solid #bfbfbf;
    }
    .model_name{
        width: 50px;
        text-align: right;
        display: inline-block;
        margin-right: 10px;
    }
    .table_header{
        width:50%;display: inline-block;font-size: 14px;line-height: 40px;border: 1px solid #e9f1f3;box-sizing: border-box;
    }
</style>
