<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">打赏管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="status" style="min-height: 500px;" @tab-click="handleClick">
				<el-tab-pane label="添加商品" name="0">
					<el-form ref="form" label-width="83px" style="color: #848c97;margin-top: 15px;">
						<el-form-item>
							<input type="text" class="product_name" v-model="id" placeholder="请输入商品ID搜索" style="width: 278px;height: 30px;line-height: 30px;">
						</el-form-item>
						<el-button type="primary" @click="getList()">搜索
						</el-button>
					</el-form>
					<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange" v-loading="loading">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="商品" height="95" width="110">
							<template slot-scope="scope">
								<img :src="scope.row.pict_url" alt="" style="width:80px;height:80px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="商品名称" prop="title">
						</el-table-column>
						<el-table-column label="价格" prop="price" width="100">
						</el-table-column>
						<el-table-column label="佣金" width="100" prop="commission">
						</el-table-column>
						<el-table-column label="佣金比" width="100" prop="commission_rate"></el-table-column>
						<el-table-column label="操作" width="80">
							<template slot-scope="scope">
								<el-button @click="add(scope.row.id)" type="text" size="small" class="pros">添加
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
						<el-pagination @current-change="handleCurrentChange1" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage1" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="商品列表" name="1">
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-top: 12px;border-bottom: 0;">
						<el-button type="primary" round @click="del()">删除</el-button>
					</div>
					<el-table ref="multipleTable" :data="rewardList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange" v-loading="loading">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="商品" height="95" width="110">
							<template slot-scope="scope">
								<img :src="scope.row.pict_url" alt="" style="width:80px;height:80px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="商品名称" prop="title">
						</el-table-column>
						<el-table-column label="价格" prop="price" width="100">
						</el-table-column>
						<el-table-column label="佣金" width="100" prop="commission">
						</el-table-column>
						<el-table-column label="佣金比" width="100" prop="commission_rate"></el-table-column>
						<el-table-column label="操作" width="80">
							<template slot-scope="scope">
								<el-button @click="del(scope.row.id)" type="text" size="small" class="pros">删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
						<el-pagination @current-change="handleCurrentChange2" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage2" style="display: inline-block;float: right;">
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
				page2: 1,
				page1: 1,
				limit: 20,
				totalPage1: 1,
				totalPage2: 1,
				list: [],
				rewardList:[],
				product_id: [],
				status: "0",
				id: '',
				loading:false,
			}
		},
		methods: {
			//获取添加商品列表
			getList: function() {
				this.loading=true
				this.$ajax.get('/api/bargainProductInfo', {
					params: {
						id:this.id,
						page: this.page1,
						limit: this.limit
					}
				}).then((res) => {
					this.loading=false
					if(res.data.code == '200') {
						this.list = res.data.data.list
						this.totalPage1 = res.data.data.total_page
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
			//获取添加商品列表
			getRewardList: function() {
				this.loading=true
				this.$ajax.get('/api/getBargainProductList', {
					params: {
						page: this.page2,
						limit: this.limit
					}
				}).then((res) => {
					this.loading=false
					if(res.data.code == '200') {
						this.rewardList = res.data.data.list
						this.totalPage2 = res.data.data.total_page
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
			add(id){
				this.$ajax.post('/api/insertBargainProduct', {
						id:id
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message
						});
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
			del(id){
				if(id){
					var data={id:id}
				}else{
					var data={id:this.product_id}
				}
				this.$ajax.post('/api/delBargainProduct', data).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message
						});
						this.getRewardList()
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
			//页码改变
			handleCurrentChange1(val) {
				// 获取当前页数的消息
				this.page1 = val
				this.getList()
			},
			//页码改变
			handleCurrentChange2(val) {
				// 获取当前页数的消息
				this.page2 = val
				this.getRewardList()
			},
			handleSelectionChange(val) {
				var data = []
				for(var i = 0; i < val.length; i++) {
					data.push(val[i].id);
				}
				this.product_id = data;
				console.log(this.product_id)
			},
			handleClick(tab) {
				this.getList()
			}
		},
		mounted() {

		},
		created: function() {
			this.getList()
			this.getRewardList()
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
		margin-left: 0!important;
	}
	
	.el-button+.el-button {
		margin-left: 0px!important;
	}
</style>