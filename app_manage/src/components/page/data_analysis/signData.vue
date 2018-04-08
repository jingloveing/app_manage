<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">签到数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc sort">
            <p class="m_title">签到次数</p>
            <div class="ms-doc_main">
                <div class="date_select">
                    <el-date-picker
                    v-model="start"
                    type="date"
                    placeholder="开始日期"
                    :picker-options="pickerOptions0" @change="changeDate4" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-date-picker
                    v-model="end"
                    type="date"
                    placeholder="结束日期"
                    :picker-options="pickerOptions1" @change="changeDate5" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <a class="lead_out" :href="'/api/Signdata/signDataExport?start='+start+'&end='+end"><img src="/static/img/lead_out.png" alt="">导出当前结果</a>
                </div>
                <div class="ms-doc_chart" style="font-size: 0;">
                    <p class="title">签到趋势图</p>
                    <div class="CTwoLeft" id="broken1">

                    </div>
                    <p class="pie_title" ><i style="background-color: #55ce63;"></i>每天签到次数</p>
                </div>
            </div>
        </div>
        <div class="sort">
            <p class="m_title">签到对比分析</p>
            <div class="ms-doc_main">
                <div class="date_select">
                <el-date-picker
                    v-model="dateValue1"
                    type="month"
                    placeholder="选择月" @change="changeDate1" value-format="yyyy-MM-dd">
                </el-date-picker>
                <!--<span class="lead_out"><img src="/static/img/lead_out.png" alt="">导出当前结果</span>-->
                </div>
                <div class="ms-doc_chart" style="font-size: 0;">
                    <p class="title">月签到对比分析</p>
                    <div class="TwoTab" id="main">

                    </div>
                    <ul class="pie_des bar_des">
                        <li><i style="background-color:#009efb; "></i>第一周</li>
                        <li><i style="background-color: #55ce63;"></i>第二周</li>
                        <li><i style="background-color: #fff45c;"></i>第三周</li>
                        <li><i style="background-color: #ffa55c;"></i>第四周</li>
                        <li><i style="background-color: #ff5b6b;"></i>第五周</li>
                    </ul>
                </div>
            </div>
            <div  class="ms-doc_main">
                <div class="date_select">
                    <div class="date_select">
                    <el-date-picker
                        v-model="dateValue2"
                        type="month"
                        placeholder="选择月" @change="changeDate2" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!--<span class="lead_out"><img src="/static/img/lead_out.png" alt="">导出当前结果</span>-->
                    </div>
                </div>
                <table>
                    <tr>
                        <th></th>
                        <th>星期一</th>
                        <th>星期二</th>
                        <th>星期三</th>
                        <th>星期四</th>
                        <th>星期五</th>
                        <th>星期六</th>
                        <th>星期日</th>
                        <th>总计</th>
                    </tr>
                    <tr>
                        <th>第一周</th>
                        <td v-for="list in month_list2.week0.week_list">{{list}}</td>
                        <td>{{month_list2.week0.week_count}}</td>
                    </tr>
                    <tr>
                        <th>第二周</th>
                        <td v-for="list in month_list2.week1.week_list">{{list}}</td>
                        <td>{{month_list2.week1.week_count}}</td>
                    </tr>
                    <tr>
                        <th>第三周</th>
                        <td v-for="list in month_list2.week2.week_list">{{list}}</td>
                        <td>{{month_list2.week2.week_count}}</td>
                    </tr>
                    <tr>
                        <th>第四周</th>
                        <td v-for="list in month_list2.week3.week_list">{{list}}</td>
                        <td>{{month_list2.week3.week_count}}</td>
                    </tr>
                    <tr>
                        <th>第五周</th>
                        <td v-for="list in month_list2.week4.week_list">{{list}}</td>
                        <td>{{month_list2.week4.week_count}}</td>
                    </tr>
                    <tr>
                        <th>总计</th>
                        <td v-for="num in week_total">{{num}}</td>
                        <td>{{total_count}}</td>
                    </tr>

                </table>
            </div>
        </div>
        <div class="sort">
            <p class="m_title">签到分布分析</p>
            <div class="ms-doc_main">
                <div class="date_select">
                <el-date-picker
                    v-model="dateValue3"
                    type="month"
                    placeholder="选择月" @change="changeDate3" value-format="yyyy-MM-dd">
                </el-date-picker>
                <!--<span class="lead_out"><img src="/static/img/lead_out.png" alt="">导出当前结果</span>-->
                </div>
                <div class="ms-doc_chart" style="width: 100%;font-size: 0;">
                    <p class="title">月签到数据分析</p>
                    <div id="roundOne">
                    </div>
                    <div style="width: 30%;float: right;margin: 50px 0;">
                        <ul class="pie_des">
                            <li><i style="background-color:#009efb; "></i>第一周</li>
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
                date:[],
                count:[],
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
                dateValue1: '',
                dateValue2: '',
                dateValue3: '',
                goodsDataList: [],
//                month_list1:{},
//                month_list2:{},
//                month_list3:{},
                month_list1:{
                    week0:{
                        "week_list":[]
                    },
                    week1:{
                        "week_list":[]
                    },
                    week2:{
                        "week_list":[]
                    },
                    week3:{
                        "week_list":[]
                    },
                    week4:{
                        "week_list":[]
                    }
                },
                month_list2:{
                    week0:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                    week1:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                    week2:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                    week3:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                    week4:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                },
                month_list3:{
                    week0:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                    week1:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                    week2:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                    week3:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    },
                    week4:{
                        "week_list":[],
                        week_count:'',
                        week_percent:''
                    }
                },
                week_total:[],
                total_count:'',
                total_count2:'',
                data:[],
            }
        },
        methods: {
            //            获取一直签到情况
            getWeekSign:function(){
                this.$ajax.post('/api/Sign/weekSign',{start:this.start,end:this.end}).then((res)=>{
                    if (res.data.code == '200'){
                        this.start=res.data.data.start
                        this.end=res.data.data.end
                        this.date=res.data.data.date
                        this.count =res.data.data.count
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
                                    name: '签到次数',
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
                    }else{

                    }
                },(err)=>{
                    console.log(err)
                })
            },
//            签到数据分析
            getMonthData1:function(){
                this.$ajax.post('/api/Signdata/monthData',{month:this.dateValue1}).then((res)=>{
                    if (res.data.code == '200'){
                       this.month_list1=res.data.data.month_list
                        var myChart = echarts.init(document.getElementById('main'));
                        // 绘制图表
                        myChart.setOption({
                            title: {text: ''},
                            tooltip: {},
                            xAxis: {
                                data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
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
                            series: [
                                {
                                    name: '',
                                    type: 'bar',
                                    data: this.month_list1.week0.week_list,
                                    itemStyle: {
                                        normal: {
                                            color: '#0091fb',
                                        }
                                    },
                                    barWidth: '15',
                                },
                                {
                                    name: '',
                                    type: 'bar',
                                    data: this.month_list1.week1.week_list,
                                    itemStyle: {
                                        normal: {
                                            color: '#55ce63',
                                        }
                                    },
                                    barWidth: '15',
                                },
                                {
                                    name: '',
                                    type: 'bar',
                                    data: this.month_list1.week2.week_list,
                                    itemStyle: {
                                        normal: {
                                            color: '#fff45c',
                                        }
                                    },
                                    barWidth: '15',
                                },
                                {
                                    name: '',
                                    type: 'bar',
                                    data: this.month_list1.week3.week_list,
                                    itemStyle: {
                                        normal: {
                                            color: '#ffa55c',
                                        }
                                    },
                                    barWidth: '15',
                                },
                                {
                                    name: '',
                                    type: 'bar',
                                    data: this.month_list1.week4.week_list,
                                    itemStyle: {
                                        normal: {
                                            color: '#ff5b6b',
                                        }
                                    },
                                    barWidth: '15',
                                }
                            ]
                        });
                    }else{

                    }
                },(err)=>{
                    console.log(err)
                })
            },
            //            签到数据分析
            getMonthData2:function(){
                this.$ajax.post('/api/Signdata/monthData',{month:this.dateValue2}).then((res)=>{
                    if (res.data.code == '200'){
                        this.month_list2=res.data.data.month_list
                        this.week_total=res.data.data.week_total
                        this.total_count=res.data.data.total_count
                    }else{

                    }
                },(err)=>{
                    console.log(err)
                })
            },
            //            签到数据分析
            getMonthData3:function(){
                this.$ajax.post('/api/Signdata/monthData',{month:this.dateValue3}).then((res)=>{
                    if (res.data.code == '200'){
                        this.month_list3=res.data.data.month_list
                        this.total_count2=res.data.data.total_count
                        this.data = res.data.data.week_count_arr
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
                                    text: "总计/次\n"+this.total_count2,
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
                    }else{

                    }
                },(err)=>{
                    console.log(err)
                })
            },
            changeDate1(e){
                this.dateValue1=e
                this.getMonthData1()
            },
            changeDate2(e){
                this.dateValue2=e
                this.getMonthData2()
            },
            changeDate3(e){
                this.dateValue3=e
                this.getMonthData3()
            },
            changeDate4(e){
                this.start=e
                this.getWeekSign()
            },
            changeDate5(e){
                this.end=e
                this.getWeekSign()
            },
        },
        mounted() {
            var Broken1 = echarts.init(document.getElementById('broken1'));
            var myChart = echarts.init(document.getElementById('main'));
            var RoundOne = echarts.init(document.getElementById('roundOne'));
            window.onresize = function () {
                myChart.resize();
                RoundOne.resize();
                Broken1.resize()
            }
        },
        created: function () {
            //            获取当前年月日
            var date=new Date;
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            this.dateValue1=year+'-'+month
            this.dateValue2=year+'-'+month
            this.dateValue3=year+'-'+month
            this.getMonthData1()
            this.getMonthData2()
            this.getMonthData3()
            this.getWeekSign()
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
    .pie_title{
        text-align: center;font-size: 18px;margin-bottom: 30px;
    }
    .pie_title i{
        margin-right: 20px; display: inline-block;width: 10px;height: 10px;border-radius: 50%;
    }
    .TwoTab {
        width: 100%;
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
    .bar_des{
        text-align: center;
    }
    .bar_des li{
        display: inline-block;
        margin-right: 20px;
    }
    table,th,td{
        border: 1px solid #e9f1f3;
       border-collapse: collapse;
    }
    th{
        font-weight: normal;
    }
    table{
        width: 100%;
        margin-bottom: 40px;
        margin-top:16px;
    }
    th,td{
        text-align: center;
        width: calc(100%/9);
        height: 50px;
    }
</style>

