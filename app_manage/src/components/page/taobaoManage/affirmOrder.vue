<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">淘宝订单确认</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="status" style="min-height: 500px;" @tab-click="handleClick">
				<el-tab-pane label="待确认订单" name="0">
					<div style="margin-bottom: 20px;">
						<input type="text" class="product_name" v-model="product_name" placeholder="请输入商品名称" style="width: 278px;height: 30px;line-height: 30px;">
						<el-button type="primary" @click="getList()">搜索
						</el-button>
					</div>
					<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;text-align: center;" border  v-loading="loading">
						<el-table-column label="商品名称" height="95" width="200">
							<template slot-scope="scope">
								{{scope.$index+1}}.{{scope.row.title}}
							</template>
						</el-table-column>
						<el-table-column label="店铺名称" prop="shop_title">
						</el-table-column>
						<el-table-column label="分享者" prop="share_member"></el-table-column>
						<el-table-column label="领券者" prop="coupon_member"></el-table-column>
						<el-table-column label="领券时间" prop="create_time" width="100"></el-table-column>
						<el-table-column label="佣金/元" width="100">
							<template slot-scope="scope">
							<input type="text" class="product_name" v-model="scope.row.commission" style="width: 80px;">
							</template>
						</el-table-column>
						<el-table-column label="输入订单号" width="220">
							<template slot-scope="scope">
							<input type="text" class="product_name" v-model="scope.row.order_sn">
							<el-button @click="affirm(scope.row.id,scope.row.commission,scope.row.order_sn)" type="text" size="small" class="pros">确认
							</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
						<el-pagination @current-change="handleCurrentChange" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="已确认订单" name="1">
					<div style="margin-bottom: 20px;">
						<input type="text" class="product_name" v-model="product_name" placeholder="请输入商品名称" style="width: 278px;height: 30px;line-height: 30px;">
						<el-button type="primary" @click="getList()">搜索
						</el-button>
					</div>
					<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;text-align: center;" border>
						<el-table-column label="商品名称" height="95" width="200">
							<template slot-scope="scope">
								{{scope.$index+1}}.{{scope.row.title}}
							</template>
						</el-table-column>
						<el-table-column label="店铺名称" prop="shop_title">
						</el-table-column>
						<el-table-column label="分享者" prop="share_member"></el-table-column>
						<el-table-column label="领券者" prop="coupon_member"></el-table-column>
						<el-table-column label="领券时间" prop="create_time" width="100"></el-table-column>
						<el-table-column label="拥金/元" width="100">
							<template slot-scope="scope">
							<input type="text" class="product_name" v-model="scope.row.commission" style="width: 80px;" disabled="disabled">
							</template>
						</el-table-column>
						<el-table-column label="输入订单号" width="180">
							<template slot-scope="scope">
							<input type="text" class="product_name" v-model="scope.row.order_sn" disabled="disabled">
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
				list: [{
					 "id": 132,
                "share_member": "Freedom丶",
                "coupon_member": "Freedom丶",
                "title": "笔记本支架桌面颈椎办公室电脑升降便携托架散热器架子增高垫底座",
                "shop_title": "店铺名称",
                "create_time": "2018-04-25 15:55:33"
				}],
				status: "0",
				product_name:'',
				total_count: 0,
				loading:false,
			}
		},
		methods: {
			//获取领券列表0未确认，1已确认
			getList: function() {
				this.loading=true
				this.$ajax.get('/api/getCouponListBack', {
					params: {
						is_sure: this.status,
						product_name:this.product_name,
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
			//发货
			affirm(id,commission,order_sn){
				this.loading=true
				this.$ajax.post('/api/sureTbBuyer',{
						id:id,
						commission:commission,
						order_sn:order_sn,
				}).then((res)=>{
					this.loading=false
					if(res.data.code=="200"){
						this.$message({
							message: res.data.data.message,
						});
						this.getList()
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
			handleClick(tab) {
				this.product_name=''
				this.getList()
			}
		},
		mounted() {

		},
		created: function() {
			this.getList()
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