<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">APP访问数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <el-tabs v-model="status" style="min-height: 500px;">
				<el-tab-pane label="APP访问数据" name="0">
            <div class="ms-doc_main">
            	<div class="nav">
            		<div class="nav-part">
            			<p class="nav-title">昨日访问量</p>
            			<p class="nav-num">{{visitData.yesterday}}</p>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">周访问量</p>
            			<p class="nav-num">{{visitData.week}}</p>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">月访问量</p>
            			<p class="nav-num">{{visitData.month}}</p>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">累计访问量</p>
            			<p class="nav-num">{{visitData.total}}</p>
            		</div>
            	</div>
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
                   <!-- <span class="lead_out"><img src="/static/img/lead_out.png" alt="">导出当前结果</span>-->
                </div>
                <div class="ms-doc_chart" style="font-size: 0;">
                    <p class="title">访问量趋势图</p>
                    <div class="CTwoLeft" id="broken1">

                    </div>
                    <p class="pie_title" ><i style="background-color: #55ce63;"></i>日访问量</p>
                </div>
            </div>
          </el-tab-pane>
           </el-tabs>
        </div>
    </div>
</template>

<script>
    let echarts = require('echarts');
    export default {
        components: {},
        data() {
            return {
            	status:'0',
                start:'',
                end:'',
                date:[] ,
                count:[],
                visitData:{},
                options1: [{
						value: '0',
						label: '全部'
					},
					{
						value: '1',
						label: '帮众'
					},
					{
						value: '2',
						label: '长老'
					},
					{
						value: '3',
						label: '代理长老'
					},
					{
						value: '4',
						label: '帮主'
					}
				],
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
        	// app访问量-访问数据
        	getvisitData:function(){
        		this.$ajax.get("/api/appVisitCount").then((res)=>{
        			if(res.data.code=='200'){
        				this.visitData=res.data.data
        			}else if(res.data.code=="601"){
                    	this.$router.push('/login')
                    }else{
                    	this.$message({
							message: res.data.error,
							type: 'error'
						});
                    }
        		},(err)=>{
        			
        		})
        	},
            //  app访问列表---列表
            getvisitList: function () {
                this.$ajax.get('/api/appVisitList',{params:{date_start:this.start,date_end:this.end}}).then((res) => {
                    if (res.data.code == '200') {
                        this.date=res.data.data.date
                        this.count = res.data.data.count
                        this.start =res.data.data.date_start
                        this.end = res.data.data.date_end
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
                    }else if(res.data.code=="601"){
                    	this.$router.push('/login')
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
            changeDate1(e){
                this.start=e
                this.getvisitList()
            },
            changeDate2(e){
                this.end=e
                this.getvisitList()
            },
        },
        mounted() {
            var Broken1 = echarts.init(document.getElementById('broken1'));
            // 自适应
            window.onresize = function () {
                Broken1.resize();
            }
        },
        created: function () {
                this.getvisitData()
                this.getvisitList()
        }
    }
</script>

<style scoped>
	.nav{
		height: 112px;
		border: 1px solid #e9f1f3;
		display: flex;
		align-items: center;
		margin-bottom: 60px;
	}
	.nav-part{
		width: 25%;
		text-align: center;
	}
	.nav-title{
		font-size:14px;
		color: #54667a;
		margin-bottom: 10px;
	}
	.nav-num{
		font-size: 30px;
		color: #54667a;
	}
    .CTwoLeft {
        width: 100%;
        height: 400px;
        background-color: white;
        overflow: hidden;
    }

    .ms-doc{
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
