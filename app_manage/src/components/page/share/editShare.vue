<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">话题圈</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="status" style="min-height: 500px;" @tab-click="handleClick">
				<el-tab-pane label="新建话题" name="0">
					<el-form label-position="right" label-width="100px" :rules="rules" :model="formData" ref="formData" class="editShare">
						<el-form-item label="栏目话题：" prop="title">
							<el-input v-model="formData.title"></el-input>
						</el-form-item>
						<el-form-item label="文案内容：" prop="msg">
							<el-input type="textarea" v-model="formData.msg"></el-input>
						</el-form-item>
						<el-form-item label="APP宣传图：（单选）">
							<div class="app-list-main">
								<div class="app-list" v-for="(item,index) in appList" :key="index">
									<div class="check" v-show="formData.middle_id==item.id">
										<img src="/static/img/checked_img.png" alt="">
									</div>
									<div @click="isChecked(item.id)">
										<img :src="item.image" alt="" />
									</div>
								</div>
							</div>
						</el-form-item>
						<el-form-item label="所选商品：（选8件）">
							<ul>
								<li v-for="(item,index) in selectPro" :key="index">
									<img :src="item.pict_url" alt="" />
								</li>
							</ul>
							<span style="color: #0f8edd;cursor: pointer;" class="f14" @click="select()">从库中选择</span>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="已发话题" name="1">
					<p style="font-size: 14px; color: #54667a;margin-top: 16px;">优选文章共<span style="color: #FC4B6C;">{{total_count}}</span>篇</p>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-top: 12px;border-bottom: 0;">
						<el-button type="primary" round @click="del()">删除</el-button>
					</div>
					<el-table ref="multipleTable" :data="goodsList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="商品" height="95" width="110">
							<template slot-scope="scope">
								<img :src="scope.row.pict_url" alt="" style="width:50px;height:50px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="文案内容" show-overflow-tooltip>
							<template slot-scope="scope">#{{ scope.row.title }}#{{scope.row.msg}}</template>
						</el-table-column>
						<el-table-column prop="create_time" label="发布时间" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="seek(scope.row.id)" type="text" size="small" class="pros">查看详情
								</el-button>
								<el-button @click="del(scope.row.id)" type="text" size="small" class="pros">删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;">
						<el-button type="primary" @click="del()">删除</el-button>
						<el-pagination @current-change="handleCurrentChange" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!--新增商品弹出框-->
		<el-dialog title="优选商品库" :visible.sync="dialogVisible" class="special-dialog editShare-dialog">
				<p style="display: inline-block;position: absolute;top: 23px;left: 130px;">(请从库中挑满8件商品，{{selectPro.length}}/8)</p>
			<div>
				<el-table ref="table" :data="proList" tooltip-effect="dark" style="width: 100%;text-align: center;" border height="550">
					<el-table-column label="店铺" height="95" width="110">
						<template slot-scope="scope">
							<img :src="scope.row.pict_url" alt="" style="width:80px;height:80px;margin-top: 5px;">
						</template>
					</el-table-column>
					<el-table-column label="商品名称">
						<template slot-scope="scope">
							{{scope.row.title}}
						</template>
					</el-table-column>
					<el-table-column label="价格" width="100">
						<template slot-scope="scope">￥{{scope.row.zk_final_price}}</template>
					</el-table-column>
					<el-table-column label="券额" width="100">
						<template slot-scope="scope">￥{{scope.row.coupon_number}}</template>
					</el-table-column>
					<el-table-column label="佣金" width="100">
						<template slot-scope="scope">￥{{scope.row.commission}}</template>
					</el-table-column>
					<el-table-column label="操作" width="80">
						<template slot-scope="scope">
							<el-button @click="add(scope.row)" type="text" size="small" class="pros" v-show="!scope.row.is_selected">选择
							</el-button>
							<el-button type="text" size="small" class="pros" v-show="scope.row.is_selected==true" style="color: #999;">已选
							</el-button>
							<el-button @click="remove(scope.row.id,scope.$index)" type="text" size="small" class="pros" v-show="scope.row.is_selected==true">移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				
			</div>
			<span slot="footer" class="dialog-footer">
   <div style="overflow: hidden;">
					<el-pagination @current-change="handleCurrentChange2" :page-size=limit2 layout="prev, pager, next, jumper" :page-count="totalPage2" style="display: inline-block;float: right;">
					</el-pagination>
				</div>
  </span>
		</el-dialog>
		<!--查看话题详情弹出框-->
		<el-dialog title="详情列表" :visible.sync="dialogVisible2" class="special-dialog">
			<div>
				<el-table ref="table" :data="detail" tooltip-effect="dark" style="width: 100%;text-align: center;" border>
					<el-table-column label="商品" height="95" width="80">
						<template slot-scope="scope">
							<img :src="scope.row.thumb_url" alt="" style="width:50px;height:50px;margin-top: 5px;">
						</template>
					</el-table-column>
					<el-table-column label="商品名称" prop="product_name" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="价格" width="100">
						<template slot-scope="scope">￥{{scope.row.reserve_price}}</template>
					</el-table-column>
					<el-table-column label="券额" width="100">
						<template slot-scope="scope">￥{{scope.row.coupon_number}}</template>
					</el-table-column>
					<el-table-column label="佣金" width="100">
						<template slot-scope="scope">￥{{scope.row.coupon_number}}</template>
					</el-table-column>
				</el-table>
			</div>
			<span slot="footer" class="dialog-footer">
   
  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				page: 1,
				page2: 1,
				limit: 20,
				limit2: 20,
				totalPage: 1,
				totalPage2: 1,
				goodsList: [],//已发话题列表
				dialogVisible: false,
				dialogVisible2: false,
				product_id: [],
				status: "0",
				total_count: 0,
				formData: {
					title: '',
					msg: '',
					middle_id: '',
					product_id: []
				},
				rules: {
					title: [{
						required: true,
						message: '请输入栏目话题',
						trigger: 'blur'
					}],
					msg: [{
						required: true,
						message: '请输入文案内容',
						trigger: 'blur'
					}],
				},
				selectPro: [],//优选库所选商品
				proList: [],//优选库列表
				appList: [],//app宣传图列表
				detail:[],
			}
		},
		methods: {
			//      获取APP宣传图列表
			getAppList: function() {
				this.$ajax.get('/api/createShareCircle').then((res) => {
					if(res.data.code == '200') {
						this.appList = res.data.data
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
			//      获取优选商品列表
			getProList: function() {
				this.$ajax.get('/api/getShareProductList', {
					params: {
						page: this.page2,
						limit: this.limit2
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.proList = res.data.data.list
						this.totalPage2 = res.data.data.total_page
						for(var i = 0; i < this.proList.length; i++) {
							for(var j = 0; j < this.selectPro.length; j++) {
								if(this.selectPro[j].id == this.proList[i].id) {
									this.proList[i].is_selected = true
									break
								}
								this.proList[i].is_selected = false
							}

						}
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
			//      获取已发话题列表
			getGoodsList: function() {
				this.$ajax.get('/api/circleListBack', {
					params: {
						page: this.page,
						limit: this.limit
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.goodsList = res.data.data.list
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
			//一键删除所选商品
			del(id) {
				if(id){
					var data={
						id:[id]
					}
				}else{
					var data={
						id:this.product_id
					}
				}
				this.$ajax.post('/api/delShareCircle', data).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getGoodsList()
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
				this.detail=[]
				this.dialogVisible2 = true
				this.$ajax.get('/api/circleProductList', {
					params:{
						id:id
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.detail=res.data.data
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
			handleClose() {
				this.id = ''
				this.msg = ""
				this.dialogVisible2 = false
				this.dialogVisible = false
			},
			handleSelectionChange(val) {
				console.log(val)
				var data = []
				for(var i = 0; i < val.length; i++) {
					data.push(val[i].id);
				}
				this.product_id = data;
				console.log(this.product_id)
			},
			handleSelectionChange2(val) {

			},

			//   页码改变
			handleCurrentChange(val) {
				//    获取当前页数的消息
				this.page = val
				document.getElementsByClassName('content')[0].scrollTop = 0
				document.documentElement.scrollTop = 0
				this.getGoodsList()
			},
			//            页码改变
			handleCurrentChange2(val) {
				//      获取当前页数的消息
				this.page2 = val
				document.getElementsByClassName('content')[0].scrollTop = 0
				document.documentElement.scrollTop = 0
				this.getProList()
			},
			handleClick(tab) {
				if(this.status == '1') {
					this.getGoodsList()
				}

			},
			newbuild() {
				var self = this
				self.$ajax.post('/api/createShareCircle',
					self.formData
				).then((res) => {
					if(res.data.code == '200') {
						self.$message({
							message: res.data.data.message,
							type: 'success'
						});
						self.formData={
							title: '',
							msg: '',
							middle_id: '',
							product_id: []
						}
						self.selectPro=[]
					} else if(res.data.code == "601") {
						self.$router.push('/login')
					} else {
						self.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				}, (err) => {
					console.log(err)
				})
			},
			submitForm(formName) {
				var self = this
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(self.formData.middle_id == '') {
							self.$message({
								message: "请选择APP商品图",
								type: 'error'
							});
							return
						}
						if(self.formData.product_id.length < 8) {
							self.$message({
								message: "多选商品个数不能少于8",
								type: 'error'
							});
							return
						}
						self.newbuild()
					} else {
						return false;
					}
				});
			},
			//            app选择图标
			isChecked(id) {
				this.formData.middle_id = id
			},
			//从库中选择
			select() {
				this.getProList()
				this.dialogVisible = !this.dialogVisible
			},
			//移除
			remove(id, index) {
				for(var i = 0; i < this.selectPro.length; i++) {
					if(this.selectPro[i].id == id) {
						this.selectPro.splice(i, 1)
						this.formData.product_id.splice(i, 1)
						break
					}
				}
				this.proList[index].is_selected = false

			},
			//选择
			add(ev) {
				if(this.selectPro.length >= 8) {
					this.$message({
						message: '最多只能选择8商品',
						type: 'error'
					});
				} else {
					ev.is_selected = true
					this.selectPro.push(ev)
					this.formData.product_id.push(ev.id)
				}

			},
		},
		mounted() {

		},
		created: function() {
			this.getAppList()

		}
	}
</script>

<style scoped>
	ul {
		list-style: none;
		width: 530px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	
	ul>li {
		line-height: 0;
		margin: 0 6px 6px 0;
	}
	
	ul>li>img {
		width: 100px;
		height: 100px;
	}
	
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
	
	.app-list-main {
		width: 530px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		line-height: 0;
		cursor: pointer;
	}
	
	.app-list {
		margin: 0 6px 6px 0;
		position: relative;
		width: 100px;
		height: 100px;
		overflow: hidden;
	}
	
	.app-list img {
		width: 100px;
		margin: -44px 0;
	}
	
	.check {
		position: absolute;
		right: 10px;
		top: 10px;
		right: 8px;
		top: 5px;
	}
	
	.check img {
		width: 20px;
		height: 20px;
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
	
	.editShare .el-form-item {
		display: block!important;
	}
	
	.editShare .el-input__inner {
		width: 445px;
		height: 28px!important;
		line-height: 28px!important;
	}
	
	.editShare .el-cascader__label,
	.editShare .el-textarea__inner {
		width: 445px;
		height: 106px;
	}
	
	.editShare .el-form-item__label {
		line-height: 22px;
	}
	.editShare-dialog .el-dialog--small{
		min-width: 1040px;
	}
	.editShare-dialog .el-dialog__body{
		max-height: 550px;
	}
	/*.el-form-item {
		margin-bottom: 12px!important;
		
	}
	
	.el-form-item__content {
		margin-right: 20px;
	}
	
	.el-button+.el-button {
		margin-left: 0px!important;
	}*/
</style>