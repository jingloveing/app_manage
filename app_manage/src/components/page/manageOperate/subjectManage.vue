<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">专场页管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <div class="left">
                <p class="m_title">专场页主图展示 <small>尺寸建议：750*260像素;类型要求：jpg.png,3M内大小</small></p>
                <div class="left_main">
                    <div style="margin-bottom: 20px;">
                        <p class="title"><i class="num">1</i>专区 <small>(建议展示领券特惠类商品，例：9.9特惠)</small></p>
                        <div style="position: relative;">
                            <div class="upload_img" id="upload_img1">
                                <img :src="store_list[0].image" alt="" style="width: 100%;height: 100%;">
                            </div>
                                <input id="file1" type="file"  style="display: none" @change="uploadImg($event,0)" multiple accept="image/*">
                            <label for="file1" class="upload_btn">上传</label>
                        </div>
                        <span style="font-size: 14px;">专区名称自定义：</span><el-input v-model="store_list[0].store_name" style="width: 200px;margin:0 20px;" placeholder="限制6个中文字以内"></el-input>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <p class="title"><i class="num">2</i>专区 <small>(建议展示领券特惠类商品，例：19.9包邮)</small></p>
                        <div style="position: relative;">
                            <div class="upload_img" id="upload_img2">
                                <img :src="store_list[1].image" alt="" style="width: 100%;height: 100%;">
                            </div>
                            <input id="file2" type="file"  style="display: none"  @change="uploadImg($event,1)" multiple accept="image/*">
                            <label for="file2" class="upload_btn">上传</label>
                        </div>
                        <span style="font-size: 14px;">专区名称自定义：</span><el-input v-model="store_list[1].store_name" style="width: 200px;margin:0 20px;" placeholder="限制6个中文字以内"></el-input>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <p class="title"><i class="num">3</i>专区 <small>(建议展示折扣类商品，例：聚折扣)</small></p>
                        <div style="position: relative;">
                            <div class="upload_img" id="upload_img3">
                                <img :src="store_list[2].image" alt="" style="width: 100%;height: 100%;">
                            </div>
                            <input id="file3" type="file"  style="display: none" @change="uploadImg($event,2)" multiple accept="image/*">
                            <label for="file3" class="upload_btn" >上传</label>
                        </div>
                        <span style="font-size: 14px;">专区名称自定义：</span><el-input v-model="store_list[2].store_name" style="width: 200px;margin:0 20px;" placeholder="限制6个中文字以内"></el-input>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <p class="title"><i class="num">4</i>专区 <small>(自定义商品专区，例：应季必备)</small></p>
                        <div style="position: relative;">
                            <div class="upload_img" id="upload_img4">
                                <img :src="store_list[3].image" alt="" style="width: 100%;height: 100%;">
                            </div>
                            <input id="file4" type="file"  style="display: none" @change="uploadImg($event,3)" multiple accept="image/*">
                            <label for="file4" class="upload_btn" >上传</label>
                        </div>
                        <span style="font-size: 14px;">专区名称自定义：</span><el-input v-model="store_list[3].store_name" style="width: 200px;margin:0 20px;" placeholder="限制6个中文字以内"></el-input>
                    </div>
                </div>
                <div style="text-align: center;margin-bottom: 20px;">
                    <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;margin-left: 50px;" @click="save()">全部保存</el-button>
                    <!--<el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;margin-left: 50px;">一键预览</el-button>-->
                </div>
            </div>
            <div class="right">
                <p class="m_title">效果预览</p>
                <div class="right_main">
                    <div class="phone">
                       <div class="phone_main">
                           <div class="part1">
                               <div class="nav">
                                   <img :src="store_list[0].image" alt="" class="bd">
                                   <div>
                                       <span>{{store_list[0].store_name}}</span>
                                       <img src="/static/img/1.png" alt="">
                                   </div>
                                   <img src="/static/img/triangle.png" alt="" class="triangle">
                               </div>
                               <img src="/static/img/goods.png" alt="" class="goods">
                           </div>
                           <div class="part1">
                               <div class="nav">
                                   <img :src="store_list[1].image" alt="" class="bd">
                                   <div>
                                       <span>{{store_list[1].store_name}}</span>
                                       <img src="/static/img/2.png" alt="">
                                   </div>
                                   <img src="/static/img/triangle.png" alt="" class="triangle">
                               </div>
                               <img src="/static/img/goods.png" alt="" class="goods">
                           </div>
                           <div class="part1">
                               <div class="nav">
                                   <img :src="store_list[2].image" alt="" class="bd">
                                   <div>
                                       <span>{{store_list[2].store_name}}</span>
                                       <img src="/static/img/3.png" alt="">
                                   </div>
                                   <img src="/static/img/triangle.png" alt="" class="triangle">
                               </div>
                               <img src="/static/img/goods.png" alt="" class="goods">
                           </div>
                           <div class="part1">
                               <div class="nav">
                                   <img :src="store_list[3].image" alt="" class="bd">
                                   <div>
                                       <span>{{store_list[3].store_name}}</span>
                                       <img src="/static/img/4.png" alt="">
                                   </div>
                                   <img src="/static/img/triangle.png" alt="" class="triangle">
                               </div>
                               <img src="/static/img/goods.png" alt="" class="goods2">
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return{
            input:'',
            store_list:[
                {
                    store_name:'',
                    image:''
                },
                {
                    store_name:'',
                    image:''
                },
                {
                    store_name:'',
                    image:''
                },
                {
                    store_name:'',
                    image:''
                },
            ]
        }
    },
    methods:{
        //      获取专区页列表
        getAffordable: function () {
            this.$ajax.post('/api/Affordable/affordable').then((res) => {
                if (res.data.code == '200') {
                    this.store_list = res.data.data.store_list
                }
            }, (err) => {
                console.log(err)
            })
        },
        uploadImg:function(e,index){
            const formData = new FormData();
            formData.append('images',e.target.files[0]);
            let config ={
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            this.$ajax.post('api/Index/upload', formData, config).then((res)=>{
                if(res.data.code=='200'){
                    this.store_list[index].image=res.data.data.image_url
                }
            },(err)=>{})
        },
        save(){
            this.$ajax.post('/api/Affordable/save',this.store_list).then((res) => {
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
        }
    },
    created:function(){
        this.getAffordable()
    }
}
</script>
<style scoped>
    .ms-doc {
        /*max-width: 980px;*/
        max-width: 1300px;
        min-width: 1190px;
        /*width: 1300px;*/
        color: #54667a;
        margin-bottom: 54px;
        overflow: hidden;
    }
   .left{
       /*width: 604px;*/
       width: 40%;
       float: left;
       background-color: white;
       padding: 0 40px;
       margin-right: 20px;
   }
    .m_title {
        font-size: 20px;
        color: #54667a;
        line-height: 60px;
        border-bottom: 1px solid #e9f1f3;
    }
    .m_title small{
        font-size: 12px;
        color: #a6afbb;
        margin-left: 10px;
    }
    .left_main{
        padding: 20px;
        border: 1px solid #e9f1f3;
        margin: 20px 0;
    }
    .num{
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #e9f1f3;
        border-radius: 50%;
        text-align: center;
        margin-right: 10px;
    }
    .title small{
        color: #a6afbb;
        font-size: 14px;
        margin-left: 10px;
    }
    .right{
       float: left;
        background-color: white;
        width: 510px;
        padding: 0 20px;
    }
    .upload_img{
        /*width: 375px;*/
        width: 300px;
        height: 130px;
        background-image: url("/static/img/upload_img_bd.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: inline-block;
        margin: 25px 20px 25px 5px;
    }
    .upload_btn{
        font-size: 14px;background-color: #0f8edd;border-color: #0f8edd;position: absolute;bottom: 30px;display: inline-block;padding: 8px 15px;
        color: white;
        border-radius: 5px;
    }
    /*手机模拟页面样式*/
    .phone{
        width: 430px;
        height: 880px;
        background-image: url("/static/img/phone.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin: 30px auto;
        position: relative;
    }
    .phone_main{
        position: absolute;top:171px;left:28px;width: 375px; height: 554px;font-size: 0;
        overflow-y: scroll;
    }
    .nav{
        position: relative;
    }
    .nav div{
        text-align:center;position: absolute;top: 4px;left: 4px;min-width: 98px;height: 38px;background-image: url(/static/img/nine.png);
        background-size: 100% 100%;border-radius: 19px;
    }
    .nav div span{
        font-size: 12px;color: white;padding: 0 20px;display: block;
    }
    .nav div img{
        width: 70px;height: 10px;margin-top: 5px;
    }
    .triangle{
        width: 12px;height: 12px;position: absolute;bottom: 0;left: calc((100% - 12px)/2);
    }
    .bd{
        width: 100%;height: 148px;
    }
    .goods{
        width: 100%;height:156px;
    }
    .goods2{
        width: 100%;
        height: 147px;
    }
</style>
