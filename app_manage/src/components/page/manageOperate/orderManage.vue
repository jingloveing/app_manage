<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <p class="m_title">兑换商城订单</p>
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
                    <el-select v-model="goods_type" placeholder="类型" style="width: 160px;">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="express_type" placeholder="状态" style="width: 160px;margin-right: 20px;">
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
                        height="95">
                    </el-table-column>
                    <el-table-column
                        label="商品" height="95" width="120">
                        <template slot-scope="scope">
                            <img :src="scope.row.product_image" alt="" style="width:76px;height:76px;margin-top: 5px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="标题"
                        width="180"
                        show-overflow-tooltip>
                        <template slot-scope="scope">{{ scope.row.product_name }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="exchange_num"
                        label="数量" >
                    </el-table-column>
                    <el-table-column
                        prop="wechat_nickname"
                        label="兑换ID"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="exchange_time"
                        label="下单时间"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="预留信息" width="150" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <!--1-充值，2-提现，3-实物-->
                            <span v-show="scope.row.goods_type==1">{{scope.row.telephone}}</span>
                            <span v-show="scope.row.goods_type==2">{{scope.row.alipay}}</span>
                            <span v-show="scope.row.goods_type==3">
                            <p style="text-align: left;">收件人:{{scope.row.address.person_name}} </p>
                             <p style="text-align: left;"> 电话:{{scope.row.address.telephone}}</p>
                        <p style=" text-align: left;white-space:nowrap;text-overflow:ellipsis;width: 130px;">{{scope.row.address.province}}{{scope.row.address.country}}{{scope.row.address.district}}{{scope.row.address.address}}</p>
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        show-overflow-tooltip width="70">
                        <template slot-scope="scope">
                            <span v-show="scope.row.express_status==1">未发货</span>
                            <span v-show="scope.row.express_status==2">已发货</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作" width="70">
                        <template slot-scope="scope">
                            <el-button @click="diliver(scope.row.order_id)" type="text" size="small"
                                       class="pros" v-show="scope.row.express_status==1">发货
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center;">
                    <el-pagination
                        @current-change="handleCurrentChange1"
                        :page-size=limit
                        layout="prev, pager, next, jumper"
                        :page-count="totalPage1" style="margin-bottom: 30px;">
                    </el-pagination>
                    <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;" @click="diliver(order_id)">一键发货
                    </el-button>
                </div>
            </div>
        </div>
        <div class="ms-doc sort">
            <p class="m_title">返利订单审核</p>
            <div class="ms-doc_main">
                <div>
                    <span>下单时间：</span>
                    <el-date-picker
                        v-model="start2"
                        type="date"
                        placeholder="开始日期"
                        :picker-options="pickerOptions0" @change="changeDate3" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-date-picker
                        v-model="end2"
                        type="date"
                        placeholder="结束日期"
                        :picker-options="pickerOptions1" @change="changeDate4" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-select v-model="status" placeholder="状态" style="width: 160px;margin-right: 20px;">
                        <el-option
                            v-for="item in options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click=" getList()">筛选</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="list"
                    tooltip-effect="dark"
                    style="width: 100%;text-align: center;margin: 20px 0;"
                    border
                    height="480"
                    @selection-change="handleSelectionChange2">
                    <el-table-column
                        type="selection"
                        width="50" height="95">
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--label="商品" height="95" width="120">-->
                        <!--<template slot-scope="scope">-->
                            <!--<img :src="scope.row.pict_url" alt="" style="width:76px;height:76px;margin-top: 5px;">-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--label="标题"-->
                        <!--width="180"-->
                        <!--show-overflow-tooltip>-->
                        <!--<template slot-scope="scope">{{ scope.row.title }}</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="wechat_nickname"
                        label="账号ID" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="order_num"
                        label="订单号"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        label="时间"  width="100">
                    </el-table-column>
                    <el-table-column
                        prop="back_status"
                        label="状态">
                        <template slot-scope="scope">
                            <span v-show="scope.row.back_status==1">已返</span>
                            <span v-show="scope.row.back_status==2">未返</span>
                            <span v-show="scope.row.back_status==3">未通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="back_acer"
                        label="返元宝值"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button @click="orderOperate(scope.row.order_num,1)" type="text" size="small"
                                                   class="pros" v-show="scope.row.back_status==2">奖励
                        </el-button>
                            <el-button @click="orderOperate(scope.row.order_num,2)" type="text" size="small"
                                       class="pros" v-show="scope.row.back_status==2">不通过
                            </el-button>
                            <el-button type="text" size="small"
                                       class="pros" v-show="scope.row.back_status==1">已奖励
                            </el-button>
                            <el-button type="text" size="small"
                                       class="pros" v-show="scope.row.back_status==3">未通过
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center;">
                    <el-pagination
                        @current-change="handleCurrentChange2"
                        :page-size=limit
                        layout="prev, pager, next, jumper"
                        :page-count="totalPage2" style="margin-bottom: 30px;">
                    </el-pagination>
                    <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;" @click="orderOperate(order_num,1)">一键奖励
                    </el-button>
                    <el-button type="danger" round style="background-color: #ff5b6b;border-color: #ff5b6b;" @click="orderOperate(order_num,2)">不通过
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
                page1: 1,
                page2:1,
                limit:15,
                totalPage1:1,
                totalPage2:1,
                start: '',
                end: '',
                start2: '',
                end2: '',
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
                orderList: [],
                options1: [
                    {
                        value: '0',
                        label: '全部商品'
                    },
                    {
                        value: '1',
                        label: '虚拟'
                    }, {
                        value: '2',
                        label: '实物'
                    }
                ],
                goods_type: '0',
                options2: [
                    {
                        value: '0',
                        label: '全部状态'
                    }, {
                        value: '1',
                        label: '未发货'
                    }, {
                        value: '2',
                        label: '已发货'
                    }
                ],
                express_type: '0',
                options3: [
                    {
                        value: '0',
                        label: '全部状态'
                    }, {
                        value: '1',
                        label: '已返'
                    }, {
                        value: '2',
                        label: '未返'
                    }, {
                        value: '3',
                        label: '未通过'
                    }
                ],
                status:'0',
                order_id:[],
                list:[],
                order_num:[]
            }
        },
        methods: {
            //      获取商品列表列表
            getOrderList: function () {
                this.$ajax.post('/api/Order/orderList', {start:this.start,end:this.end,goods_type:this.goods_type,express_type:this.express_type,page:this.page1,limit:this.limit}).then((res) => {
                    if (res.data.code == '200') {
                        this.orderList = res.data.data.order_list
                        this.start = res.data.data.start
                        this.end = res.data.data.end
                        this.totalPage1=res.data.data.total_page
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //      获取返利订单审核订单列表
            getList: function () {
                this.$ajax.post('/api/Order/backOrderList', {start:this.start2,end:this.end2,status:this.status,page:this.page2,limit:this.limit}).then((res) => {
                    if (res.data.code == '200') {
                        this.list = res.data.data.order_list
                        this.start2 = res.data.data.start
                        this.end2 = res.data.data.end
                        this.totalPage2=res.data.data.total_page
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //      发货
            diliver: function (id) {
                this.$ajax.post('/api/Order/diliver', {order_id:id}).then((res) => {
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
            //      操作：奖励或不通过
            orderOperate: function (id,status) {
                this.$ajax.post('/api/Order/examineOrder', {order_num:id,status:status}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
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
            handleSelectionChange(val) {
                var data = []
                for (var i = 0; i < val.length; i++) {
                    data.push(val[i].order_id);
                }
                this.order_id = data;
            },
            handleSelectionChange2(val) {
                var data = []
                for (var i = 0; i < val.length; i++) {
                    data.push(val[i].order_num);
                }
                this.order_num = data;
                console.log(this.order_num)
            },
            changeDate1(e) {
                this.start = e
            },
            changeDate2(e) {
                this.end = e
            },
            changeDate3(e) {
                this.start2 = e
            },
            changeDate4(e) {
                this.end2 = e
            },
            //            页码改变
            handleCurrentChange1(val) {
//                获取当前页数的消息
                this.page1 = val
                this.getOrderList()
            },
            //            页码改变
            handleCurrentChange2(val) {
//                获取当前页数的消息
                this.page2 = val
                this.getList()
            },
        },
        mounted() {


        },
        created: function () {
            this.getOrderList()
            this.getList()
        }
    }
</script>

<style scoped>
    .ms-doc {
        width: 100%;
        max-width: 980px;
        /*max-width: 1300px;*/
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

    .sort {
        margin: 20px 0 54px;
    }
    .pros {
        background-color: rgb(223, 236, 235);
        padding: 0 10px;
        cursor: pointer;
        color: #54667a;
        line-height: 24px;
    }
</style>
