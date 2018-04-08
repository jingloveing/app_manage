<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">兑换商城管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <p class="m_title">商品列表</p>
            <div class="ms-doc_main">
                <div>
                    <el-button type="primary" style="background-color: #0f8edd;border-color: #0f8edd;"
                               @click="add()">添加商品
                    </el-button>
                    <el-select v-model="value1" placeholder="类型" style="width: 160px;margin:0 20px;">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value2" placeholder="状态" style="width: 160px;margin-right: 20px;">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style="background-color: #0f8edd;border-color: #0f8edd;"
                               @click="getGoodsList()">筛选
                    </el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="goodsList"
                    tooltip-effect="dark"
                    style="width: 100%;text-align: center;margin: 20px 0;"
                    border
                    height="480"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="50" height="95">
                    </el-table-column>
                    <el-table-column
                        label="商品" height="95" width="110">
                        <template slot-scope="scope">
                            <img :src="scope.row.product_image" alt="" style="width:76px;height:76px;margin-top: 5px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="标题"
                        width="150"
                        show-overflow-tooltip>
                        <template slot-scope="scope">{{ scope.row.product_name }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="market_price"
                        label="市场价/元" width="100">
                    </el-table-column>
                    <el-table-column
                        prop="exchange_acer"
                        label="元宝兑换价/个"
                        show-overflow-tooltip width="130">
                    </el-table-column>
                    <el-table-column
                        prop="stock"
                        label="库存量"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-text="scope.row.product_type==1?'虚拟':'实物'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-text="scope.row.is_sale==1?'上架':'未上架'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作" width="140">
                        <!--上架---下架-->
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row.product_id)" type="text" size="small" class="pros">编辑
                            </el-button>
                            <el-button @click="change(scope.row.product_id,scope.row.is_sale)" type="text" size="small"
                                       class="pros" v-text="scope.row.is_sale==1?'下架':'上架'">上架
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center;">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size=limit
                        layout="prev, pager, next, jumper"
                        :page-count="totalPage" style="margin-bottom: 30px;">
                    </el-pagination>
                    <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;"
                               @click="changeAll(1)">一键上架
                    </el-button>
                    <el-button type="danger" round @click="changeAll(2)">一键下架</el-button>
                    <el-button type="danger" @click="del()">删除</el-button>
                </div>
            </div>
        </div>
        <div class="ms-doc sort">
            <p class="m_title">兑换说明</p>
            <div class="ms-doc_main">
                <div>兑换页说明</div>
                <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入说明内容"
                    v-model="exchangeBrief" style="width: 488px;margin: 20px 20px 20px 0;">
                </el-input>
                <pre style="font-size: 14px;color: #a6b7bf;display: inline-block;padding-bottom: 50px;">例如：
    成功提交后奖品将在1~3个工作日内发送至提交账户内。
    实物奖品将在1~3个工作日内发货。请耐心等待并在我的兑换内查看。
                </pre>
                <div style="text-align: center;">
                    <el-button type="primary" round
                               style="background-color: #0f8edd;border-color: #0f8edd;margin-left: 50px;"
                               @click="saveBrief()">保存
                    </el-button>

                </div>
            </div>
        </div>
        <!--添加商品弹出框-->
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <div>
                <p class="model_title">1.商城页展示图
                    <small>尺寸建议：主图300*200像素，详情图680*358像素；类型要求：jpg,png,3M内大小。</small>
                </p>
                <div class="imgList">
                    <div class="tab">
                        <input id="file1" type="file" style="display: none" @change="uploadImg1($event)" multiple
                               accept="image/*">
                        <label for="file1" style="display: inline-block;">
                            <div
                                style="width: 128px;height: 130px;background-image: url('/static/img/exchange_add_img1.png')">
                                <img :src="data.product_image" alt="" style=" width: 128px;height: 130px;">
                            </div>
                        </label>
                    </div>
                    <el-upload
                        name="images"
                        :file-list="small_images"
                        :action="upload"
                        :onError="uploadError"
                        :onSuccess="uploadSuccess"
                        :beforeUpload="beforeUpload"
                        list-type="picture-card"
                        :on-remove="handleRemove">
                        <img src="/static/img/exchange_add_img2.png" alt="" style=" width: 128px;height: 130px;">
                    </el-upload>
                </div>
                <div style="font-size: 0;overflow: hidden;">
                    <div style="width: 40%;float: left;">
                        <p class="model_title">2.商品价格及数量</p>
                        <p class="model_name">市场价值/元</p>
                        <el-input v-model="data.market_price" style="width: 180px;margin: 10px 0 20px;"></el-input>
                        <p class="model_name">元宝兑换价/个</p>
                        <el-input v-model="data.exchange_acer" style="width: 180px;margin: 10px 0 20px;"></el-input>
                        <p class="model_name">上传数量/件</p>
                        <el-input v-model="data.stock" style="width: 180px;margin: 10px 0 20px;"></el-input>
                    </div>
                    <div style="width: 60%;float: right;">
                        <p class="model_title">3.商品详情</p>
                        <div style="display: inline-block;margin-right: 10px;">
                            <p class="model_name">商品名称 </p>
                            <el-input v-model="data.product_name" style="width: 180px;margin: 10px 0 20px;"></el-input>
                        </div>
                        <div style="display: inline-block;">
                            <p class="model_name">商品类型</p>
                            <el-select v-model="data.goods_type" placeholder="请选择"
                                       style="width: 180px;margin: 10px 0 20px;">
                                <el-option
                                    v-for="item in options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <p class="model_name">商品详细介绍</p>
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入说明内容"
                            v-model="data.content" style="width: 100%;margin: 10px 0 20px;">
                        </el-input>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="close()">取 消</el-button>
    <el-button type="primary" @click="addGoods()"
               style="background-color: #0f8edd;border-color: #0f8edd;">保存</el-button>
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
                limit:15,
                totalPage:1,
                small_images:[],
                upload: '/api/Index/upload',
                goodsList: [],
                exchangeBrief: '',
                dialogVisible: false,
                input: '',
                options1: [
                    {
                        value: '0',
                        label: '全部商品'
                    },
                    {
                        value: '1',
                        label: '虚拟'
                    }, {
                        value: '2',
                        label: '实物'
                    }
                ],
                value1: '0',
                options2: [
                    {
                        value: '0',
                        label: '全部状态'
                    }, {
                        value: '1',
                        label: '上架'
                    }, {
                        value: '2',
                        label: '未上架'
                    }
                ],
                value2: '0',
                dateValue1: '',
                product_id: [],
                options3: [
                    {
                        value: '0',
                        label: '选择类型'
                    }, {
                        value: '2',
                        label: '虚拟-提现'
                    }, {
                        value: '1',
                        label: '虚拟-充值'
                    }, {
                        value: '3',
                        label: '实物'
                    }
                ],
                imgUrl: [],
                data: {
                    small_images: [],
                    goods_type: '0',
                    product_name: '',
                    content: '',
                    stock: '',
                    market_price: '',
                    exchange_acer: '',
                    product_image: '',
                    product_id:'',
                },
                title:'添加兑换商品'
            }
        },
        methods: {
            //      获取商品列表列表
            getGoodsList: function () {
                this.$ajax.post('/api/Acerstore/acerList', {
                    product_type: this.value1,
                    is_sale: this.value2,
                    page:this.page,
                    limit:this.limit
                }).then((res) => {
                    if (res.data.code == '200') {
                        this.goodsList = res.data.data.acer_list
                        this.totalPage = res.data.data.total_page
                    }
                }, (err) => {
                    console.log(err)
                })
            },
            //     兑换商城兑换说明
            getExchangeBrief: function () {
                this.$ajax.get('/api/Acerstore/exchangeBrief').then((res) => {
                    if (res.data.code == '200') {
                        this.exchangeBrief = res.data.data.brief
                    }
                }, (err) => {
                    console.log(err)
                })
            },
//            修改兑换商城说明
            saveBrief() {
                this.$ajax.post('/api/Acerstore/exchangeBrief', {brief: this.exchangeBrief}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
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
            //            上下架商品
            change(id, status) {
                if (status == 1) {
                    status = 2
                } else {
                    status = 1
                }
                this.$ajax.post('/api/Acerstore/changeSale', {product_id: id, is_sale: status}).then((res) => {
                    if (res.data.code == '200') {
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
            //            一键上下键
            changeAll: function (e) {
                this.$ajax.post('/api/Acerstore/changeSale', {product_id: this.product_id, is_sale: e}).then((res) => {
                    if (res.data.code == '200') {
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
//            添加商品
            addGoods: function () {
                if (this.data.goods_type == '0') {
                    this.$message({
                        message: "请选择商品类型",
                        type: 'warning'
                    });
                    return
                } else {

                }
                if (this.data.product_image == '') {
                    this.$message({
                        message: "请上传图片",
                        type: 'warning'
                    });
                    return
                } else {

                }

                this.$ajax.post('/api/Acerstore/editProductAcer', this.data).then((res) => {
                    this.data = {}
                    this.small_images=[]
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.dialogVisible = false
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
//            新增
            add(){
                this.title='新增兑换商品'
                this.data={
                    small_images: [],
                        goods_type: '0',
                        product_name: '',
                        content: '',
                        stock: '',
                        market_price: '',
                        exchange_acer: '',
                        product_image: '',
                        product_id:'',
                }
                this.dialogVisible=true
            },
//            编辑商品
            edit(id){
                this.title='编辑兑换商品'
                this.data.product_id=id
                this.$ajax.get('/api/Acerstore/editProductAcer',{params:{product_id:id}}).then((res) => {
                    if (res.data.code == '200') {
                        this.data = res.data.data.product
                        for(var i=0;i<this.data.small_images.length;i++){
                            this.small_images.push({url:this.data.small_images[i]})
                        }
                        this.dialogVisible=true
                    }
                }, (err) => {
                    console.log(err)
                })

            },
            uploadImg1: function (e) {
                const formData = new FormData();
                formData.append('images', e.target.files[0]);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.$ajax.post('api/Index/upload', formData, config).then((res) => {
                    if (res.data.code == '200') {
                        console.log('成功')
                        this.data.product_image = res.data.data.image_url

                    }
                }, (err) => {
                })
            },
            handleSelectionChange(val) {
                var data = []
                for (var i = 0; i < val.length; i++) {
                    data.push(val[i].product_id);
                }
                this.product_id = data;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.small_images=[]
                        done();
                    })
                    .catch(_ => {
                    });
            },
            close(){
                this.small_images=[]
                this.data={
                    small_images: [],
                    goods_type: '0',
                    product_name: '',
                    content: '',
                    stock: '',
                    market_price: '',
                    exchange_acer: '',
                    product_image: '',
                    product_id:'',
                }
                this.dialogVisible = false
            },
            handleRemove(file, fileList) {
                if(file.response){
                    this.removeByValue(this.data.small_images,file.response.data.image_url)
                }else{
                    this.removeByValue(this.data.small_images,file.url)
                }

            },
            // 上传成功后的回调
            uploadSuccess(res, file, fileList) {
                this.data.small_images.push(res.data.image_url)
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
                if (!extension && !extension2) {
                    this.$message({
                        message: '上传图片只能是jpg、png格式!',
                        type: 'error'
                    });
                }
                if (!isLt3M) {
                    this.$message({
                        message: '上传图片大小不能超过 3M!',
                        type: 'error'
                    });
                }
                return extension || extension2 && isLt3M
            },
//            删除图片数组中的指定值的元素
            removeByValue(arr, val) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == val) {
                            arr.splice(i, 1);
                            break;
                        }
                    }
            },
            del(){
                this.$ajax.get('/api/Acerstore/delProduct',{params:{product_id:this.product_id}}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        this.getGoodsList()
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
            //            页码改变
            handleCurrentChange(val) {
//                获取当前页数的消息
                this.page = val
                document.getElementsByClassName('content')[0].scrollTop = 0
                document.documentElement.scrollTop = 0
                this.getGoodsList()
            },
        },
        mounted() {


        },
        created: function () {
            this.getGoodsList()
            this.getExchangeBrief()
        }
    }
</script>

<style scoped>
    .ms-doc {
        /*width: 100%;*/
        width: 980px;
        /*max-width: 1300px;*/
        background-color: white;
        padding: 0 40px;
        color: #54667a;
    }

    .m_title {
        font-size: 20px;
        color: #54667a;
        line-height: 60px;
        border-bottom: 1px solid #e9f1f3;
    }

    .ms-doc_main {
        padding: 20px;
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
        background-color: rgb(223, 236, 235);
        padding: 0 10px;
        cursor: pointer;
        color: #54667a;
        line-height: 24px;
    }
</style>
<style>
    .el-upload--picture-card {
        background-color: white;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        width: 130px;
        height: 132px;
        margin: 5px 3px;
    }

    .el-upload-list--picture-card .el-upload-list__item {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #e9f1f3;
        border-radius: 0;
        box-sizing: border-box;
        width: 130px;
        height: 132px;
        margin: 5px 3px;
        display: inline-block;
    }

    .el-dialog--small {
        min-width: 600px;
    }
</style>
