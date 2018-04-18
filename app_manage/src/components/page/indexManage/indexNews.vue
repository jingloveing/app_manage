<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">享利快报</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="status" style="min-height: 500px;">
				<el-tab-pane label="享利快报数据" name="0">
					<div style="margin-left: 20px;">
						<p style="margin-bottom: 20px;">数据列表：</p>
						<el-button type="primary" style="background-color: #0f8edd;border-color: #0f8edd;" @click="dialogVisible = !dialogVisible">新增数据
						</el-button>
					</div>
					<div class="ms-doc_main">
						<el-table ref="multipleTable" :data="newsList" tooltip-effect="dark" style="width: 100%;text-align: center;" border>
							<el-table-column prop="nickname" label="用户名称">
							</el-table-column>
							<el-table-column prop="acer" label="所获财宝值(铜币)">
							</el-table-column>
							<el-table-column prop="coupon_number" label="操作" show-overflow-tooltip>
								<template slot-scope="scope">
									<el-button @click="del(scope.row.id)" type="text" size="small" class="pros">删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!--新增数据弹出框-->
		<el-dialog title="新增数据" :visible.sync="dialogVisible" :before-close="handleClose" class="addnews-dialog">
			<div>
				<el-form ref="form" label-width="100px">
					<el-form-item label="用户昵称：" class="dialog">
						<el-input v-model="nickname"></el-input>
					</el-form-item>
					<el-form-item label="所获财宝值：" class="dialog">
						<el-input v-model="acer"></el-input><span style="display: inline-block;width: 100px;text-align: center;line-height: 28px;">单位：铜币</span>
					</el-form-item>
				</el-form>

			</div>
			<span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="save()">保存</el-button>
    <el-button @click="close()">取 消</el-button>
  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				dialogVisible: false,
				status: "0",
				nickname: '',
				acer: '',
				newsList: []
			}
		},
		methods: {
			//      获取享利快报列表
			getNewsList: function() {
				this.$ajax.get('/api/bubbleList').then((res) => {
					if(res.data.code == '200') {
						this.newsList = res.data.data
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

			//删除单个商品
			del(id) {
				this.$ajax.post('/api/delBubble', {
					id: id
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getNewsList()
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
			//新增享利快报
			save(){
				this.$ajax.post('/api/insertBubble', {
					nickname: this.nickname,
					acer: this.acer,
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.nickname=''
						this.acer=''
						this.dialogVisible = false
						this.getNewsList()
					} else if(res.data.code == "601") {
						this.$router.push('/login')
					} else {
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				}, (err) => {})
			},
			handleClose() {
				this.nickname = ''
				this.acer = ""
				this.dialogVisible = false
			},
			close() {
				this.nickname = ""
				this.acer = ""
				this.dialogVisible = false
			},
		},
		mounted() {

		},
		created: function() {
			this.getNewsList()
		}
	}
</script>
<style scoped="scoped">
	.pros {
		padding: 0 10px;
		cursor: pointer;
		color: #0f8edd;
		line-height: 24px;
	}
</style>
<style>
	.dialog .el-input{
		width: calc(100% - 100px)!important;
	}
	.dialog .el-input .el-input__inner{
		width: 100%;
	}
	.addnews-dialog .el-dialog--small{
		width: 500px;
	}
	
		/*按钮样式*/
.el-button{
	height: 28px!important;
    line-height: 28px!important;
    padding: 0 10px!important;
    border-radius: 6px!important;
    font-size: 14px!important;
}
.el-input__inner{
	height: 28px!important;
    line-height: 28px!important;
}
</style>
