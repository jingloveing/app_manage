<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">粉丝福利管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <p class="m_title">粉丝福利商品</p>
            <div class="ms-doc_main">
                <div>
                    <el-select v-model="value1" placeholder="全部商品" style="width: 160px;margin-right:20px;">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style="background-color: #0f8edd;border-color: #0f8edd;" @click="getGoodsList()">筛选</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="product_list"
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
                        label="商品" height="95" width="80">
                        <template slot-scope="scope">
                            <img :src="scope.row.pict_url" alt="" style="width:60px;height:60px;margin-top: 5px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="标题"
                        width="200"
                        show-overflow-tooltip>
                        <template slot-scope="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="zk_final_price"
                        label="折后/元">
                    </el-table-column>
                    <el-table-column
                        prop="coupon_number"
                        label="券额/元"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="stock"
                        label="库存量/件"
                        show-overflow-tooltip>
                    </el-table-column>
                    <!--1是上架，2是下架-->
                    <el-table-column
                        label="状态"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-text="scope.row.on_sale==1?'上架':'下架'">下架</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="返元宝值" width="180">
                        <template slot-scope="scope">
                            <input type="text" style="width: 72px;height: 24px;" v-model="scope.row.fans_acer">
                            <el-button @click="save(scope.$index)" type="text" size="small" class="pros" style="margin-left: 10px;">保存</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button @click="change(scope.row.id,scope.row.on_sale)" type="text" size="small" class="pros" v-text="scope.row.on_sale==1?'下架':'上架'">上架</el-button>
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
                    <el-select v-model="value2" placeholder="全部商品" style="width: 160px;margin-right:20px;">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;" @click="setAcer()">确认
                    </el-button>
                    <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;" @click="changeAll(1)">批量上架 </el-button>
                    <el-button type="danger" round @click="changeAll(2)">批量下架</el-button>
                </div>
            </div>
        </div>
        <div class="ms-doc sort">
            <p class="m_title">粉丝福利banner图</p>
            <div class="ms-doc_main">
                <div style="margin-bottom: 20px;">
                    <div style="display: inline-block;width: 500px;">
                        <p>图片上传：</p>
                        <div style="position: relative;">
                            <div class="upload_img" id="upload_img1">
                                <img :src="imgUrl1" alt="" style="width: 100%;height: 100%;">
                            </div>
                            <p>750*180像素尺寸；格式jpg,png,3M内大小。</p>
                            <input id="file1" type="file" style="display: none;" @change="uploadImg1($event)" multiple
                                   accept="image/*">
                            <label for="file1" class="upload_btn" style="right: 0;">上传</label>
                        </div>
                    </div>
                    <div style="float: right;">
                        <p>banner跳转链接：</p>
                        <el-input placeholder="请输入链接" v-model="url" style="width: 300px;margin:20px 20px 20px 0;">
                            <!--<template slot="prepend">http://</template>-->
                        </el-input>
                        <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;" @click="saveBanner()">确认
                        </el-button>
                    </div>
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
                page: 1,
                limit:15,
                totalPage:1,
                input: '',
                options1: [
                    {
                    value: '0',
                    label: '全部商品'
                },
                    {
                        value: '1',
                        label: '最新'
                    }
                ],
                value1: '0',
                options2: [
                    {
                    value: '0',
                    label: '批量返元宝'
                }, {
                    value: '10',
                    label: '10元宝'
                }, {
                    value: '20',
                    label: '20元宝'
                }, {
                    value: '50',
                    label: '50元宝'
                }, {
                    value: '100',
                    label: '100元宝'
                }, {
                    value: '200',
                    label: '200元宝'
                }, {
                    value: '500',
                    label: '500元宝'
                }
                ],
                value2: '0',
                dateValue1: '',
                product_id: [],
                textarea: '',
                product_list:[],
                imgUrl1:'',
                url:'',
            }
        },
        methods: {
            //      获取粉丝福利商品 is_new==1 最新
            getGoodsList: function () {
                this.$ajax.post('/api/Fanswelfare/productList',{is_new:this.value1,page:this.page,limit:this.limit}).then((res) => {
                    if (res.data.code == '200') {
                        this.product_list=res.data.data.product_list
                        this.totalPage=res.data.data.total_page
                    }else{

                    }
                }, (err) => {
                    console.log(err)
                })
            },
//            上下架商品
            change(id,status){
                if(status==1){
                    status=2
                }else{
                    status=1
                }
                this.$ajax.post('/api/Fanswelfare/changeSale',{product_id:id,on_sale:status}).then((res) => {
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
//            一键上下键
            changeAll:function(e){
                this.$ajax.post('/api/Fanswelfare/changeSale',{product_id:this.product_id,on_sale:e}).then((res) => {
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
            //      批量设置元宝数量
            setAcer: function () {
                if(this.value2=='0'){
                    this.$message({
                        message: "请选择批量处理元宝数量",
                        type: 'warning'
                    });
                    return
                }else{
                    var data={product_id:this.product_id,acer_number:this.value2}
                }
                this.$ajax.post('/api/Fanswelfare/batchSetAcer',data).then((res) => {
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
//            单个设置元宝数量
            save(i){
                var product_id=[]
                product_id.push(this.product_list[i].id)
                var data={product_id:product_id,acer_number:this.product_list[i].fans_acer}
                this.$ajax.post('/api/Fanswelfare/batchSetAcer',data).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
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
                        this.imgUrl1 = res.data.data.image_url

                    }
                }, (err) => {
                })
            },
//            获取图片banner及路径
            getBanner(){
                this.$ajax.post('/api/Fanswelfare/banner').then((res) => {
                    if (res.data.code == '200') {
                        this.imgUrl1=res.data.data.banner
                        this.url=res.data.data.url
                    }else{

                    }
                }, (err) => {
                    console.log(err)
                })
            },
//            保存图片banner及路径
            saveBanner(){
                this.$ajax.post('/api/Fanswelfare/editBanner',{banner_image:this.imgUrl1,banner_url:this.url}).then((res) => {
                    if (res.data.code == '200') {
                        this.$message({
                            message: res.data.data.message,
                            type: 'success'
                        });
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
            handleSelectionChange(val){
                console.log(val)
                var data=[]
                for(var i= 0;i<val.length;i++){
                    data.push(val[i].id);
                }
                this.product_id = data;
            },
//            页码改变
            handleCurrentChange(val) {
//                获取当前页数的消息
                this.page = val
//                document.getElementsByClassName('content')[0].scrollTop = 0
//                document.documentElement.scrollTop = 0
                this.getGoodsList()
            },
        },
        mounted() {


        },
        created: function () {
           this.getGoodsList()
            this.getBanner()
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

    .upload_img {
        width: 375px;
        height: 130px;
        background-image: url("/static/img/upload_img_bd.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: inline-block;
        margin: 25px 20px 25px 5px;
    }

    .upload_btn {
        font-size: 14px;
        background-color: #0f8edd;
        border-color: #0f8edd;
        position: absolute;
        padding: 8px 15px;
        color: white;
        border-radius: 5px;
        top:45px;
    }
    .pros{
       background-color: rgb(223, 236, 235); padding: 0 10px;cursor: pointer;color: #54667a;line-height: 24px;
    }
</style>
