<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">分享夺宝</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="activeName" style="min-height: 500px;">
				<el-tab-pane label="图片管理" name="first">
					<div>
						<p style="margin-bottom: 20px;">现有模板:</p>
						<div style="overflow: hidden;">
							<div v-for="(item,index) in shareList" :key="index" class="old-list">
								<div class="old-cancel" @click="delData(item.id)">
									<img src="../../../../dist/static/img/cancel_img.png" alt="" />
								</div>
								<img :src="item.image" alt="" style="width: 150px;height: 225px;" />
							</div>
						</div>
					</div>
					<div style="margin-top:40px;">
						<p style="margin-bottom: 20px;">新增模板:</p>
						<el-upload class="shareImage-upload" name="image" :file-list="list" :action="upload" :onError="uploadError" :onSuccess="uploadSuccess" :beforeUpload="beforeUpload" list-type="picture-card" :on-remove="handleRemove" :headers="headers">
							<img src="/static/img/exchange_add_img2.png" alt="" style="width: 100%;height: 100%;">
						</el-upload>
						<div style="margin-top: 20px;">
							<el-button type="primary" @click="save()">保存</el-button>
							<span style="font-size: 14px;color: #999;">(建议尺寸504PX*756PX,文件大小100K以内)</span>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>

		</div>
	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				upload: '/api/shareBackUpload',
				list: [],
				activeName: "first",
				shareList: []
			}
		},
		computed: {
			headers() {
				return {
					token: sessionStorage.getItem("token")
				}
			}
		},
		methods: {
			//      获取分享图片列表
			getShareList: function() {
				this.$ajax.get('/api/getShareListBack').then((res) => {
					if(res.data.code == '200') {
						this.shareList = res.data.data
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
			//      删除原有分享图片
			delData: function(id) {
				this.$confirm('是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$ajax.post('/api/delShareListBack', {
					id: id
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
						});
						this.getShareList()
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
					
					
				}).catch(() => {
					
				});
				
			},
			save(){
				if(this.list.length==0){
					this.$message({
							message: "请上传图片",
							type: 'error'
						});
						return;
				}
				this.$ajax.post('/api/doInsertShareBack',{list:this.list}).then((res)=>{
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
						});
						this.list=[]
						this.getShareList()
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
			handleRemove(file, fileList) {
				if(file.response) {
					this.removeByValue(this.list, file.response.data.image_url)
				} else {
					this.removeByValue(this.list, file.url)
				}
			},
			// 上传成功后的回调
			uploadSuccess(res, file, fileList) {
				console.log(res)
				if(res.code == '200') {
					this.list.push(res.data[0].image)
				} else if(res.code == '601') {
					this.$router.push('/login')
				} else {
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
		},
		mounted() {

		},
		created: function() {
			this.getShareList()
		}
	}
</script>
<style scoped>
	.old-list {
		position: relative;
		float: left;
		margin-right: 10px;
		width: 150px;
		height: 225px;
	}
	
	.old-cancel {
		position: absolute;
		right: 0;
		top: 0;
	}
	
	.old-cancel>img {
		width: 25px;
		height: 25px;
	}
</style>
<style>
	.shareImage-upload .el-upload--picture-card {
		width: 150px;
		height: 225px;
	}
	
	.shareImage-upload .el-upload-list--picture-card .el-upload-list__item {
		width: 150px;
		height: 225px;
	}
</style>