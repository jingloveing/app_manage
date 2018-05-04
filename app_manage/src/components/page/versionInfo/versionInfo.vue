<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">版本通知</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<el-tabs v-model="status" style="min-height: 500px;">
				<el-tab-pane label="版本升级" name="0">
					<div class="ms-doc_main">
						<p>1.安卓版本升级</p>
						<el-form :model="android" label-width="80px" style="max-width: 520px;margin-top: 20px;">
							<el-form-item label="版本号:" class="version-from">
								<el-input v-model="android.app_version"></el-input>
							</el-form-item>
							<el-form-item label="版本大小:" class="version-from">
								<el-input v-model="android.app_size"></el-input>
							</el-form-item>
							<el-form-item label="更新内容:" class="version-from">
								<el-input type="textarea" v-model="android.upgrade_msg" :rows="5"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary"  @click="androidSubmit()">发布</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div class="ms-doc_main">
                         <p>1.ios版本升级</p>
						<el-form :model="ios" label-width="80px" style="max-width: 520px;margin-top: 20px;">
							<el-form-item label="版本号:" class="version-from">
								<el-input v-model="ios.app_version"></el-input>
							</el-form-item>
							<el-form-item label="版本大小:" class="version-from">
								<el-input v-model="ios.app_size"></el-input>
							</el-form-item>
							<el-form-item label="更新内容:" class="version-from">
								<el-input type="textarea" v-model="ios.upgrade_msg" :rows="5"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary"  @click="iosSubmit()">发布</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-tab-pane>
				<el-tab-pane label="享利客通知" name="1">
					<div class="ms-doc_main">
                          <el-form label-width="80px" style="max-width: 520px;margin-top: 20px;">
							<el-form-item label="通知内容:" class="version-from">
								<el-input type="textarea" v-model="msg.msg" :rows="10"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary"  @click="publish(msg)">发布</el-button>
								<el-button type="danger"  @click="close(msg.id)" >关闭</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	let echarts = require('echarts');
	export default {
		components: {},
		data() {
			return {
				status: '0',
                ios:{
                	id:'',
                	app_version:'',
                	app_size:'',
                	upgrade_msg:'',
                },
                android:{
                	id:'',
                	app_version:'',
                	app_size:'',
                	upgrade_msg:'',
                },
                msg:{
                	id:'',
                	msg:'',
                }
			}
		},
		methods: {
			// 获取版本信息
			getVersion: function() {
				this.$ajax.get("/api/appVersionBack").then((res) => {
					if(res.data.code == '200') {
						this.ios = res.data.data.ios
						this.android=res.data.data.android
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
			// 获取通知信息
			getMsg: function() {
				this.$ajax.get("/api/getIndexMessageBack").then((res) => {
					if(res.data.code == '200') {
						this.msg = res.data.data
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
			publish(item){
				this.$ajax.post("/api/getIndexMessageBack",item).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
						});
						this.getMsg()
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
			close(id){
				console.log(id)
				if(id==''){
					return;
				}
				this.$confirm('关闭通知后，通知将被清空，是否确认关闭?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$ajax.post("/api/closeIndexMessageBack",{id:id}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
						});
						this.getMsg()
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
					
				}).catch(() => {
					
				});
				
			},
			submit(item){
				this.$ajax.post("/api/appVersionBack",{versionInfo:item}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
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

				})
			},
            androidSubmit(){
            	this.submit(this.android)
            },
            iosSubmit(){
            	this.submit(this.ios)
            },
		},
		mounted() {

		},
		created: function() {
             this.getVersion()
             this.getMsg()
		}
	}
</script>

<style scoped>
    .version-from{
    	display: block;
    }
</style>