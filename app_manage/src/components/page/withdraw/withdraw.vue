<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">挂单审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="status" style="min-height: 500px;" @tab-click="handleClick">
				<el-tab-pane label="挂单待审核" name="1">
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-top: 12px;border-bottom: 0;">
						<el-button type="primary" @click="through('',1)">批量通过</el-button>
						<el-button type="primary" @click="through('',2)">批量拒绝</el-button>
					</div>
					<el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="用户头像" height="95" width="80">
							<template slot-scope="scope">
								<img :src="scope.row.head_image" alt="" style="width:50px;height:50px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="用户名称" show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.nickname }}</template>
						</el-table-column>
						<el-table-column label="挂单金额" width="100">
							<template slot-scope="scope">￥{{scope.row.withdraw_money}}</template>
						</el-table-column>
						<el-table-column label="账号" show-overflow-tooltip width="200">
							<template slot-scope="scope">{{scope.row.account }}</template>
						</el-table-column>
						<el-table-column prop="real_name" label="真实姓名" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column prop="telephone" label="对账手机号" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column prop="create_time" label="挂单时间" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="" type="text" size="small" class="pros" @click="through(scope.row.id,1)">通过
								</el-button>
								<el-button @click="" type="text" size="small" class="pros" @click="through(scope.row.id,2)">拒绝
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
						<el-button type="primary" @click="through('',1)">批量通过</el-button>
						<el-button type="primary" @click="through('',2)">批量拒绝</el-button>
						<el-pagination @current-change="handleCurrentChange" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="转账中" name="4">
					<el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="用户头像" height="95" width="80">
							<template slot-scope="scope">
								<img :src="scope.row.head_image" alt="" style="width:50px;height:50px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="用户名称" show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.nickname }}</template>
						</el-table-column>
						<el-table-column label="挂单金额" width="100">
							<template slot-scope="scope">￥{{scope.row.withdraw_money}}</template>
						</el-table-column>
						<el-table-column label="账号" show-overflow-tooltip width="200">
							<template slot-scope="scope">{{scope.row.account }}</template>
						</el-table-column>
						<el-table-column prop="real_name" label="真实姓名" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column prop="telephone" label="对账手机号" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column prop="create_time" label="挂单时间" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="seek(scope.row.id)" type="text" size="small" class="pros">查询转账状态
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
						<el-pagination @current-change="handleCurrentChange" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="已到账" name="2">
					<el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="用户头像" height="95" width="80">
							<template slot-scope="scope">
								<img :src="scope.row.head_image" alt="" style="width:50px;height:50px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="用户名称" show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.nickname }}</template>
						</el-table-column>
						<el-table-column label="挂单金额" width="100">
							<template slot-scope="scope">￥{{scope.row.withdraw_money}}</template>
						</el-table-column>
						<el-table-column label="账号" show-overflow-tooltip width="200">
							<template slot-scope="scope">{{scope.row.account }}</template>
						</el-table-column>
						<el-table-column prop="real_name" label="真实姓名" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column prop="telephone" label="对账手机号" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column prop="create_time" label="挂单时间" show-overflow-tooltip width="150">
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
						<el-pagination @current-change="handleCurrentChange" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="未通过" name="3">
					<el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="用户头像" height="95" width="80">
							<template slot-scope="scope">
								<img :src="scope.row.head_image" alt="" style="width:50px;height:50px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="用户名称" show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.nickname }}</template>
						</el-table-column>
						<el-table-column label="挂单金额" width="100">
							<template slot-scope="scope">￥{{scope.row.withdraw_money}}</template>
						</el-table-column>
						<el-table-column label="账号" show-overflow-tooltip width="200">
							<template slot-scope="scope">{{scope.row.account }}</template>
						</el-table-column>
						<el-table-column prop="real_name" label="真实姓名" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column prop="telephone" label="对账手机号" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column prop="create_time" label="挂单时间" show-overflow-tooltip width="150">
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
				userList: [],
				user_id: [],
				status: "1",
				total_count: 0,
			}
		},
		methods: {
			//      获取挂单列表
			getUserList: function() {
				this.$ajax.get('/api/withdrawList', {
					params: {
						status: this.status,
						page: this.page,
						limit: this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.userList = res.data.data.list
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
					console.log(err)
				})
			},
			//审核通过不通过
			through(id, type) {
				var data = null
				if(id) {
					data = {
						id: [id],
						type: type
					}
				} else {
					data = {
						id: this.user_id,
						type: type
					}
				}
				console.log(data)
				this.$ajax.post('/api/examineWithdraw', data).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getUserList()
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
			seek(id) {
				this.$ajax.post('/api/getTransStaus', {
					id: id
				}).then((res) => {
					if(res.data.code == '200') {
						this.$alert(res.data.data.message,'转账状态');
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
			handleSelectionChange(val) {
				console.log(val)
				var data = []
				for(var i = 0; i < val.length; i++) {
					data.push(val[i].id);
				}
				this.user_id = data;
				console.log(this.user_id)
			},

			//            页码改变
			handleCurrentChange(val) {
				//                获取当前页数的消息
				this.page = val
				document.getElementsByClassName('content')[0].scrollTop = 0
				document.documentElement.scrollTop = 0
				this.getUserList()
			},
			handleClick(tab) {
				this.userList = []
				this.getUserList()
			}
		},
		mounted() {

		},
		created: function() {
			this.getUserList()
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
	
	.pros {
		padding: 0 10px;
		cursor: pointer;
		color: #0f8edd;
		line-height: 24px;
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