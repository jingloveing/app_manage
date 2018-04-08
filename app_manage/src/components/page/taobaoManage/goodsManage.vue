<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">商品管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="ms-doc">
			<p class="m_title">淘宝区商品列表</p>
			<div class="ms-doc_main">
				<el-form ref="form" label-width="83px" style="color: #848c97;">
					<div>
						<el-form-item label="商品名称：">
							<input type="text" class="product_name" v-model="data.title">
						</el-form-item>
						<el-form-item label="更新时间：">
							<el-date-picker v-model="data.time_start" type="date" placeholder="开始时间" class="time_tab time" @change="startChange" value-format="yyyy-MM-dd"></el-date-picker>
							-
							<el-date-picker v-model="data.time_end" type="date" placeholder="结束时间" class="time" @change="endChange" value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</div>
					<div>
						<el-form-item label="价格：">
						<span class="time_tab"><input type="number" class="inputs" v-model="data.price_min">-<input type="number" class="inputs" v-model="data.price_max"></span>

					</el-form-item>
					<el-form-item label="佣金：">
						<span class="time_tab"><input type="number" class="inputs" v-model="data.commission_min">-<input type="number"
                                                                                                   class="inputs" v-model="data.commission_max"></span>

					</el-form-item>
					<el-form-item label="佣金比：">
						<span class="time_tab"><input type="number" class="inputs" v-model="data.rate_min">-<input type="number" class="inputs" v-model="data.rate_max"></span>

					</el-form-item>
					<el-form-item label="券额：">
						<span class="time_tab"><input type="number" class="inputs" v-model="data.coupon_min">-<input type="number" class="inputs" v-model="data.coupon_max"></span>

					</el-form-item>
					</div>
					<div>
						<el-form-item label="商品状态：">
						<el-select v-model="data.sale" placeholder="全部" style="width: 148px;">
							<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>

					</el-form-item>
					<el-form-item label="类目分类：">
						<el-select v-model="data.product_type" placeholder="全部" style="width: 148px;">
							<el-option v-for="item in options2" :key="item.id" :label="item.cate_name" :value="item.id">
							</el-option>
						</el-select>

					</el-form-item>
					<el-form-item label="专场分类：">
						<el-select v-model="data.store_type" placeholder="全部" style="width: 148px;">
							<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					</div>
                    <el-button type="primary" style="margin-left: 83px;" @click="getGoodsList()">搜索
                    </el-button>
                    <span style="font-size: 14px;color: #999;margin-left: 16px;" @click="clear()">清空条件</span>
				</el-form>
				<p style="font-size: 14px; color: #54667a;margin-top: 16px;">商品库存共<span style="color: #FC4B6C;">{{total_count}}</span>件</p>
				<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-top: 12px;border-bottom: 0;">
					<el-button type="primary" @click="del()">删除</el-button>
					<el-button type="primary" @click="setHot()">设置热门</el-button>
					<el-button type="primary" @click="setSale('',1)">批量上架</el-button>
					<el-button type="primary" @click="setSale('',0)">批量下架</el-button>
					<el-select v-model="cate" placeholder="类目分类" style="width: 110px;margin-left: 40px;">
						<el-option v-for="item in options2" :key="item.id" :label="item.cate_name" :value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="classify" placeholder="专场分类" style="width: 110px;margin-right: 8px;">
						<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" @click="saveSet()">保存</el-button>
				</div>
				<el-table ref="multipleTable" :data="goodsList" tooltip-effect="dark" style="width: 100%;text-align: center;" border @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="50" height="95">
					</el-table-column>
					<el-table-column label="商品" height="95" width="80">
						<template slot-scope="scope">
							<img :src="scope.row.pict_url" alt="" style="width:50px;height:50px;margin-top: 5px;">
							<p v-show="scope.row.is_hot==1" style="font-size: 12px;color: #fc4b6c;text-align: center;">热门</p>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="商品名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="价格" width="100" >
						<template slot-scope="scope">￥{{ scope.row.zk_final_price }}</template>
					</el-table-column>
					<el-table-column label="佣金" width="100">
						<template slot-scope="scope">￥{{ scope.row.commission}}</template>
					</el-table-column>
					<el-table-column label="拥金比" width="100">
						<template slot-scope="scope">￥{{ scope.row.commission_rate}}</template>
					</el-table-column>
					<el-table-column label="券额" width="100">
	                 <template slot-scope="scope">￥{{ scope.row.coupon_number}}</template>					
					</el-table-column>
					<el-table-column label="商品状态" width="100">
					  <template slot-scope="scope" >
					  	<span v-text="scope.row.is_sale==0?'未上架':'已上 架'"></span>
					  </template>
					</el-table-column>
					<el-table-column prop="coupon_number" label="操作" width="100">
						<template slot-scope="scope">
								<el-button @click="setSale(scope.row.id,scope.row.is_sale)" type="text" size="small" class="pros" v-text="scope.row.is_sale==0?'上架':'下架'">
								</el-button>
								<el-button @click="del(scope.row.id)" type="text" size="small" class="pros">删除
								</el-button>
								<el-button @click="" type="text" size="small" class="pros" @click="setHot(scope.row.id)" >设置热门
								</el-button>
							</template>
					</el-table-column>
				</el-table>
				<div style="padding: 12px 20px;border: 1px solid rgb(223, 236, 235);margin-bottom: 30px;border-top: 0;overflow: hidden;">
					<el-button type="primary" @click="del()">删除</el-button>
					<el-button type="primary" @click="setHot()">设置热门</el-button>
					<el-button type="primary" @click="setSale('',1)">批量上架</el-button>
					<el-button type="primary" @click="setSale('',0)">批量下架</el-button>
					<el-select v-model="cate" placeholder="类目分类" style="width: 110px;margin-left: 40px;">
						<el-option v-for="item in options2" :key="item.id" :label="item.cate_name" :value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="classify" placeholder="专场分类" style="width: 110px;margin-right: 8px;">
						<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" @click="saveSet()">保存</el-button>
					<el-pagination @current-change="handleCurrentChange" :page-size=data.limit layout="prev, pager, next, jumper" :page-count="totalPage" style="display: inline-block;float: right;">
					</el-pagination>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				totalPage: 1,
				total_count:0,
				goodsList: [],
				data: {
					page: 1,
					limit: 20,
					title:'',
					sale:'',
					product_type:'',
					store_type:'',
					time_start:'',
					time_end:'',
					price_min:'',
					price_max:'',
					commission_min:'',
					commission_max:'',
					rate_min:'',
					rate_max:'',
					coupon_min:'',
					coupon_max:'',
				},
				goods_id: [],
				options1: [{
						value: '',
						label: '全部'
					},
					{
						value: '1',
						label: '已上架'
					},
					{
						value: '0',
						label: '未上架'
					}
				],
				options2: [],
				options3: [{
						value: '',
						label: '全部'
					},
					{
						value: '5',
						label: '9.9特价'
					},
					{
						value: '6',
						label: '大额券'
					},
					{
						value: '7',
						label: '聚划算'
					}
				],
				cate:'',
				classify:'',
			}
		},
		methods: {
			//      获取商品列表
			getGoodsList: function() {
				this.$ajax.get('/api/tbProList',{
					params:this.data
				}).then((res) => {
					if(res.data.code == '200') {
						this.goodsList = res.data.data.list
						this.totalPage = res.data.data.total_page
						this.total_count=res.data.data.total_count
					}
				}, (err) => {
					console.log(err)
				})
			},
			//      获取商品分类列表
			getCateList: function() {
				this.$ajax.get('/api/tbCateList').then((res) => {
					if(res.data.code == '200') {
						this.options2 = res.data.data
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
				var data=null
				if(id){
					data={
						id:[id]
					}
				}else{
					data={
						id:this.goods_id
					}
				}
				this.$ajax.post('/api/delTbProduct', data).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getGoodsList()
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
			setHot(id) {
				var data=null
				var type=null
				if(id){
					if(status==0){
						type=1
					}else{
						type=0
					}
					data={
						id:[id],
						type:type
					}
					
				}else{
					data={
						id:this.goods_id,
						type:status
					}
					
				}
				this.$ajax.post('/api/setTbHot', data).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getGoodsList()
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
			//上下架商品
			setSale(id,status) {
				var data=null
				var type=null
				if(id){
					if(status==0){
						type=1
					}else{
						type=0
					}
					data={
						id:[id],
						type:type
					}
					console.log(data)
				}else{
					data={
						id:this.goods_id,
						type:status
					}
					console.log(data)
				}
				this.$ajax.post('/api/setTbSale', data).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getGoodsList()
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
			//      设置商品/专场分类
			saveSet() {
				this.$ajax.post('/api/setTbType',{
					product:this.cate,
					store:this.classify,
					id:this.goods_id
				}).then((res) => {
					if(res.data.code == '200') {
						this.$message({
							message: res.data.data.message,
							type: 'success'
						});
						this.getGoodsList()
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
			startChange(e){
                this.data.time_start=e
            },
            endChange(e){
                this.data.time_end=e
            },
            //清空搜索条件
            clear(){
            	this.data={
					page: 1,
					limit: 20,
					title:'',
					sale:'',
					product_type:'',
					store_type:'',
					time_start:'',
					time_end:'',
					price_min:'',
					price_max:'',
					commission_min:'',
					commission_max:'',
					rate_min:'',
					rate_max:'',
					coupon_min:'',
					coupon_max:'',
				}
            }
		},
		mounted() {

		},
		created: function() {
			this.getGoodsList()
			this.getCateList()
		}
	}
</script>

<style scoped>
	
	.product_name{
		height: 28px;line-height: 28px;border-radius: 4px;outline: none;border: 1px solid rgb(191, 217, 216);width: 148px;padding: 0 10px;box-sizing: border-box;
	}
	.inputs{
		width: 70px;
		padding:0 0 0 10px;
		height: 28px;line-height: 28px;
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