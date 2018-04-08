<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">编辑优选商品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="status" style="min-height: 500px;" @tab-click="handleClick">
				<el-tab-pane label="待发列表" name="0">
					<el-button type="primary" style="background-color: #0f8edd;border-color: #0f8edd;" @click="same()">一键同步
					</el-button>
					<p style="font-size: 14px; color: #54667a;margin-top: 16px;">优选文章共<span style="color: #FC4B6C;">{{total_count}}</span>篇</p>
					<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-top: 12px;border-bottom: 0;">
						<el-button type="primary" round @click="del()">删除</el-button>
					</div>
					<el-table ref="multipleTable" :data="goodsList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="50" height="95">
						</el-table-column>
						<el-table-column label="商品" height="95" width="80">
							<template slot-scope="scope">
								<img :src="scope.row.pict_url" alt="" style="width:50px;height:50px;margin-top: 5px;">
							</template>
						</el-table-column>
						<el-table-column label="商品名称" show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.title }}</template>
						</el-table-column>
						<el-table-column label="价格" width="100">
							<template slot-scope="scope">￥{{scope.row.zk_final_price }}</template>
						</el-table-column>
						<el-table-column label="券额" show-overflow-tooltip width="100">
							<template slot-scope="scope">￥{{scope.row.coupon_number }}</template>
						</el-table-column>
						<el-table-column prop="time" label="发布时间" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="edit(scope.row.id,scope.row.msg)" type="text" size="small" class="pros">编辑文案
								</el-button>
								<el-button @click="del2(scope.row.id)" type="text" size="small" class="pros">删除
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
				<el-tab-pane label="已发布" name="1">
						<el-button type="primary" style="background-color: #0f8edd;border-color: #0f8edd;" @click="same()">一键同步
					</el-button>
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
						<el-table-column label="商品名称" show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.title }}</template>
						</el-table-column>
						<el-table-column label="价格" width="100">
							<template slot-scope="scope">￥{{scope.row.zk_final_price }}</template>
						</el-table-column>
						<el-table-column label="券额" show-overflow-tooltip width="100">
							<template slot-scope="scope">￥{{scope.row.coupon_number }}</template>
						</el-table-column>
						<el-table-column prop="time" label="发布时间" show-overflow-tooltip width="150">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="seek(scope.row.id,scope.row.msg)" type="text" size="small" class="pros">查看文案
								</el-button>
								<el-button @click="del2(scope.row.id)" type="text" size="small" class="pros">删除
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
			<div class="ms-doc_main">

			</div>
		</div>
		<!--编辑文案弹出框-->
		<el-dialog title="编辑文案" :visible.sync="dialogVisible"  :before-close="handleClose">	
				<div>
					<p class="model_name">文案内容：</p>
						<el-input type="textarea" :rows="6" placeholder="" v-model="msg" style="width: 100%;margin: 10px 0 20px;">
						</el-input>
			</div>
			<span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="saveMsg()">保存</el-button>
    <el-button @click="close()">取 消</el-button>
  </span>
		</el-dialog>
		<!--查看文案弹出框-->
		<el-dialog title="编辑文案" :visible.sync="dialogVisible2"  :before-close="handleClose">	
				<div>
					<p class="model_name">文案内容：</p>
						<el-input type="textarea" :rows="6" placeholder="" v-model="msg" style="width: 100%;margin: 10px 0 20px;" disabled>
						</el-input>
			</div>
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
				totalPage: 1,
				goodsList: [],
				dialogVisible: false,
				dialogVisible2: false,
				product_id: [],
				status: "0",
				total_count:0,
				msg:'',
				id:'',
			}
		},
		methods: {
			//      获取商品列表列表
			getGoodsList: function() {
				this.$ajax.get('/api/oneShareList', {
					params:{
					status:this.status,
					page: this.page,
					limit: this.limit
				}
				}).then((res) => {
					if(res.data.code == '200') {
						this.goodsList = res.data.data.list
						this.totalPage = res.data.data.total_page
						this.total_count = res.data.data.total_count
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
			//      一键同步
			same: function() {
				this.$ajax.post('/api/Share', {
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getGoodsList()
					}else if(res.data.code=="601"){
				        this.$router.push('/login')
					}else{
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				}, (err) => {
				})
			},
			//一键删除所选商品
			del() {
				this.$ajax.post('/api/deletelOneShare', {
						id: this.product_id
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getGoodsList()
					} else if(res.data.code=="601"){
				        this.$router.push('/login')
					}else {
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
			del2(id) {
				this.$ajax.post('/api/deletelOneShare', {
						id: [id]
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getGoodsList()
					} else if(res.data.code=="601"){
				        this.$router.push('/login')
					}else {
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				}, (err) => {
					console.log(err)
				})
			},
			//保存文档
			saveMsg(){
				this.$ajax.post('/api/saveMsg', {
					id:this.id,
					msg:this.msg,
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.id=''
				        this.msg=""
						this.dialogVisible = false
						this.getGoodsList()
					}else if(res.data.code=="601"){
				        this.$router.push('/login')
					}else{
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				}, (err) => {
				})
			},
			edit(id,msg){
				this.id = id
				this.msg=msg
				this.dialogVisible = true
			},
			seek(id,msg){
				this.id = id
				this.msg=msg
				this.dialogVisible2 = true
			},
			handleClose(){
				this.id=''
				this.msg=""
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
			close() {
				this.id=""
				this.msg=""
				this.dialogVisible = false
				this.dialogVisible2 = false
			},
			
			
			//            页码改变
			handleCurrentChange(val) {
				//                获取当前页数的消息
				this.page = val
				document.getElementsByClassName('content')[0].scrollTop = 0
				document.documentElement.scrollTop = 0
				this.getGoodsList()
			},

			handleClick(tab) {
			     this.getGoodsList()
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
</style>
<style>
	
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
.el-form-item {
    margin-bottom: 12px!important;
    display: inline-block;
}
.el-form-item__content{
	margin-right: 20px;
}
.el-button+.el-button {
    margin-left:0px!important;
}

</style>