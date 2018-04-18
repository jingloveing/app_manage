<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">商品列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<p class="m_title">全部特供商品</p>
			<div class="ms-doc_main">
				<el-form ref="form" label-width="83px" style="color: #848c97;">
					<el-form-item label="商品状态：">
						<el-select v-model="data.sale" placeholder="全部" style="width: 148px;">
							<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品等级：">
						<el-select v-model="data.level" placeholder="全部" style="width: 148px;">
							<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" @click="getGoodsList()">搜索
					</el-button>
					<el-button type="primary" @click="add()" style="margin-left: 30px!important;">添加商品
					</el-button>
				</el-form>
				<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-top: 12px;border-bottom: 0;">
					<el-button type="primary" @click="del()">删除</el-button>
					<el-button type="primary" @click="setTeSale('',true)">批量上架</el-button>
					<el-button type="primary" @click="setTeSale('',false)">批量下架</el-button>
				</div>
				<el-table ref="multipleTable" :data="goodsList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange" v-loading="loading">
					<el-table-column type="selection" width="50" height="95">
					</el-table-column>
					<el-table-column label="商品" height="95" width="80">
						<template slot-scope="scope">
							<img :src="scope.row.pict_url" alt="" style="width:50px;height:50px;margin-top: 5px;">
						</template>
					</el-table-column>
					<el-table-column prop="product_name" label="商品名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="价格" width="100">
						<template slot-scope="scope">
							<span style="color: #fc4b6c;">￥{{scope.row.reserve_price}}</span>
						</template>
					</el-table-column>
					<el-table-column label="商品等级" width="100">
						<template slot-scope="scope">
							<span v-text="scope.row.level==1?'长老特供':'帮主特供'"></span>
						</template>
					</el-table-column>
					<el-table-column label="商品状态" width="100">
						<template slot-scope="scope">
							<span v-text="scope.row.is_sale==0?'未上架':'上架中'"></span>
						</template>
					</el-table-column>
					<el-table-column label="更新时间" width="150" prop="update_time">
					</el-table-column>
					<el-table-column prop="coupon_number" label="操作" width="180">
						<template slot-scope="scope">
							<el-button type="text" size="small" class="pros" v-text="scope.row.is_sale==0?'上架':'下架'" @click="setTeSale(scope.row.id,scope.row.is_sale)"></el-button>
							<el-button @click="edit(scope.row.id)" type="text" size="small" class="pros">编辑</el-button>
							<el-button @click="del(scope.row.id)" type="text" size="small" class="pros">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;overflow: hidden;">
					<el-button type="primary" @click="del()">删除</el-button>
					<el-button type="primary" @click="setTeSale('',true)">批量上架</el-button>
					<el-button type="primary" @click="setTeSale('',false)">批量下架</el-button>
					<el-pagination @current-change="handleCurrentChange" :page-size=data.limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
					</el-pagination>
				</div>
			</div>
		</div>
		<!--新增商品弹出框-->
		<el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose" class="special-dialog">
			<div>
				<el-form ref="form" label-width="150px">
					<el-form-item label="商品标题：" style="display: block;width: 100%;">
						<div style="position: relative;">
							<el-input :maxlength="length" v-model="adddata.product_name" style="width: 90%;" :input="change()"></el-input><span style="position: absolute;">{{size}}/60</span>
						</div>
					</el-form-item>
					<el-form-item label="商品主图：" style="display: block;width: 100%;">
						<p style="font-size: 14px;color: #999;">大小建议1MB以内；尺寸建议750PX*750PX以上</p>
						<el-upload name="image" :file-list="adddata.pict_url" :action="upload" :onError="uploadError" :onSuccess="uploadSuccess" :beforeUpload="beforeUpload" list-type="picture-card" :on-remove="handleRemove" :headers="headers">
							<img src="/static/img/exchange_add_img2.png" alt="" style=" width: 100px;height: 100px;">
						</el-upload>
					</el-form-item>
					<el-form-item label="商品价格及库存：" style="display: block;width: 100%;">
						<div>
							价格：
							<el-input style="width: 100px;" v-model="adddata.reserve_price"></el-input> (元)
						</div>
						<div>
							库存：
							<el-input style="width: 100px;" v-model="adddata.stock"></el-input> (件)
						</div>
					</el-form-item>
					<el-form-item label="商品级别：" style="display: block;width: 100%;">
						<el-radio v-model="adddata.level" label="1">长老特供</el-radio>
                        <el-radio v-model="adddata.level" label="2">帮主特供</el-radio>
					</el-form-item>
					<el-form-item label="商品详情页：" style="display: block;width: 100%;">
						<p style="font-size: 14px;color: #999;display: inline-block;">图片大小建议10M; 宽750PX,可多张图片</p>
						<el-upload name="image" :file-list="adddata.small_images" :action="upload" :onError="uploadError" :onSuccess="uploadSuccess2" :beforeUpload="beforeUpload" list-type="picture-card" :on-remove="handleRemove2" :headers="headers">
							<img src="/static/img/exchange_add_img2.png" alt="" style=" width: 100px;height: 100px;">
						</el-upload>
					</el-form-item>
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
				upload: '/api/selfUpload',
				title: "添加品牌",
				totalPage: 1,
				goodsList: [],
				goods_id: [],
				options1: [{
						value: '',
						label: '全部'
					},
					{
						value: '1',
						label: '上架中'
					},
					{
						value: '0',
						label: '未上架'
					}
				],
				options2: [{
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
				data: {
					sale: '',
					level: '',
					page: 1,
					limit: 20
				},
				adddata: {
					product_name: '',
					pict_url: [],
					small_images: [],
					stock: '',
					level: '1',
					reserve_price: ''
				},
				dialogVisible: false,
				defaultImg: 'this.src="' + require('../../../../static/img/default_img.png') + '"',
				size: 0,
				length:60,
				loading:false,
			}
		},
		computed:{
			headers(){
				return{
					token:sessionStorage.getItem("token")
				}
			}
		},
		methods: {
			//      获取特供商品列表
			getGoodsList() {
				this.loading=true
				this.$ajax.get('/api/teListBack', {
					params: this.data
				}).then((res) => {
					if(res.data.code == '200') {
						this.goodsList = res.data.data.list
						this.totalPage = res.data.data.total_page
					} else if(res.data.code == "601") {
						this.$router.push('/login')
					} else {
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
						this.loading=false
				}, (err) => {
					this.loading=false
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
				this.$ajax.post('/api/delTe', data).then((res) => {
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
			//商品上下架
			setTeSale(id, status) {
				var data = null
				var sale = null
				if(id) {
					if(status == 0) {
						sale = true
					} else {
						sale = false
					}
					data = {
						id: [id],
						sale: sale
					}

				} else {
					data = {
						id: this.goods_id,
						sale: status
					}

				}
				this.$ajax.post('/api/setTeSale', data).then((res) => {
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
			//            页码改变
			handleCurrentChange(val) {
				//                获取当前页数的消息
				this.data.page = val
				this.getGoodsList()
			},
			handleClose() {
				this.adddata = {
					product_name: '',
					pict_url: [],
					small_images: [],
					stock: '',
					level: '',
					reserve_price: ''
				}
				this.dialogVisible = false
			},
			close() {
				this.adddata = {
					product_name: '',
					pict_url: [],
					small_images: [],
					stock: '',
					level: '',
					reserve_price: ''
				}
				this.dialogVisible = false
			},
			//新增品牌
			save() {
				this.$ajax.post('/api/saveTeProduct', this.adddata).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.dialogVisible = false
						this.adddata = {
							product_name: '',
							pict_url: [],
							small_images: [],
							stock: '',
							level: '',
							reserve_price: ''
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
				this.title = "添加商品"
				this.dialogVisible = true
			},
			edit(e) {
				this.title = "编辑商品"
				this.$ajax.get("/api/teInfo", {
					params: {
						id: e
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.adddata = res.data.data
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
				this.dialogVisible = true
			},
			handleRemove(file, fileList) {
				console.log(file)
				if(file.response) {
					this.removeByValue(this.adddata.pict_url, file.response.data.image_url)
				} else {
					console.log('bbb')
					this.removeByValue(this.adddata.pict_url, file.url)
				}
			},
			// 上传成功后的回调
			uploadSuccess(res, file, fileList) {
				if (res.code=='200'){
					this.adddata.pict_url.push({'url':res.data[0].image})
				}
				else if(res.code=='601'){
					this.$router.push('/login')
				}
				else{
					this.$message({
					message: res.error,
					type: 'error'
				});
				}
			},
			handleRemove2(file, fileList) {
				console.log(file)
				if(file.response) {
					this.removeByValue(this.adddata.small_images, file.response.data.image_url)
				} else {
					this.removeByValue(this.adddata.small_images, file.url)
				}

			},
			// 上传成功后的回调
			uploadSuccess2(res, file, fileList) {
				if (res.code=='200'){
					this.adddata.small_images.push({url:res.data[0].image})
				}
				else if(res.code=='601'){
					this.$router.push('/login')
				}
				else{
					this.$message({
					message: res.error,
					type: 'error'
				});
				}
			},
			// 上传错误
			uploadError(response, file, fileList) {
				this.$message({
					message: '上传失败!',
					type: 'error'
				});
			},
			// 上传前对文件的大小的判断
			beforeUpload(file) {
				const extension = file.name.split('.')[1] === 'jpg'
				const extension2 = file.name.split('.')[1] === 'png'
				const isLt3M = file.size / 1024 / 1024 < 3
				if(!extension && !extension2) {
					this.$message({
						message: '上传图片只能是jpg、png格式!',
						type: 'error'
					});
				}
				if(!isLt3M) {
					this.$message({
						message: '上传图片大小不能超过 3M!',
						type: 'error'
					});
				}
				return extension || extension2 && isLt3M
			},
			//            删除图片数组中的指定值的元素
			removeByValue(arr, val) {
				console.log(val)
				for(var i = 0; i < arr.length; i++) {
					if(arr[i].url == val) {
						arr.splice(i, 1);
						break;
					}
				}
				console.log(arr)
			},
			change() {
				if(this.adddata.product_name.length <= 60) {
					this.size = this.adddata.product_name.length
				} else {
					this.size = 60
				}
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
		width: 100%;
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
	
	.el-upload--picture-card {
		border: none;
		background: white;
	}
	
	.el-upload-list--picture-card .el-upload-list__item {
		margin: 0 10px 0 0;
	}
	
	.el-upload-list--picture-card .el-upload-list__item,
	.el-upload--picture-card {
		width: 100px;
		height: 100px;
	}
</style>