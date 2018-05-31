<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">发货管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="status" style="min-height: 500px;" @tab-click="handleClick">
				<el-tab-pane :label="'待发货订单('+total_count+')'" name="0">
					<el-form ref="form" label-width="83px" style="color: #848c97;margin-top: 15px;">
						<el-form-item label="商品类型：">
							<el-select placeholder="全部" style="width: 148px;" v-model="level">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-button type="primary" @click="getList()">搜索
						</el-button>
					</el-form>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-top: 12px;border-bottom: 0;">
						<el-button type="primary" round @click="deliver()">批量发货</el-button>
					</div>
					<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange" v-loading="loading">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="商品" height="95" width="80">
							<template slot-scope="scope">
								<img :src="scope.row.pict_url" alt="" style="width:50px;height:50px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="商品详情">
							<template slot-scope="scope">
								<p class="order-des">
									{{ scope.row.product_name }}
								</p>
								<p class="order-des">商品数量：<span>x{{scope.row.buy_number}}</span></p>
							</template>
						</el-table-column>
						<el-table-column label="订单信息">
							<template slot-scope="scope">
								<div style="padding: 10px;">
									<p class="order-des">买家昵称：<span>{{scope.row.consignee}}</span></p>
									<p class="order-des">收货信息：<span>{{scope.row.province}}{{scope.row.city}}{{scope.row.country}}{{scope.row.address}}</span></p>
									<p class="order-des">订单编号：<span>{{scope.row.order_sn}}</span></p>
									<p class="order-des">创建时间：<span>{{scope.row.create_time}}</span></p>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="快递信息" width="300">
							<template slot-scope="scope">
								<el-form ref="form" label-width="83px" style="color: #848c97;">
									<el-form-item label="快递公司：">
										<el-select placeholder="全部" style="width: 148px;" v-model="scope.row.express_name">
											<el-option v-for="item in expressList" :key="item.express_ma" :label="item.express_name" :value="item.express_ma">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="快递单号：">
										<input type="text" class="product_name" v-model="scope.row.express_sn">
									</el-form-item>
								</el-form>

							</template>
						</el-table-column>
						<el-table-column label="操作" width="80">
							<template slot-scope="scope">
								<el-button @click="deliver(scope.row.id)" type="text" size="small" class="pros">发货
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;">
						<el-button type="primary" @click="deliver()">批量发货</el-button>
						<el-pagination @current-change="handleCurrentChange" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="已发货订单" name="1">
					<el-form ref="form" label-width="83px" style="color: #848c97;margin-top: 15px;margin-bottom: 12px;" v-loading="loading">
						<el-form-item label="商品类型：">
							<el-select placeholder="全部" style="width: 148px;" v-model="level">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-button type="primary" @click="getList()">搜索
						</el-button>
					</el-form>
					<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="商品" height="95" width="80">
							<template slot-scope="scope">
								<img :src="scope.row.pict_url" alt="" style="width:50px;height:50px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="商品详情">
							<template slot-scope="scope">
								<p class="order-des">
									{{ scope.row.product_name }}
								</p>
								<p class="order-des">商品数量：<span>x{{scope.row.buy_number}}</span></p>
							</template>
						</el-table-column>
						<el-table-column label="订单信息">
							<template slot-scope="scope">
								<div style="padding: 10px;">
									<p class="order-des">买家昵称：<span>{{scope.row.consignee}}</span></p>
									<p class="order-des">收货信息：<span>{{scope.row.province}}{{scope.row.city}}{{scope.row.country}}{{scope.row.address}}</span></p>
									<p class="order-des">订单编号：<span>{{scope.row.order_sn}}</span></p>
									<p class="order-des">创建时间：<span>{{scope.row.create_time}}</span></p>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="快递信息" width="230">
							<template slot-scope="scope">
								<p class="order-des">快递公司：<span>{{scope.row.express_name}}</span></p>
								<p class="order-des">快递单号：<span>{{scope.row.express_sn}}</span></p>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
						<el-pagination @current-change="handleCurrentChange" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
			<div class="ms-doc_main">

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				page: 1,
				limit: 20,
				totalPage: 1,
				list: [],
				product_id: [],
				status: "0",
				level:'',
				total_count: 0,
				msg: '',
				id: '',
				options: [{
						value: '',
						label: '全部'
					},
					{
						value: '1',
						label: '长老特供'
					},
					{
						value: '2',
						label: '帮主特供'
					}
				],
				expressList:[],
				data: {
						id:'',
						express_ma:'',
						express_name:'',
						express_sn:''
					},
				loading:false,
			}
		},
		methods: {
			//获取发货管理列表
			getList: function() {
				this.loading=true
				this.$ajax.get('/api/deliverList', {
					params: {
						status: this.status,
						level:this.level,
						page: this.page,
						limit: this.limit
					}
				}).then((res) => {
					this.loading=false
					if(res.data.code == '200') {
						this.list = res.data.data.list
						this.totalPage = res.data.data.total_page
						this.total_count = res.data.data.total_count
					} else if(res.data.code == "601") {
						this.$router.push('/login')
					} else {
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				}, (err) => {
					this.loading=false
					console.log(err)
				})
			},
			//获取快递公司列表
			getExpressList: function() {
				this.$ajax.get('/api/expressList').then((res) => {
					if(res.data.code == '200') {
						this.expressList=res.data.data
					} else if(res.data.code == "601") {
						this.$router.push('/login')
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
			//发货
			deliver(id){
				this.loading=true
				if(id){
					this.data.id=[id]
				}else{
					this.data.id=this.product_id
				}
				this.$ajax.post('/api/doDeliver',this.data).then((res)=>{
					this.loading=false
					if(res.data.code=="200"){
						this.$message({
							message: res.data.data.message,
						});
					}else if(res.data.code=='601'){
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
			//页码改变
			handleCurrentChange(val) {
				// 获取当前页数的消息
				this.page = val
				this.getList()
			},
			handleSelectionChange(val) {
				var data = []
				for(var i = 0; i < val.length; i++) {
					data.push(val[i].id);
				}
				this.product_id = data;
			},
			handleClick(tab) {
				this.level=""
				this.getList()
			}
		},
		mounted() {

		},
		created: function() {
			this.getList()
			this.getExpressList()
		}
	}
</script>

<style scoped>
	.sort {
		margin: 20px 0 54px;
	}
	
	.imgList {
		font-size: 0;
		margin: 20px 0;
	}
	
	.tab {
		width: 130px;
		height: 132px;
		margin: 5px 3px;
		border: 1px solid #e9f1f3;
		text-align: center;
		box-sizing: border-box;
		position: relative;
	}
	
	.model_title {
		font-size: 16px;
		color: #54667a;
		margin-bottom: 24px;
	}
	
	.model_title small {
		font-size: 12px;
		color: #a6afbb;
		margin-left: 20px;
	}
	
	.model_name {
		font-size: 14px;
		color: #54667a;
	}
	
	.pros {
		padding: 0 10px;
		cursor: pointer;
		color: #0f8edd;
		line-height: 24px;
	}
	
	.order-des {
		text-align: left;
		margin-bottom: 6px;
	}
	
	.order-des span {
		color: #999;
	}
	
	.product_name {
		height: 28px;
		line-height: 28px;
		border-radius: 4px;
		outline: none;
		border: 1px solid rgb(191, 217, 216);
		width: 148px;
		padding: 0 10px;
		box-sizing: border-box;
	}
</style>
<style>
	/*按钮样式*/
	
	.el-button {
		height: 28px!important;
		line-height: 28px!important;
		padding: 0 10px!important;
		border-radius: 6px!important;
		font-size: 14px!important;
	}
	
	.el-input__inner {
		height: 28px!important;
		line-height: 28px!important;
	}
	
	.el-form-item {
		margin-bottom: 12px!important;
		display: inline-block;
	}
	
	.el-form-item__content {
		margin-right: 20px;
	}
	
	.el-button+.el-button {
		margin-left: 0px!important;
	}
</style>