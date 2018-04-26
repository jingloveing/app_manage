<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">品牌精选</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<p class="m_title">品牌列表</p>
			<div class="ms-doc_main">
				<el-form ref="form" label-width="83px" style="color: #848c97;">
					<el-form-item label="品牌等级：">
						<el-select v-model="data.type" placeholder="全部" style="width: 148px;">
							<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" @click="getGoodsList()">搜索
					</el-button>
					<el-button type="primary" @click="add()" style="margin-left: 30px!important;">添加品牌
					</el-button>
					<el-button type="primary" @click="same()" style="margin-left: 30px!important;">同步商品
					</el-button>
				</el-form>
				<p style="font-size: 14px; color: #54667a;margin-top: 16px;">品牌店铺共<span style="color: #FC4B6C;">{{total_count}}</span>件</p>
				<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-top: 12px;border-bottom: 0;">
					<el-button type="primary" @click="del()">删除</el-button>
					<el-button type="primary" @click="setIndex('',1)">设为精选</el-button>
					<el-button type="primary" @click="setIndex('',0)">取消精选</el-button>
				</div>
				<el-table ref="multipleTable" :data="goodsList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="50" height="95">
					</el-table-column>
					<el-table-column label="品牌店铺" height="95" width="80">
						<template slot-scope="scope">
							<img :src="scope.row.logo" alt="" style="width:50px;height:50px;margin-top: 5px;">
							<p v-show="scope.row.is_index==1" style="font-size: 12px;color: #fc4b6c;text-align: center;">精选品牌</p>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="品牌店铺名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="商品数" width="100" prop="product_count"></el-table-column>
					<el-table-column label="收藏人数" width="100" prop="collect_count">
					</el-table-column>

					<el-table-column prop="coupon_number" label="操作" width="380">
						<template slot-scope="scope">
							<el-button type="text" size="small" class="pros" v-text="scope.row.is_index==0?'设为精选':'取消精选'" @click="setIndex(scope.row.id,scope.row.is_index)"></el-button>
							<el-button @click="edit(scope.row)" type="text" size="small" class="pros">编辑</el-button>
							<el-button @click="del(scope.row.id)" type="text" size="small" class="pros">删除
							</el-button>
							<el-button @click="" type="text" size="small" class="pros" @click="seek(scope.row.id)">商品列表
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;overflow: hidden;">
					<el-button type="primary" @click="del()">删除</el-button>
					<el-button type="primary" @click="setIndex('',1)">设为精选</el-button>
					<el-button type="primary" @click="setIndex('',0)">取消精选</el-button>
					<el-pagination @current-change="handleCurrentChange" :page-size=data.limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
					</el-pagination>
				</div>
			</div>
		</div>
		<!--新增品牌弹出框-->
		<el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose">
			<div>
				<el-form ref="form" label-width="150px">
					<el-form-item label="店铺名称：" style="display: block;width: 350px;">
						<el-input v-model="adddata.name"></el-input>
					</el-form-item>
					<el-form-item label="店铺标志：">
						<img :src="adddata.logo" alt="" class="logo" :onerror="defaultImg">
						<p style="font-size: 14px;color: #999;display: inline-block;">(格式JPG、JPEG、PNG，文件大小80k以内，建议尺寸80PX*80PX)</p>
						<input id="file" type="file" style="display: none" @change="uploadImg($event,1)" multiple accept="image/*">
						<label class="operate" for="file">上传图片</label>

					</el-form-item>
					<el-form-item label="设为精选品牌：">
						<el-checkbox v-model="adddata.is_index">是</el-checkbox>
					</el-form-item>
					<el-form-item label="首页商品封面：">
						<img :src="adddata.image" alt="" class="image" :onerror="defaultImg">
						<p style="font-size: 14px;color: #999;display: inline-block;">(格式JPG、JPEG、PNG，文件大小100k以内，建议尺寸750PX*358PX)</p>
						<input id="files" type="file" style="display: none" @change="uploadImg($event,2)" multiple accept="image/*">
						<label class="operates" for="files">上传图片</label>

					</el-form-item>
				</el-form>

			</div>
			<span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="save()">保存</el-button>
    <el-button @click="close()">取 消</el-button>
  </span>
		</el-dialog>
		<!--商品列表弹出框-->
		<el-dialog title="添加品牌商品" :visible.sync="dialogVisible2" :before-close="handleClose">
			<div>
				<el-form ref="form" label-width="150px">
					<p>添加新商品：</p>
					<el-form-item label="商品链接" style="display: block;width: 350px;margin-bottom: 8px!important;">
						<el-input v-model="goodsUrl"></el-input>
					</el-form-item>
					<el-form-item label="优惠券链接" style="display: block;width: 350px;margin-bottom: 8px!important;">
						<el-input v-model="quanUrl"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addGoods()">添加</el-button>
						<input id="file3" type="file" style="display: none" @change="uploadImg($event,1)" multiple accept="image/*">
						<label for="file3" style="color: #0f8edd;font-size: 14px;margin-left: 14px;">CVS一键上传</label>
					</el-form-item>
					<p style="margin-left: 14px;margin-bottom: 10px;">商品列表：</p>
					<div>
						<el-table ref="multipleTable" :data="seekList" tooltip-effect="dark" style="width: 100%;text-align: center;" border>
							<el-table-column label="商品" height="95" width="80">
								<template slot-scope="scope">
									<img :src="scope.row.thumb_url" alt="" style="width:50px;height:50px;margin-top: 5px;">
								</template>
							</el-table-column>
							<el-table-column prop="product_name" label="商品名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column label="价格" width="100" prop="reserve_price"></el-table-column>
							<el-table-column label="券额" width="100" prop="coupon_number">
							</el-table-column>

							<el-table-column prop="coupon_number" label="操作" width="80">
								<template slot-scope="scope">
									<el-button  type="text" size="small" class="pros" @click="delGoods(scope.row.id)">删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination @current-change="handleCurrentChange2" page-size=10 layout="prev, pager, next, jumper" :page-count="totalPage2" style="display: inline-block;float: right;margin-top: 10px;">
					</el-pagination>
					</div>
				</el-form>

			</div>
			<!--<span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="save()">保存</el-button>
    <el-button @click="close()">取 消</el-button>
  </span>-->
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				title: "添加品牌",
				totalPage: 1,
				total_count: 0,
				goodsList: [],
				goods_id: [],
				options1: [{
						value: '0',
						label: '全部'
					},
					{
						value: '1',
						label: '精选'
					},
					{
						value: '2',
						label: '普通'
					}
				],
				data: {
					type: '',
					page: 1,
					limit: 20
				},
				adddata: {
					name: '',
					logo: '',
					is_index: false,
					image: '',
					id: ''
				},
				seekList:[],
				page2:1,
				totalPage2: 1,
				total_count2: 0,
				dialogVisible: false,
				dialogVisible2: false,
				defaultImg: 'this.src="' + require('../../../../static/img/default_img.png') + '"',
				id:'',
				goodsUrl:'',
				quanUrl:'',
			}
		},
		methods: {
			//      获取店铺列表
			getGoodsList: function() {
				this.$ajax.get('/api/merchantListBack', {
					params: this.data
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
			//获取店铺下的商品列表
			getList(){
				console.log('bbb')
				this.$ajax.get('/api/merProListBack', {
					params: {
						id:this.id,
						limit:10,
						page:this.page2
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.seekList = res.data.data.list
						this.totalPage2 = res.data.data.total_page
						this.total_count2 = res.data.data.total_count
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
				var data = []
				for(var i = 0; i < val.length; i++) {
					data.push(val[i].id);
				}
				this.goods_id = data;
			},
			//删除商品
			del(id) {
				var data = null
				if(id) {
					data = {
						id: [id]
					}
				} else {
					data = {
						id: this.goods_id
					}
				}
				this.$ajax.post('/api/delMerchant', data).then((res) => {
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
			//设置热门商品
			setIndex(id, status) {
				var data = null
				var type = null
				if(id) {
					if(status == 0) {
						type = 1
					} else {
						type = 0
					}
					data = {
						id: [id],
						type: type
					}

				} else {
					data = {
						id: this.goods_id,
						type: status
					}

				}
				this.$ajax.post('/api/setIndex', data).then((res) => {
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
			//            上传logo
			uploadImg: function(e, type) {
				const formData = new FormData();
				formData.append('image', e.target.files[0]);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				this.$ajax.post('api/merchantImage', formData, config).then((res) => {
					if(res.data.code == '200') {
						if(type == 1) {
							this.adddata.logo = res.data.data.image
						} else {
							this.adddata.image = res.data.data.image
						}

					}
				}, (err) => {})
			},
			//            页码改变
			handleCurrentChange(val) {
				//                获取当前页数的消息
				this.data.page = val
				this.getGoodsList()
			},
			//            页码改变
			handleCurrentChange2(val) {
				//                获取当前页数的消息
				this.page2 = val
				this.getList()
			},
			handleClose() {
				console.log('aaa')
				this.adddata = {
					name: '',
					logo: '',
					is_index: false,
					image: '',
					id: ''
				}
				this.id=''
				this.dialogVisible = false
				this.dialogVisible2 = false
			},
			close() {
				this.adddata = {
					name: '',
					logo: '',
					is_index: false,
					image: '',
					id: ''
				}
				this.id=''
				this.dialogVisible = false
				this.dialogVisible2 = false
			},
			//新增品牌
			save() {
				this.$ajax.post('/api/saveMerchant', this.adddata).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.dialogVisible = false
						this.adddata = {
							name: '',
							logo: '',
							is_index: false,
							image: '',
							id: ''
						}
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
			add() {
				this.title = "新增品牌"
				this.dialogVisible = true
			},
			edit(e) {
				this.title = "编辑品牌"
				this.adddata = e
				console.log(e)
				if(this.adddata.is_index == 0) {
					this.adddata.is_index = false
				} else {
					this.adddata.is_index = true
				}
				this.dialogVisible = true
			},
			//查看店铺下的商品列表
			seek(id) {
				this.dialogVisible2 = true
				this.id=id
				this.getList()
			},
			//删除店铺下的商品列表
			delGoods(id){
				this.$ajax.post("/api/delMerPro",{id:id}).then((res)=>{
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getList()
					} else if(res.data.code == "601") {
						this.$router.push('/login')
					} else {
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				},(err)=>{
					console.log(err)
				})
			},
			addGoods(){
				this.$ajax.post('/api/',{}).then((res)=>{
					
				},(err)=>{
					
				})
			},
			//同步商品
			same(){
				this.$ajax.post("/api/insertMerchantPro").then((res)=>{
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
				},(err)=>{
					console.log(err)
				})
			}
		},
		mounted() {

		},
		created: function() {
			this.getGoodsList()
		}
	}
</script>

<style scoped>
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
	
	.inputs {
		width: 70px;
		padding: 0 0 0 10px;
		height: 28px;
		line-height: 28px;
		border-radius: 4px;
		outline: none;
		box-sizing: border-box;
		border: 1px solid rgb(191, 217, 216);
	}
	
	.pros {
		padding: 0 10px;
		cursor: pointer;
		color: #0f8edd;
		line-height: 24px;
	}
	
	.logo {
		width: 80px;
		height: 80px;
	}
	
	.image {
		width: 250px;
		height: 118px;
	}
	
	.operate {
		font-size: 14px;
		color: #0f8edd;
		position: absolute;
		top: 0;
		left: 90px;
	}
	
	.operates {
		font-size: 14px;
		color: #0f8edd;
		position: absolute;
		top: 0;
		left: 260px;
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
	
	.el-tabs__active-bar {
		background-color: #0f8edd!important;
	}
	
	.el-tabs__item {
		color: #54667a!important;
		font-size: 20px!important;
		height: 60px!important;
		line-height: 60px!important;
		padding: 0 20px!important;
	}
	
	.el-tabs__item.is-active {
		color: #54667a!important;
	}
</style>