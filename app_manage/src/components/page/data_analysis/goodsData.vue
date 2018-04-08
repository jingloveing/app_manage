<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">商品数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <p class="m_title">商品浏览量统计</p>
            <div class="ms-doc_main">
                <div class="date_select">
                <el-date-picker
                    v-model="dateValue1"
                    type="month"
                    placeholder="选择月" @change="changeDate1" value-format="yyyy-MM-dd">
                </el-date-picker>
                    <!--<router-link :to="{path:'api/Goodsdata/export1',params:{month:dateValue1}}">-->
                        <!--<span class="lead_out"><img src="/static/img/lead_out.png" alt="">导出当前结果</span>-->
                    <!--</router-link>-->
                <a class="lead_out" :href="'/api/Goodsdata/export1?month='+dateValue1"><img src="/static/img/lead_out.png" alt="">导出当前结果</a>
                </div>
                <div class="ms-doc_chart" style="font-size: 0;">
                    <p class="title">每月商品类目浏览量TOP10</p>
                    <div class="TwoTab" id="main">

                    </div>
                    <div style="width: 30%;display: inline-block;">
                        <p style="text-align:center;font-size: 18px;color: #54667a;border-bottom: 1px solid #e9f1f3;display: block;width: 110px;margin: 0 auto 10px;padding-bottom: 10px;">
                            详细数据</p>
                        <el-table
                            :data="right"
                            border
                            style="width: 250px;margin: 0 auto 30px;" height="400">
                            <el-table-column
                                label="名称" show-overflow-tooltip style="width: 200px;">
                                <template slot-scope="scope">
                                    <span style="vertical-align: middle;margin-right: 5px;">{{scope.$index + 1}}</span>
                                    <span>{{scope.row.cate_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="total_number"
                                label="浏览量" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="sort">
            <p class="m_title">商品取调量统计 <small style="font-size: 12px;color: #a6afbb;margin-left: 10px;">商品点击量占比</small></p>
            <div class="ms-doc_main">
                <div class="date_select">
                <el-date-picker
                    v-model="start"
                    type="date"
                    placeholder="开始日期"
                    :picker-options="pickerOptions0" @change="changeDate2" value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                    v-model="end"
                    type="date"
                    placeholder="结束日期"
                    :picker-options="pickerOptions1" @change="changeDate3" value-format="yyyy-MM-dd">
                </el-date-picker>
                <a class="lead_out" :href="'/api/Goodsdata/export2?start='+start+'&end='+end"><img src="/static/img/lead_out.png" alt="">导出当前结果</a>
                </div>
                <div class="ms-doc_chart" style="width: 100%;font-size: 0;">
                    <p class="title">TOP10商品取调统计分析</p>
                    <div id="roundOne">
                    </div>
                    <div style="width: 40%;display: inline-block;height: 435px;">
                        <p style="text-align:center;font-size: 18px;color: #54667a;border-bottom: 1px solid #e9f1f3;display: block;width: 110px;margin: 0 auto 10px;padding-bottom: 10px;">
                            详细数据</p>
                        <el-table
                            :data="list"
                            border
                            style="width: 358px;margin: 0 auto;" height="400">
                            <el-table-column
                                label="类别" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span style="vertical-align: middle;margin-right: 5px;">{{scope.$index + 1}}</span>
                                    <span>{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="number"
                                label="数量" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="percent"
                                label="百分比" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let echarts = require('echarts');
    export default {
        components: {},
        data() {
            return {
                dateValue1: '',
                start:'',
                end:'',
               type_data:[],
                right:[],
                list:[],
                total_number:'',
                data:[],
                value1:'',
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
            }
        },
        methods: {
            //      获取商品类目数据
            getGoodsList: function (e) {
                this.$ajax.post('/api/Goodsdata/productTypeData',{ month:e}).then((res) => {
                    if (res.data.code == '200') {
                        this.cate_name=res.data.data.left.cate_name
                        this.total_number = res.data.data.left.total_number
                        this.right=res.data.data.right
                        var myChart = echarts.init(document.getElementById('main'));
                        // 绘制图表
                        myChart.setOption({
                            title: {text: ''},
                            tooltip: {},
                            xAxis: {
                                data: this.cate_name,
                                axisLine:{
                                    //横坐标横线样式
                                    lineStyle:{
                                        type:'dotted',
                                        color:'#bac7cd'
                                    }
                                },
                                axisLabel:{
                                    textStyle:{
                                        color:'#bac7cd' //横坐标字体颜色
                                    }
                                }
                            },
                            yAxis: {
                                axisLine:{
                                    //横坐标横线样式
                                    lineStyle:{
                                        type:'dotted',
                                        color:'#bac7cd'
                                    }
                                },
                                axisLabel:{
                                    textStyle:{
                                        color:'#bac7cd' //横坐标字体颜色
                                    }
                                }
                            },
                            series: [{
                                name: '',
                                type: 'bar',
                                data: this.total_number,
                                itemStyle: {
                                    normal: {
                                        color: '#ff5d6d',
                                    }
                                },
                                barWidth: '40',
                            }]
                        });
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //      获取商品数据
            getGoodsList2: function (e) {
                this.$ajax.post('/api/Goodsdata/productData',{ start:this.start,end:this.end}).then((res) => {
                    if (res.data.code == '200') {
                        this.list = res.data.data.list
                        this.total_number=res.data.data.total_number
                        var data=[]
                        for(var i= 0;i<this.list.length;i++){
                            data.push({value:this.list[i].number,name:this.list[i].title});
                        }
                        this.data=data
                        var RoundOne = echarts.init(document.getElementById('roundOne'));
                        RoundOne.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            color: ['#009efb', '#ff5b6d', '#ffa55c', '#fff45c', '#55ce63', '#6a5bff', '#1badcb', '#ff8994', '#272828', '#afbec5', '#efbec5', '#eff3f6', '#0f8edd'],
                            graphic: {
                                type: 'text',
                                left: 'center',
                                top: 'center',
                                style: {
                                    text: "总计/次\n"+this.total_number,
                                    textAlign: 'center',
                                    fill: '#000',
                                    width: 30,
                                    height: 30,
                                    fontSize: '18'
                                }
                            },
                            calculable: true,
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['150', '100',],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                show: false
                                            }
                                        },
                                        emphasis: {
                                            label: {
                                                show: false,
                                            }
                                        }
                                    },
                                    data: this.data
                                }
                            ]
                        });

                    }
                }, (err) => {
                    console.log(err)
                })
            },
            changeDate1(e){
                this.dateValue1=e
               this.getGoodsList(e)
                console.log(e)
            },
            changeDate2(e){
                this.start=e
                this.getGoodsList2()
            },
            changeDate3(e){
                this.end=e
                this.getGoodsList2()
            },
//            export1:function(){
//                this.$ajax.get('api/Goodsdata/export1',{month:"2017-11"}).then((res)=>{
//                    console.log(res.data)
//                },(err)=>{
//
//                })
//            }
        },
        mounted() {
            var myChart = echarts.init(document.getElementById('main'));
            var RoundOne = echarts.init(document.getElementById('roundOne'));
//            // 自适应
            window.onresize = function () {
                myChart.resize();
                RoundOne.resize();
            }
        },
        created: function () {
//            获取当前年月日
            var date=new Date;
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day = date.getDate()
            this.dateValue1=year+'-'+month
            this.start=year+'-'+month+'-01'
            this.end=year+'-'+month+'-'+day
            this.getGoodsList(this.dateValue1)
            this.getGoodsList2(this.start,this.end)
        }
    }
</script>

<style scoped>
    .TwoTab {
        width: 70%;
        height: 400px;
        background-color: white;
        overflow: hidden;
        display: inline-block;
    }

    .ms-doc, .sort {
        /*width: 100%;*/
        max-width: 980px;
        /*max-width: 1300px;*/
        background-color: white;
        padding: 0 40px;
        color: #54667a;
    }

    .sort {
        margin: 20px 0 54px;
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

    .ms-doc_chart {
        border: 1px solid #e9f1f3;
        margin: 16px 0;
    }

    .title {
        font-size: 18px;
        border-left: 4px solid #abbbc2;
        padding-left: 20px;
        margin-left: 24px;
        margin-top: 22px;
        line-height: 18px;
    }

    .list_r1 {
        height: 100%;
        font-size: 16px;
        color: #525c65;
        margin: 40px 80px 0;
        display: block;
    }

    .list_r1 td {
        line-height: 25px;
    }

    .list_r1 td {
        display: inline-block;
    }

    .list_r1 tr td:nth-child(odd) {
        width: 60%;
    }

    .list_r1 tr td:nth-child(even) {
        width: 40%;
        text-align: right;
    }

    .list_r1 caption {
        font-size: 18px;
        color: #54667a;
        padding: 0 80px;
    }

    .top {
        color: #ff5b6b;
    }

    #roundOne {
        width: 60%;
        height: 335px;
        padding: 50px 0;
        display: inline-block;
    }
</style>
