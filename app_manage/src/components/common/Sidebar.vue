<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title">{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">{{ item.title }}</el-menu-item>
                </template>
            </template>
        </el-menu>
<!--@open="handleOpen" @close="handleClose" @select="handleSelect"-->
        <!--<el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item._data&&item._data.length!==0">
                    <el-submenu :index="item.url">
                        <template slot="title">
                            <img :src="item.icon_blue" alt="" style="width: 20px;height: 20px;vertical-align: middle;margin-right: 10px;">
                            <img :src="item.icon" alt="" style="width: 20px;height: 20px;vertical-align: middle;margin-right: 10px;">
                            {{ item.name }}</template>
                        <el-menu-item v-for="(subItem,i) in item._data" :key="i" :index="subItem.url">{{ subItem.name }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" v-on:click="selected = !selected">
                        <img :src="item.icon_blue" alt="" style="width: 20px;height: 20px;vertical-align: middle;margin-right: 10px;">
                        <img :src="item.icon" alt="" style="width: 20px;height: 20px;vertical-align: middle;margin-right: 10px;">
                        {{ item.name }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                  items: [
                      {
                          index: 'home',
                          title: '首页'
                      },{
                          index: 'withdraw',
                          title: '挂单审核'
                      },
                      {
                      	index: '7',
                          title: '数据中心',
                          subs: [
                              {
                                  index: 'userData',
                                  title: '用户数据'
                              },{
                                  index: 'appVisit',
                                  title: 'APP访问量'
                              },
//                            {
//                                index: 'selfVisit',
//                                title: '自营商城访问量'
//                            },

                          ]
                      },
                      {
                      	index: '2',
                          title: '首页控制区',
                          subs: [
                              {
                                  index: 'indexBanner',
                                  title: '海报图'
                              },{
                                  index: 'indexNews',
                                  title: '享利快报'
                              },{
                                  index: 'indexMerchant',
                                  title: '品牌管理及精选'
                              },

                          ]
                      },
                      {
                          index: '3',
                          title: '一键分享控制区',
                          subs: [
                           {
                                  index: 'shareBanner',
                                  title: '海报图'
                             },
                              {
                                  index: 'editShare',
                                  title: '话题圈'
                              }

                          ]
                      },
                      {
                          index: '4',
                          title: '淘宝控制区',
                          subs: [
                              {
                                  index: 'goodsManage',
                                  title: '商品管理 '
                              },
                              {
                                  index: 'bannerManage',
                                  title: '海报图'
                              }
                          ]
                      },
                     {
                          index: '5',
                          title: '品牌现场控制区',
                          subs: [
                              {
                                  index: 'brandBanner',
                                  title: '海报图 '
                              },
                              {
                                  index: 'brandView',
                                  title: '视频管理'
                              }
                          ]
                      },
                      {
                          index: '6',
                          title: '特供商品控制区',
                          subs: [
                              {
                                  index: 'specialList',
                                  title: '商品列表'
                              },
                              {
                                  index: 'deliverManage',
                                  title: '发货管理'
                              }
                          ]
                      },
                  ],
                selected:false,
            }
        },
        methods:{
//          getSiderbarList:function(){
//              this.$ajax.post('/api/Menu/index').then((res)=>{
//                  if(res.data.code=='200'){
//                      this.items = res.data.data.menu
//                  }else{
//                      this.$message({
//                          message: res.data.error,
//                          type: 'error'
//                      });
//                  }
//              },(err)=>{
//
//              })
//          },
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        mounted(){

        },
        created:function(){
//          this.getSiderbarList()
        }
    }
</script>

<style scoped>
    .el-menu{
        background-color: white;
    }
    .sidebar{
        display: block;
        position: absolute;
        width: 240px;
        left: 0;
        top: 70px;
        bottom:0;
        background-color: white;
    }
    .sidebar > ul {
        height:100%;
    }
    .s-active+.img2{
        visibility: visible;
    }
    .s-active+.img1{
        visibility: hidden;
    }
</style>
<style>
    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        color: #0f8edd;
    }
    .el-submenu__title{
        color: #a6afbb;
    }
    .el-menu-item{
        color: #a6afbb;
    }
</style>
