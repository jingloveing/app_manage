<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">视频管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<p class="title"><span @click="goback()">店铺视频管理</span><span v-show="showList"> > 视频列表</span></p>
			<div v-show="!showList">
				<el-form ref="form" label-width="83px" style="color: #848c97;margin-top: 15px;">
					<el-form-item label="有无视频：">
						<el-select placeholder="全部" style="width: 148px;" v-model="type">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" @click="getList()">搜索
					</el-button>
				</el-form>
				<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;text-align: center;" border>
					<el-table-column label="店铺" height="95" width="80">
						<template slot-scope="scope">
							<img :src="scope.row.logo" alt="" style="width:50px;height:50px;margin-top: 5px;">
						</template>
					</el-table-column>
					<el-table-column label="店铺名称" prop="name" show-overflow-tooltip></el-table-column>
					<el-table-column label="推荐视频" prop="view_name" show-overflow-tooltip></el-table-column>
					<el-table-column label="店铺视频数" width="100" prop="view_count">

					</el-table-column>
					<el-table-column label="操作" width="300">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row.id,'1')" type="text" size="small" class="pros">上传视频
							</el-button>
							<el-button @click="toList(scope.row.logo,scope.row.name,scope.row.id)" type="text" size="small" class="pros">视频列表
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
					<el-pagination @current-change="handleCurrentChange" :page-size=limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
					</el-pagination>
				</div>
			</div>
			<div v-show="showList">
				<div style="margin: 30px 0 16px;display: flex;align-items: baseline;">
					<img :src="logo" alt="" style="width: 50px;height: 50px;" />
					<p style="margin-left: 20px;">{{name}}</p>
				</div>
				<el-table ref="multipleTable" :data="viewList" tooltip-effect="dark" style="width: 80%;text-align: center;" border>
					<el-table-column label="视频名称">
						<template slot-scope="scope">
							<p style="text-align: left;">
								<span style="margin-right: 10px;">{{scope.$index + 1}}.</span>{{ scope.row.view_name }}
							</p>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="300">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row.id,'')" type="text" size="small" class="pros">编辑
							</el-button>
							<el-button type="text" size="small" class="pros" v-show="scope.row.is_index==1" style="color: #999;">已设推荐
							</el-button>
							<el-button @click="setIndex(scope.row.id)" type="text" size="small" class="pros" v-show="scope.row.is_index!==1">设为推荐
							</el-button>
							<el-button @click="del(scope.row.id)" type="text" size="small" class="pros">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;width: 80%;box-sizing: border-box;">
					<el-pagination @current-change="handleCurrentChange3" :page-size=limit3 layout="prev, pager, next, jumper" :page-count="totalPage3" style="display: inline-block;float: right;">
					</el-pagination>
				</div>
			</div>
		</div>
		<!--新增商品弹出框-->
		<el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose" class="special-dialog">
			<div>
				<el-form ref="form" label-width="110px">
					<el-form-item label="品牌视频：" style="display: block;width: 100%;">
						<el-input style="width: 208px;" placeholder="输入视频链接" v-model="data.view"></el-input>
					</el-form-item>
					<el-form-item label="视频标题：" style="display: block;width: 100%;">
						<div style="position: relative;">
							<el-input :maxlength="length" style="width: 208px;" :input="change()" placeholder="输入视频标题" v-model="data.view_name"></el-input><span style="position: absolute;">{{size}}/40</span>
						</div>
					</el-form-item>
					<el-form-item label="设为首页推荐：" style="display: block;width: 100%;">
						<el-checkbox v-model="data.is_index">是</el-checkbox> <span style="margin-left: 20px;color: #999;">（推荐视频将会在视频列表最前展示）</span>
					</el-form-item>
					<el-form-item label="相关商品：" style="display: block;width: 100%;">
						<span v-for="item in data.product_list"><span class="name">{{item.name}}</span>、</span>
					</el-form-item>
					<el-form-item label="商品列表：" style="display: block;width: 100%;">
					</el-form-item>
					<el-table ref="table" :data="proList" tooltip-effect="dark" style="width: 100%;text-align: center;" border>
						<el-table-column label="店铺" height="95" width="80">
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
						<el-table-column label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click="add(scope.row)" type="text" size="small" class="pros" v-show="!scope.row.selected">选择
								</el-button>
								<el-button type="text" size="small" class="pros" v-show="scope.row.selected==true" style="color: #999;">已选
								</el-button>
								<el-button @click="remove(scope.row.id,scope.$index)" type="text" size="small" class="pros" v-show="scope.row.selected==true">移除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;border-top: 0;overflow: hidden;">
						<el-pagination @current-change="handleCurrentChange2" :page-size=limit2 layout="prev, pager, next, jumper" :page-count="totalPage2" style="display: inline-block;float: right;">
						</el-pagination>
					</div>
				</el-form>

			</div>
			<span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="save()">确认</el-button>
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
				page: 1,
				limit: 20,
				page2: 1,
				limit2: 10,
				page3: 1,
				limit3: 20,
				totalPage: 1,
				totalPage2: 1,
				totalPage3: 1,
				list: [],
				proList: [],
				type: "",
				total_count: 0,
				id: '',
				options: [{
						value: '',
						label: '全部'
					},
					{
						value: '2',
						label: '无'
					},
					{
						value: '1',
						label: '有'
					}
				],
				showList: false,
				viewList: [],
				name: '',
				logo: '',
				size: 0,
				length: 40,
				dialogVisible: false,
				title: '上传视频',
				data: {
					id: '',
					view: '',
					view_name: '',
					is_index: false,
					merchant_id: '',
					product_id: [],
					product_list:[]
				}
			}
		},
		methods: {
			//      获取店铺列表
			getList: function() {
				this.$ajax.get('/api/merchantViewList', {
					params: {
						type: this.type,
						page: this.page,
						limit: this.limit
					}
				}).then((res) => {
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
					console.log(err)
				})
			},
			//获取店铺下的视频列表
			getViewList() {
				this.$ajax.get("/api/getMerchantViewList", {
					params: {
						id: this.$route.query.id,
						page: this.page3,
						limit: this.limit3
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.viewList = res.data.data.list
						this.totalPage3 = res.data.data.total_page
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
			//获取所有的商品列表
			getProList() {
				this.$ajax.get("/api/viewProductList", {
					params: {
						merchant_id: this.data.merchant_id,
						view_id: this.data.id,
						page: this.page2,
						limit: this.limit2
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.proList = res.data.data.list
						this.totalPage2 = res.data.data.total_page
						for(var i = 0; i < this.proList.length; i++) {
							for(var j = 0; j < this.data.product_list.length; j++) {
								if(this.proList[i].id == this.data.product_list[j].id) {
									this.proList[i].selected = true
									break
								}
								this.proList[i].selected = false
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
			//获取视频信息
			getDetail() {
				this.$ajax.get("/api/setVideoBack", {
					params: {
						id: this.data.id
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.data = res.data.data
						if(this.data.is_index == 1) {
							this.data.is_index = true
						} else {
							this.data.is_index = false
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

				})
			},
			//设为推荐
			setIndex(id){
				this.$ajax.post('/api/setViewIndex',{id:id}).then((res)=>{
					if(res.data.code == '200') {
                        this.$message({
							message: res.data.data.message,
						});
						this.getViewList()
					} else if(res.data.code == "601") {
						this.$router.push('/login')
					} else {
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				},(err)=>{
					
				})
			},
			//删除视频
			del(id){
				this.$ajax.post('/api/delView',{id:id}).then((res)=>{
					if(res.data.code == '200') {
                        this.$message({
							message: res.data.data.message,
						});
						this.getViewList()
					} else if(res.data.code == "601") {
						this.$router.push('/login')
					} else {
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				},(err)=>{
					
				})
			},
			//编辑视频
			edit(id, type) {
				if(type == '1') {
					this.data.merchant_id = id
					console.log(this.data.merchant_id)
					this.getProList()
				} else {
					this.data.merchant_id = this.$route.query.id
					this.data.id = id
					this.getDetail()
					this.getProList()
				}
				this.dialogVisible = true
			},
			//移除
			remove(id, index) {
				for(var i = 0; i < this.data.product_list.length; i++) {
					if(this.data.product_list[i].id == id) {
						this.data.product_list.splice(i, 1)
						break
					}
				}
				this.proList[index].selected = false
			},
			//选择
			add(item) {
				item.selected = true
				this.data.product_list.push({
					id: item.id,
					name: item.product_name
				})
			},
			//保存视频
			save() {
				const loading=this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				if(this.data.is_index) {
					this.data.is_index = 1
				} else {
					this.data.is_index = 0
				}
				if(this.$route.query.id){
					this.data.merchant_id = this.$route.query.id
				}else{
					
				}
				this.data.product_id = []
				for(var i = 0; i < this.data.product_list.length; i++) {
					this.data.product_id.push(this.data.product_list[i].id)
				}
				this.$ajax.post("/api/setVideoBack", this.data).then((res) => {
					this.data = {
							id: '',
							view: '',
							view_name: '',
							is_index: false,
							merchant_id: '',
							product_id: [],
							product_list:[]
						}
					this.dialogVisible = false
					if(res.data.code == '200') {
						loading.close();
						this.$message({
							message: res.data.data.message,
						});
						
					} else if(res.data.code == "601") {
						loading.close();
						this.$router.push('/login')
					} else {
						loading.close();
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				}, (err) => {
					this.data = {
							id: '',
							view: '',
							view_name: '',
							is_index: false,
							merchant_id: '',
							product_id: [],
							product_list:[]
						}
                        loading.close();
				})
			},
			//            页码改变
			handleCurrentChange(val) {
				//                获取当前页数的消息
				this.page = val
				this.getList()
			},
			//            页码改变
			handleCurrentChange2(val) {
				//                获取当前页数的消息
				this.page2 = val
				if(this.$route.query.id) {
					this.data.merchant_id = this.$route.query.id
				}
				this.getProList()
			},
			//            页码改变
			handleCurrentChange3(val) {
				//                获取当前页数的消息
				this.page3 = val
				if(this.$route.query.id) {
					this.data.merchant_id = this.$route.query.id
				}

			},
			toList(logo, name, id) {
				this.$router.push({
					path: '/brandView',
					query: {
						logo: logo,
						name: name,
						id: id
					}
				})
				this.showList = true
			},
			goback() {
				window.history.go(-1)
			},
			handleClose() {
				this.data = {
					id: '',
					view: '',
					view_name: '',
					is_index: false,
					merchant_id: '',
					product_id: [],
					product_list:[]
				}
				this.getList()
				this.dialogVisible = false
			},
			close() {
				this.data = {
					id: '',
					view: '',
					view_name: '',
					is_index: false,
					merchant_id: '',
					product_id: [],
					product_list:[]
				}
				this.getList()
				this.dialogVisible = false
			},
			change() {
				if(this.data.view_name.length <= 40) {
					this.size = this.data.view_name.length
				} else {
					this.size = 40
				}
			}
		},
		mounted() {

		},
		created: function() {
			if(this.$route.query.id) {
				this.logo = this.$route.query.logo
				this.name = this.$route.query.name
				this.getViewList()
				this.showList = true
			} else {
				this.getList()
				this.showList = false
			}

		},
		watch: {
			$route() {
				if(this.$route.query.id) {
					this.logo = this.$route.query.logo
					this.name = this.$route.query.name
					this.getViewList()
					this.showList = true
				} else {
					this.getList()
					this.showList = false
				}
			}
		}
	}
</script>

<style scoped>
	.title {
		font-size: 20px;
		color: #54667a;
		line-height: 60px;
		border-bottom: 1px solid #e9f1f3;
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
	
	.name {
		display: inline-block;
		max-width: 134px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		line-height: 12px;
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