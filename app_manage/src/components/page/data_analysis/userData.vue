<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">用户数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <p class="m_title">新增用户</p>
            <div class="ms-doc_main">
                <div class="date_select">
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
                    <span class="lead_out"><img src="/static/img/lead_out.png" alt="">导出当前结果</span>
                </div>
                <div class="ms-doc_chart" style="font-size: 0;">
                    <p class="title">趋势图</p>
                    <div class="CTwoLeft" id="broken1">

                    </div>
                    <p class="pie_title" ><i style="background-color: #55ce63;"></i>新增用户数量</p>
                </div>
            </div>
        </div>
        <div class="sort">
            <p class="m_title">访客占比</p>
            <div class="ms-doc_main">
                <div class="date_select">
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
                    <span class="lead_out"><img src="/static/img/lead_out.png" alt="">导出当前结果</span>
                </div>
                <div class="ms-doc_chart" style="font-size: 0;">
                    <p class="title">趋势图</p>
                    <div class="CTwoLeft" id="broken2">

                    </div>
                    <p class="pie_title"><i style="background-color: #0f8edd;"></i>访客占比</p>
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
                start2:'',
                end2:'',
                date:[] ,
                count:[],
                time:[] ,
                percent:[],
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
            //            //     用户数据---新增用户数据
            getNewList: function () {
                this.$ajax.post('/api/Memberdata/newInsertMember',{start:this.start,end:this.end}).then((res) => {
                    if (res.data.code == '200') {
                        this.date=res.data.data.date
                        this.count = res.data.data.count
                        this.start =res.data.data.start
                        this.end = res.data.data.end
                        var Broken1 = echarts.init(document.getElementById('broken1'));
                        Broken1.setOption({
                            backgroundColor: '#fff',
                            tooltip: {
                                trigger: 'axis'
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: this.date,
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
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    axisLine:{
                                        //横坐标横线样式
                                        lineStyle:{
                                            type:'dotted',
                                            color:'#bac7cd'
                                        }
                                    },
                                    axisLabel:{
                                        formatter: '{value}',
                                        textStyle:{
                                            color:'#bac7cd' //横坐标字体颜色
                                        }
                                    }
                                }
                            ],
                            series: [
                                {
                                    smooth:false,
                                    name: '新增用户数量',
                                    type: 'line',
                                    data: this.count,
                                    itemStyle:{
                                        normal:{
                                            color:'#55ce63',//图标颜色
                                            lineStyle:{
                                                color:'#55ce63'//连线颜色
                                            }
                                        }
                                    }
                                }
                            ]
                        });
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //            //     用户数据---访客占比
            getList: function () {
                this.$ajax.post('/api/Memberdata/vistorPercent',{start:this.start2,end:this.end2}).then((res) => {
                    if (res.data.code == '200') {
                        this.time=res.data.data.time
                        this.percent = res.data.data.percent
                        this.start2 =res.data.data.start
                        this.end2 = res.data.data.end
                        var Broken2 = echarts.init(document.getElementById('broken2'));
                        Broken2.setOption({
                            backgroundColor: '#fff',
                            tooltip: {
                                trigger: 'axis'
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: this.time,
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
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    axisLine:{
                                        //横坐标横线样式
                                        lineStyle:{
                                            type:'dotted',
                                            color:'#bac7cd'
                                        }
                                    },
                                    axisLabel:{
                                        formatter: '{value}',
                                        textStyle:{
                                            color:'#bac7cd' //横坐标字体颜色
                                        }
                                    }
                                }
                            ],
                            series: [
                                {
                                    smooth:false,
                                    name: '访客占比',
                                    type: 'line',
                                    data: this.percent,
                                    itemStyle:{
                                        normal:{
                                            color:'#0f8edd',//图标颜色
                                            lineStyle:{
                                                color:'#0f8edd'//连线颜色
                                            }
                                        }
                                    }
                                }
                            ]
                        });
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            changeDate1(e){
                this.start=e
                this.getNewList()
//                console.log(e)
            },
            changeDate2(e){
                this.end=e
                this.getNewList()
            },
            changeDate3(e){
                this.start2=e
                this.getList()
            },
            changeDate4(e){
                this.end2=e
                this.getList()
            }
        },
        mounted() {
            var Broken1 = echarts.init(document.getElementById('broken1'));
            var Broken2 = echarts.init(document.getElementById('broken2'));
            // 自适应
            window.onresize = function () {
                Broken1.resize();
                Broken2.resize();
            }
        },
        created: function () {
                this.getNewList()
            this.getList()
        }
    }
</script>

<style scoped>
    .CTwoLeft {
        width: 100%;
        height: 400px;
        background-color: white;
        overflow: hidden;
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

    .date_select{
        position: relative;
    }
    .lead_out{
        position: absolute;right: 50px;top: 6px;font-size: 14px;color: #54667a;
    }
    .lead_out img{
        margin:0 10px -3px 0;width: 16px;height: 18px;
    }
    .pie_title{
        text-align: center;font-size: 18px;margin-bottom: 30px;
    }
    .pie_title i{
        margin-right: 20px; display: inline-block;width: 10px;height: 10px;border-radius: 50%;
    }
</style>
