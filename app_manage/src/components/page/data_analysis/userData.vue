<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">用户数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <el-tabs v-model="status" style="min-height: 500px;" @tab-click="handleClick">
				<el-tab-pane label="用户新增数据" name="0">
            <div class="ms-doc_main">
            	<div class="nav">
            		<div class="nav-part">
            			<p class="nav-title">昨日新增人数</p>
            			<p class="nav-num">{{MemberData.yesterday}}</p>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">周新增人数</p>
            			<p class="nav-num">{{MemberData.week}}</p>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">月新增人数</p>
            			<p class="nav-num">{{MemberData.month}}</p>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">累计用户人数</p>
            			<p class="nav-num">{{MemberData.total}}</p>
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
                    <p class="title">新增用户趋势图</p>
                    <div class="CTwoLeft" id="broken1">

                    </div>
                    <p class="pie_title" ><i style="background-color: #55ce63;"></i>新增用户数</p>
                </div>
            </div>
           </el-tab-pane>
           <el-tab-pane label="用户列表" name="1">
           	  <div class="ms-doc_main">
            	<div class="nav">
            		<div class="nav-part">
            			<p class="nav-title">帮众人数</p>
            			<p class="nav-num">{{LevelData.level1}}</p>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">长老人数</p>
            			<p class="nav-num">{{LevelData.level2}}</p>
            			<span style="font-size: 12px;color: #999;margin-left: 10px;float: right;margin-top: -25px;">（代理长老 {{LevelData.agency}}）</span>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">帮主人数</p>
            			<p class="nav-num">{{LevelData.level3}}</p>
            		</div>
            		<div class="nav-part">
            			<p class="nav-title">总计用户人数</p>
            			<p class="nav-num">{{LevelData.total}}</p>
            		</div>
            	</div>
            					<el-form ref="form" label-width="83px" style="color: #848c97;">
					<el-form-item label="用户等级：" style="display: inline-block;">
						<el-select v-model="data.type" placeholder="全部" style="width: 148px;">
							<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" @click="getLevelList()">搜索
					</el-button>
				</el-form>
				<el-table ref="multipleTable" :data="levelList" tooltip-effect="dark" style="width: 100%;text-align: center;" border v-loading="loading">
					<el-table-column label="用户头像" height="95" width="80">
						<template slot-scope="scope">
							<img :src="scope.row.head_image" alt="" style="width:50px;height:50px;margin-top: 5px;">
						</template>
					</el-table-column>
					<el-table-column prop="nickname" label="名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="等级" width="110" prop="level_name">
					</el-table-column>
					<el-table-column label="财宝数(铜币)" width="110" prop="acer">
					</el-table-column>
					<el-table-column label="粉丝数" width="110" prop="fans_count">
					</el-table-column>
					<el-table-column label="消费金额" width="110">
						<template slot-scope="scope">
							￥{{scope.row.pay_money}}
						</template>
					</el-table-column>
					<el-table-column label="加入时间" width="150" prop="create_time">
					</el-table-column>
				</el-table>
            	<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;overflow: hidden;">
					<el-pagination @current-change="handleCurrentChange" :page-size=data.limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
					</el-pagination>
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
                MemberData:{},
                LevelData:{},
                levelList:[],
                totalPage:0,
                loading:false,
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
				data:{
					type:'',
					nickname:'',
					page:1,
					limit:20
				},
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
        	// 用户数据---新增用户数据
        	getMemberData:function(){
        		this.$ajax.get("/api/newMemberData").then((res)=>{
        			if(res.data.code=='200'){
        				this.MemberData=res.data.data
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
        	// 用户数据---用户列表-人数
        	getLevelData:function(){
        		this.$ajax.get("/api/levelMemberData").then((res)=>{
        			if(res.data.code=='200'){
        				this.LevelData=res.data.data
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
        	// 用户数据---用户列表
        	getLevelList:function(){
                     this.loading=true
                     this.$ajax.get("/api/levelMemberList",{
                     	params:this.data
                     }).then((res)=>{
                     	this.loading=false
        			if(res.data.code=='200'){
        				this.levelList=res.data.data.list
        				this.totalPage=res.data.data.total_page
        			}else if(res.data.code=="601"){
                    	this.$router.push('/login')
                    }else{
                    	this.$message({
							message: res.data.error,
							type: 'error'
						});
                    }
        		},(err)=>{
        			this.loading=false
        		})
        	},
        	//            页码改变
			handleCurrentChange(val) {
				//                获取当前页数的消息
				this.data.page = val
				this.getLevelList()
			},
            //  用户数据---新增用户数据---列表
            getNewList: function () {
                this.$ajax.get('/api/newMemberList',{params:{start:this.start,end:this.end}}).then((res) => {
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
                this.getNewList()
            },
            changeDate2(e){
                this.end=e
                this.getNewList()
            },
            handleClick(tab) {
				if(this.status=='0'){
					
				}else{
					this.getLevelData()
					this.getLevelList()
				}
			}
        },
        mounted() {
            var Broken1 = echarts.init(document.getElementById('broken1'));
            // 自适应
            window.onresize = function () {
                Broken1.resize();
            }
        },
        created: function () {
                this.getNewList()
                this.getMemberData()
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
