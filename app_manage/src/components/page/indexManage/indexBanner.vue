<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">海报图</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="activeName" style="min-height: 500px;">
				<el-tab-pane label="首页轮播图" name="first">
					<div class="left_main">
						<div style="margin-bottom: 20px;" v-for="(i,index) in bannerList">
							<div style="position: relative;">
								<span style="font-size: 14px;margin-left: 15px;position: absolute;"> 轮播图：</span>
								<div class="upload_img">
									<img :src="i.image" alt="" style="width: 100%;height: 100%;">
								</div>
								<input :id="'banner'+index" type="file" style="display: none" @change="uploadImg($event,index)" multiple accept="image/*">
								<label :for="'banner'+index" class="upload_btn">上传图片</label><span style="font-size: 14px;color: #999999;position: absolute;bottom: 20px;">(格式JPG、JPEG、PNG，文件大小100k以内，建议尺寸750PX*260PX)</span>
							</div>
							<span style="font-size: 14px;">跳转链接：</span>
							<el-input placeholder="请输入链接" v-model="i.click_url" style="width: 300px;margin:0 10px;">
								<!--<template slot="prepend">http://</template>-->
							</el-input>
							<el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;" @click="saveBanner(index)">保存
						</el-button>
						<el-button type="danger" @click="del1(index)">删除组</el-button>
						</div>
						<el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;margin-left: 84px;" @click="add1()">增加组
						</el-button>
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
				indexs: 0,
				name: '',
				bannerList: [{
					image: '',
					click_url: '',
				}],
				index: '',
				activeName:"first"
			}
		},
		methods: {
			//      获取banner列表
			getBannerList: function() {
				this.$ajax.get('/api/indexBannerList', {
					params:{
					type:"1",
				}
				}).then((res) => {
					if(res.data.code == '200') {
						this.bannerList = res.data.data
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
			//      保存banner
			saveBanner: function(index) {
				this.$ajax.post('/api/saveIndexBanner',this.bannerList[index]).then(
					(res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
					} else if(res.data.code=="601"){
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
			//            上传图片
			uploadImg: function(e, index) {
				const formData = new FormData();
				formData.append('image', e.target.files[0]);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				console.log(index)
				this.$ajax.post('api/uploadBanner', formData, config).then((res) => {
					if(res.data.code == '200') {
						this.bannerList[index].image = res.data.data.image
                        console.log(this.bannerList)
					}else if(res.data.code=="601"){
				        this.$router.push('/login')
					}else{
						this.$message({
							message: res.data.error,
							type: 'error'
						});
					}
				}, (err) => {})
			},
			add1() {
				this.bannerList.push({
					image: '',
					click_url: '',
					type:1,
				})
			},
			del1(index) {
				if(this.bannerList[index].id){
					this.$ajax.post('/api/delIndexBanner',{
						id:this.bannerList[index].id
					}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message
						});
						this.getBannerList()
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
				}else{
					this.bannerList.splice(index, 1)
				}
				
			},
		},
		mounted() {

		},
		created: function() {
			this.getBannerList()
		}
	}
</script>
<style scoped>
	
	.title small {
		color: #a6afbb;
		font-size: 14px;
		margin-left: 10px;
	}
	
	.right {
		float: left;
		background-color: white;
		width: 510px;
		padding: 0 20px;
	}
	
	.upload_img,.upload_img2 {
		width: 250px;
		height: 86px;
		background:#f2f7f8;;
		/*background-image: url("/static/img/upload_img_bd.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;*/
		display: inline-block;
		margin: 0px 10px 20px 88px;
	}
	.upload_img2{
		height: 60px;
		
	}
	
	.upload_btn {
		height: 28px;
       line-height: 28px;
       font-size: 14px;
		position: absolute;
		display: inline-block;
		color: #0f8edd;
	}
</style>
<style>
	.el-carousel__button {
		display: block;
		width: 5px;
		height: 5px;
		background-color: #fff;
		border-radius: 50%;
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