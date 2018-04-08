<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">搜索数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <p class="m_title">搜索关键词统计</p>
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
                    <a class="lead_out" :href="'/api/Searchdata/weekWordsExport?start='+start+'&end='+end"><img src="/static/img/lead_out.png" alt="">导出当前结果</a>
                </div>
                <div class="ms-doc_chart" style="font-size: 0;">
                    <p class="title">一周搜索关键词TOP10</p>
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
                                label="搜索词" show-overflow-tooltip style="width: 200px;">
                                <template slot-scope="scope">
                                    <span style="margin-right: 5px;">{{scope.$index + 1}}.</span>
                                    <span>{{scope.row.keywords}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="number"
                                label="搜索次数" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="sort">
            <p class="m_title">搜索调用统计</p>
            <div class="ms-doc_main">
                <div class="date_select">
                <el-date-picker
                    v-model="dateValue2"
                    type="month"
                    placeholder="选择月" @change="changeDate1" value-format="yyyy-MM-dd">
                </el-date-picker>
                    <a class="lead_out" :href="'/api/Searchdata/monthDataExport?month='+dateValue2"><img src="/static/img/lead_out.png" alt="">导出当前结果</a>
                </div>
                <div class="ms-doc_chart" style="width: 100%;font-size: 0;">
                    <p class="title">月搜索调用统计分布</p>
                    <div id="roundOne">
                    </div>
                    <div style="width: 30%;float: right;margin: 50px 0;">
                        <ul class="pie_des">
                            <li><i style="background-color:#009efb;"></i>第一周</li>
                            <li><i style="background-color: #ff5b6b;"></i>第二周</li>
                            <li><i style="background-color: #ffa55c;"></i>第三周</li>
                            <li><i style="background-color: #fff45c;"></i>第四周</li>
                            <li><i style="background-color: #55ce63;"></i>第五周</li>
                        </ul>
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
                start:'',
                end:'',
                dateValue2: '',
                goodsDataList: [],
                total_count:'',
                total_number:'',
                data:[],
                keywords:[],
                number:[],
                right:[],
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
//            //      一周搜索关键词
            getGoodsList: function () {
                this.$ajax.post('/api/Searchdata/weekSearchTop10',{start:this.start,end:this.end}).then((res) => {
                    if (res.data.code == '200') {
                        this.keywords=res.data.data.left.keywords
                        this.number = res.data.data.left.number
                        this.right=res.data.data.right
                        this.start=res.data.data.start
                        this.end = res.data.data.end
                        var myChart = echarts.init(document.getElementById('main'));
                        // 绘制图表
                        myChart.setOption({
                            title: {text: ''},
                            tooltip: {},
                            xAxis: {
                                data: this.keywords,
                                axisLine:{
                                    //横坐标横线样式
                                    lineStyle:{
                                        type:'dotted',
                                        color:'#bac7cd'
                                    }
                                },
                                axisLabel:{
                                    textStyle:{
                                        color:'#bac7cd',//横坐标字体颜色
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
                                data: this.number,
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
            //      获取一个月数据
            getGoodsList2: function () {
                this.$ajax.post('/api/Searchdata/monthData',{month:this.dateValue2}).then((res) => {
                    if (res.data.code == '200') {
                        this.list = res.data.data.month_list
                        this.total_count=res.data.data.total_count
                        var data=[]
                        for(var i= 0;i<this.list.length;i++){
                            data.push({value:this.list[i].count,name:this.list[i].week});
                        }
                        this.data=data
                        console.log(this.data)
                        var RoundOne = echarts.init(document.getElementById('roundOne'));
                        RoundOne.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            color: ['#009efb', '#ff5b6b', '#ffa55c', '#fff45c', '#55ce63'],
                            graphic: {
                                type: 'text',
                                left: 'center',
                                top: 'center',
                                style: {
                                    text: "总计/次\n"+this.total_count,
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
                                    radius: ['150', '80',],
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
                this.dateValue2=e
                this.getGoodsList2()
            },
            changeDate2(e){
                this.start=e
                this.getGoodsList()
            },
            changeDate3(e){
                this.end=e
                this.getGoodsList()
            },
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
            this.dateValue2=year+'-'+month
            this.getGoodsList()
            this.getGoodsList2()
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
    #roundOne {
        width: 70%;
        height: 335px;
        padding: 50px 0;
        display: inline-block;
    }
    .pie_des{
        list-style: none;
        font-size: 16px;
        color: #54667a;
    }
    .pie_des li{
        line-height: 50px;
    }
    .pie_des i{
        width: 10px;
        height: 10px;
        margin-right: 20px;
        display: inline-block;
    }
</style>
