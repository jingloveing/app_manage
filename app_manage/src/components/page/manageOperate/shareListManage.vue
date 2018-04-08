<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">晒单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <p class="m_title">晒单审核</p>
            <div class="ms-doc_main">
                <div>
                    <span>下单时间：</span>
                    <el-date-picker
                        v-model="start"
                        type="date"
                        placeholder="开始日期"
                        :picker-options="pickerOptions0" @change="changeDate1" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-date-picker
                        v-model="end"
                        type="date"
                        placeholder="结束日期"
                        :picker-options="pickerOptions1" @change="changeDate2" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-select v-model="is_square" placeholder="晒单状态"  style="width: 160px;margin-right: 20px;" >
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="status" placeholder="状态"  style="width: 160px;margin-right: 20px;" >
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style="background-color: #0f8edd;border-color: #0f8edd;" @click="getOrderList()">筛选</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="orderList"
                    tooltip-effect="dark"
                    style="width: 100%;text-align: center;margin: 20px 0;"
                    border
                    height="480"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="50" height="95">
                    </el-table-column>
                    <el-table-column
                        label="晒单截图" height="95" width="120">
                        <template slot-scope="scope">
                            <img :src="scope.row.evaluate_url" alt="" style="width:76px;height:76px;margin-top: 5px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="留言"
                        width="200"
                        show-overflow-tooltip>
                        <template slot-scope="scope">{{ scope.row.evaluate_detail }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="wechat_nickname"
                        label="账号ID">
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        label="时间"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="order_num"
                        label="订单号"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="晒单状态"
                        width="80">
                        <template slot-scope="scope">
                            <span v-text="scope.row.is_square=='1'?'广场中':'未展示'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态" width="70">
                        <template slot-scope="scope">
                            <span v-show="scope.row.examine_status==1">已奖励</span>
                            <span v-show="scope.row.examine_status==2">未审核</span>
                            <span v-show="scope.row.examine_status==3">未通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作" width="180">
                        <!--/奖励。。。未奖励   通过。。。不通过-->
                        <!--examine_status-->
                        <template slot-scope="scope">
                            <el-button type="text" @click="toShow(scope.row.evaluate_id)" style="color: #0f8edd;display: block;margin: 0 auto;">晒单详情</el-button>
                            <el-button @click="change(scope.row.evaluate_id,2)" type="text" size="small"
                                       class="pros" v-show="scope.row.examine_status==2">奖励
                            </el-button>
                            <el-button @click="change(scope.row.evaluate_id,3)" type="text" size="small"
                                       class="pros" v-show="scope.row.examine_status==2">不通过
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center;">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size=limit
                        layout="prev, pager, next, jumper"
                        :page-count="totalPage" style="margin-bottom: 30px;">
                    </el-pagination>
                    <el-select v-model="value3" placeholder="晒单状态"  style="width: 160px;margin-right: 20px;" >
                        <el-option
                            v-for="item in options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="type" placeholder="奖励"  style="width: 160px;margin-right: 20px;" >
                        <el-option
                            v-for="item in options4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;" @click="saveAll()">确认</el-button>
                </div>
            </div>
        </div>
        <div class="ms-doc sort">
            <p class="m_title">晒单设置</p>
            <div class="ms-doc_main">
                <div>
                    <span style="display: inline-block;width: 200px;text-align: right;">用户晒单返元宝数值设定</span>
                    <el-input v-model="acer" placeholder="请输入数值" style="width: 400px;margin:0 20px;"></el-input>元宝/单
                </div>
                <div style="margin: 30px 0;">
                    <span style="display: inline-block;width: 200px;text-align: right;float: left;">晒单规则说明</span>
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="brief" style="width: 400px;margin:0 23px;">
                    </el-input>
                </div>
                <div style="text-align: center;">
                    <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;margin-left: 50px;" @click="saveSet()">保存</el-button>

                </div>
            </div>
        </div>
        <!--模态框-->
        <el-dialog title="晒单详情" :visible.sync="dialogTableVisible">
            <div class="model_content">
                <p class="title">{{share_info.wechat_nickname}} <span class="date">{{share_info.update_time}}</span></p>
                <p class="des">{{share_info.evaluate_detail}}</p>
                <p class="title">晒单截图</p>
                <div class="imgList">
                    <img :src="list.image" alt="" v-for="list in share_info.evaluate_url">
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                page: 1,
                limit:15,
                totalPage:1,
                start: '',
                end: '',
                orderList:[],
                pickerOptions0: {
                    disabledDate: (time) => {
                        if (this.value2 != "") {
                            return time.getTime() > Date.now() || time.getTime() > this.value2;
                        } else {
                            return time.getTime() > Date.now();
                        }

                    }
                },
                pickerOptions1: {
                    disabledDate: (time) => {
                        return time.getTime() < this.value1 || time.getTime() > Date.now();
                    }
                },
                dialogTableVisible: false,
                options1: [
                    {
                    value: '',
                    label: '全部晒单状态'
                },
                    {
                        value: '1',
                        label: '广场中'
                    },{
                        value: '2',
                        label: '未展示'
                    }
                ],
                is_square:'',
                options2: [
                    {
                    value: '',
                    label: '全部审核状态'
                },{
                    value: '1',
                    label: '已奖励'
                }, {
                    value: '2',
                    label: '未审核'
                }, {
                    value: '3',
                    label: '未通过'
                }
                ],
                 status:'',
                options3: [
                    {
                    value: '',
                    label: '晒单状态处理'
                }, {
                    value: '1',
                    label: '加入广场'
                }, {
                    value: '2',
                    label: '撤出广场'
                }
                ],
                value3:'',
                options4: [
                    {
                    value: '',
                    label: '审核状态处理'
                }, {
                    value: '2',
                    label: '奖励'
                }, {
                    value: '3',
                    label: '不通过'
                }
                ],
                type:'',
                dateValue1:'',
                share_id: [],
                acer:'',
                brief:'',
                share_info:{
                        evaluate_detail:'',
                        evaluate_url:[],
                        update_time:'',
                        wechat_nickname:''
                    },
//            defaultImg: 'this.src="' +require('../../static/img/default_img.png')+ '"',
            }
        },
        methods: {
            //      获取晒单审核列表
            getOrderList: function () {
                this.$ajax.post('/api/Shareorder/getOrderList',{start:this.start,end:this.end,is_square:this.is_square,status:this.status,page:this.page,limit:this.limit}).then((res) => {
                    if (res.data.code == '200') {
                        this.orderList=res.data.data.order_list
                        this.start = res.data.data.start
                        this.end = res.data.data.end
                        this.totalPage = res.data.data.total_page
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //      获取默认晒单设置
            getSet: function () {
                this.$ajax.get('/api/Shareorder/setShareConfig',).then((res) => {
                    if (res.data.code == '200') {
                        this.acer=res.data.data.acer
                        this.brief = res.data.data.brief
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //     批量晒单设置
            saveAll: function () {
                this.$ajax.post('/api/Shareorder/examineOrder',{share_id:this.share_id,type:this.type,is_square:this.value3}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.getOrderList()

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
            //     单个晒单奖励或不通过设置
            change: function (id,type) {
                this.$ajax.post('/api/Shareorder/examineOrder',{share_id:id,type:type}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.getOrderList()

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
            //     修改晒单设置
            saveSet: function () {
                this.$ajax.post('/api/Shareorder/setShareConfig',{acer:this.acer,brief:this.brief}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.getSet()
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
            changeDate1(e) {
                this.start = e
            },
            changeDate2(e) {
                this.end = e
            },
            handleSelectionChange(val) {
                var data = []
                for (var i = 0; i < val.length; i++) {
                    data.push(val[i].evaluate_id);
                }
                this.share_id = data;
                console.log(this.share_id)
            },
            toShow(id){
                this.dialogTableVisible = true
                this.$ajax.post('/api/Shareorder/shareOrderInfo',{share_id:id}).then((res) => {
                    if (res.data.code == '200') {
                        this.share_info=res.data.data.share_info
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //            页码改变
            handleCurrentChange(val) {
//                获取当前页数的消息
                this.page = val
                this.getOrderList()
            },
        },
        mounted() {


        },
        created: function () {
          this.getSet()
            this.getOrderList()
        }
    }
</script>

<style scoped>
    .ms-doc {
        width: 100%;
        max-width: 980px;
        /*max-width: 1300px;*/
        /*font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;*/
        background-color: white;
        padding: 0 40px;
        color: #54667a;
    }

    .m_title {
        font-size: 20px;
        color: #54667a;
        line-height: 60px;
        border-bottom: 1px solid #e9f1f3;
    }

    .ms-doc_main {
        padding: 20px;
    }
    .sort{
        margin:20px 0 54px;
    }
    .title{
        font-size: 16px;
        color: #54667a;
        margin-bottom: 10px;
    }
    .date{
        margin-left: 10px;
        font-size: 14px;
        color: #afb6bd;
    }
    .des{
        font-size: 14px;
        color: #54667a;
        margin-bottom: 10px;
    }
    .imgList{
        font-size: 0;
    }
    .imgList>img{
        width: 140px;
        height: 140px;
        margin: 5px calc(((100%/4) - 140px)/2);
    }
    .pros {
        background-color: rgb(223, 236, 235);
        padding: 2px 10px;
        cursor: pointer;
        color: #54667a;
        line-height: 24px;
        margin-bottom: 3px;
    }
</style>

