webpackJsonp([3],{538:function(t,e,a){a(607),a(606);var o=a(211)(a(554),a(588),"data-v-2c049e3f",null);t.exports=o.exports},554:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={components:{},data:function(){return{totalPage:1,total_count:0,goodsList:[],data:{page:1,limit:20,title:"",sale:"",product_type:"",store_type:"",time_start:"",time_end:"",price_min:"",price_max:"",commission_min:"",commission_max:"",rate_min:"",rate_max:"",coupon_min:"",coupon_max:""},goods_id:[],options1:[{value:"",label:"全部"},{value:"1",label:"已上架"},{value:"0",label:"未上架"}],options2:[],options3:[{value:"",label:"全部"},{value:"5",label:"9.9特价"},{value:"6",label:"大额券"},{value:"7",label:"聚划算"}],cate:"",classify:""}},methods:{getGoodsList:function(){var t=this;this.$ajax.get("/api/tbProList",{params:this.data}).then(function(e){"200"==e.data.code&&(t.goodsList=e.data.data.list,t.totalPage=e.data.data.total_page,t.total_count=e.data.data.total_count)},function(t){console.log(t)})},getCateList:function(){var t=this;this.$ajax.get("/api/tbCateList").then(function(e){"200"==e.data.code&&(t.options2=e.data.data)},function(t){console.log(t)})},handleSelectionChange:function(t){for(var e=[],a=0;a<t.length;a++)e.push(t[a].id);this.goods_id=e},del:function(t){var e=this,a=null;a=t?{id:[t]}:{id:this.goods_id},this.$ajax.post("/api/delTbProduct",a).then(function(t){"200"==t.data.code?(e.$message({message:t.data.data.message,type:"success"}),e.getGoodsList()):e.$message({message:t.data.error,type:"error"})},function(t){console.log(t)})},setHot:function(t){var e=this,a=null,o=null;t?(o=0==status?1:0,a={id:[t],type:o}):a={id:this.goods_id,type:status},this.$ajax.post("/api/setTbHot",a).then(function(t){"200"==t.data.code?(e.$message({message:t.data.data.message,type:"success"}),e.getGoodsList()):e.$message({message:t.data.error,type:"error"})},function(t){console.log(t)})},setSale:function(t,e){var a=this,o=null,i=null;t?(i=0==e?1:0,o={id:[t],type:i},console.log(o)):(o={id:this.goods_id,type:e},console.log(o)),this.$ajax.post("/api/setTbSale",o).then(function(t){"200"==t.data.code?(a.$message({message:t.data.data.message,type:"success"}),a.getGoodsList()):a.$message({message:t.data.error,type:"error"})},function(t){console.log(t)})},saveSet:function(){var t=this;this.$ajax.post("/api/setTbType",{product:this.cate,store:this.classify,id:this.goods_id}).then(function(e){"200"==e.data.code?(t.$message({message:e.data.data.message,type:"success"}),t.getGoodsList()):t.$message({message:e.data.error,type:"error"})},function(t){console.log(t)})},handleCurrentChange:function(t){this.data.page=t,this.getGoodsList()},startChange:function(t){this.data.time_start=t},endChange:function(t){this.data.time_end=t},clear:function(){this.data={page:1,limit:20,title:"",sale:"",product_type:"",store_type:"",time_start:"",time_end:"",price_min:"",price_max:"",commission_min:"",commission_max:"",rate_min:"",rate_max:"",coupon_min:"",coupon_max:""}}},mounted:function(){},created:function(){this.getGoodsList(),this.getCateList()}}},566:function(t,e,a){e=t.exports=a(94)(!1),e.push([t.i,".el-button{padding:0 10px!important;border-radius:6px!important;font-size:14px!important}.el-button,.el-input__inner{height:28px!important;line-height:28px!important}.el-form-item{margin-bottom:12px!important;display:inline-block}.el-form-item__content{margin-right:20px}.el-button+.el-button{margin-left:0!important}.el-tabs__active-bar{background-color:#0f8edd!important}.el-tabs__item{font-size:20px!important;height:60px!important;line-height:60px!important;padding:0 20px!important}.el-tabs__item,.el-tabs__item.is-active{color:#54667a!important}",""])},567:function(t,e,a){e=t.exports=a(94)(!1),e.push([t.i,".product_name[data-v-2c049e3f]{width:148px;padding:0 10px}.inputs[data-v-2c049e3f],.product_name[data-v-2c049e3f]{height:28px;line-height:28px;border-radius:4px;outline:none;border:1px solid #bfd9d8;box-sizing:border-box}.inputs[data-v-2c049e3f]{width:70px;padding:0 0 0 10px}.pros[data-v-2c049e3f]{padding:0 10px;cursor:pointer;color:#0f8edd;line-height:24px}",""])},588:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{staticStyle:{"font-size":"24px","margin-left":"20px"}},[t._v("商品管理")])],1)],1),t._v(" "),a("div",{staticClass:"ms-doc"},[a("p",{staticClass:"m_title"},[t._v("淘宝区商品列表")]),t._v(" "),a("div",{staticClass:"ms-doc_main"},[a("el-form",{ref:"form",staticStyle:{color:"#848c97"},attrs:{"label-width":"83px"}},[a("div",[a("el-form-item",{attrs:{label:"商品名称："}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.title,expression:"data.title"}],staticClass:"product_name",attrs:{type:"text"},domProps:{value:t.data.title},on:{input:function(e){e.target.composing||t.$set(t.data,"title",e.target.value)}}})]),t._v(" "),a("el-form-item",{attrs:{label:"更新时间："}},[a("el-date-picker",{staticClass:"time_tab time",attrs:{type:"date",placeholder:"开始时间","value-format":"yyyy-MM-dd"},on:{change:t.startChange},model:{value:t.data.time_start,callback:function(e){t.$set(t.data,"time_start",e)},expression:"data.time_start"}}),t._v("\n\t\t\t\t\t\t\t-\n\t\t\t\t\t\t\t"),a("el-date-picker",{staticClass:"time",attrs:{type:"date",placeholder:"结束时间","value-format":"yyyy-MM-dd"},on:{change:t.endChange},model:{value:t.data.time_end,callback:function(e){t.$set(t.data,"time_end",e)},expression:"data.time_end"}})],1)],1),t._v(" "),a("div",[a("el-form-item",{attrs:{label:"价格："}},[a("span",{staticClass:"time_tab"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.price_min,expression:"data.price_min"}],staticClass:"inputs",attrs:{type:"number"},domProps:{value:t.data.price_min},on:{input:function(e){e.target.composing||t.$set(t.data,"price_min",e.target.value)}}}),t._v("-"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.price_max,expression:"data.price_max"}],staticClass:"inputs",attrs:{type:"number"},domProps:{value:t.data.price_max},on:{input:function(e){e.target.composing||t.$set(t.data,"price_max",e.target.value)}}})])]),t._v(" "),a("el-form-item",{attrs:{label:"佣金："}},[a("span",{staticClass:"time_tab"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.commission_min,expression:"data.commission_min"}],staticClass:"inputs",attrs:{type:"number"},domProps:{value:t.data.commission_min},on:{input:function(e){e.target.composing||t.$set(t.data,"commission_min",e.target.value)}}}),t._v("-"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.commission_max,expression:"data.commission_max"}],staticClass:"inputs",attrs:{type:"number"},domProps:{value:t.data.commission_max},on:{input:function(e){e.target.composing||t.$set(t.data,"commission_max",e.target.value)}}})])]),t._v(" "),a("el-form-item",{attrs:{label:"佣金比："}},[a("span",{staticClass:"time_tab"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.rate_min,expression:"data.rate_min"}],staticClass:"inputs",attrs:{type:"number"},domProps:{value:t.data.rate_min},on:{input:function(e){e.target.composing||t.$set(t.data,"rate_min",e.target.value)}}}),t._v("-"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.rate_max,expression:"data.rate_max"}],staticClass:"inputs",attrs:{type:"number"},domProps:{value:t.data.rate_max},on:{input:function(e){e.target.composing||t.$set(t.data,"rate_max",e.target.value)}}})])]),t._v(" "),a("el-form-item",{attrs:{label:"券额："}},[a("span",{staticClass:"time_tab"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.coupon_min,expression:"data.coupon_min"}],staticClass:"inputs",attrs:{type:"number"},domProps:{value:t.data.coupon_min},on:{input:function(e){e.target.composing||t.$set(t.data,"coupon_min",e.target.value)}}}),t._v("-"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.coupon_max,expression:"data.coupon_max"}],staticClass:"inputs",attrs:{type:"number"},domProps:{value:t.data.coupon_max},on:{input:function(e){e.target.composing||t.$set(t.data,"coupon_max",e.target.value)}}})])])],1),t._v(" "),a("div",[a("el-form-item",{attrs:{label:"商品状态："}},[a("el-select",{staticStyle:{width:"148px"},attrs:{placeholder:"全部"},model:{value:t.data.sale,callback:function(e){t.$set(t.data,"sale",e)},expression:"data.sale"}},t._l(t.options1,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"类目分类："}},[a("el-select",{staticStyle:{width:"148px"},attrs:{placeholder:"全部"},model:{value:t.data.product_type,callback:function(e){t.$set(t.data,"product_type",e)},expression:"data.product_type"}},t._l(t.options2,function(t){return a("el-option",{key:t.id,attrs:{label:t.cate_name,value:t.id}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"专场分类："}},[a("el-select",{staticStyle:{width:"148px"},attrs:{placeholder:"全部"},model:{value:t.data.store_type,callback:function(e){t.$set(t.data,"store_type",e)},expression:"data.store_type"}},t._l(t.options3,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),a("el-button",{staticStyle:{"margin-left":"83px"},attrs:{type:"primary"},on:{click:function(e){t.getGoodsList()}}},[t._v("搜索\n                    ")]),t._v(" "),a("span",{staticStyle:{"font-size":"14px",color:"#999","margin-left":"16px"},on:{click:function(e){t.clear()}}},[t._v("清空条件")])],1),t._v(" "),a("p",{staticStyle:{"font-size":"14px",color:"#54667a","margin-top":"16px"}},[t._v("商品库存共"),a("span",{staticStyle:{color:"#FC4B6C"}},[t._v(t._s(t.total_count))]),t._v("件")]),t._v(" "),a("div",{staticStyle:{padding:"12px 20px",border:"1px solid rgb(223, 236, 235)","margin-top":"12px","border-bottom":"0"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.del()}}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.setHot()}}},[t._v("设置热门")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.setSale("",1)}}},[t._v("批量上架")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.setSale("",0)}}},[t._v("批量下架")]),t._v(" "),a("el-select",{staticStyle:{width:"110px","margin-left":"40px"},attrs:{placeholder:"类目分类"},model:{value:t.cate,callback:function(e){t.cate=e},expression:"cate"}},t._l(t.options2,function(t){return a("el-option",{key:t.id,attrs:{label:t.cate_name,value:t.id}})})),t._v(" "),a("el-select",{staticStyle:{width:"110px","margin-right":"8px"},attrs:{placeholder:"专场分类"},model:{value:t.classify,callback:function(e){t.classify=e},expression:"classify"}},t._l(t.options3,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.saveSet()}}},[t._v("保存")])],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","text-align":"center"},attrs:{data:t.goodsList,"tooltip-effect":"dark",border:""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"50",height:"95"}}),t._v(" "),a("el-table-column",{attrs:{label:"商品",height:"95",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{width:"50px",height:"50px","margin-top":"5px"},attrs:{src:e.row.pict_url,alt:""}}),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:1==e.row.is_hot,expression:"scope.row.is_hot==1"}],staticStyle:{"font-size":"12px",color:"#fc4b6c","text-align":"center"}},[t._v("热门")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"商品名称","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"价格",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("￥"+t._s(e.row.zk_final_price))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"佣金",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("￥"+t._s(e.row.commission))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"拥金比",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("￥"+t._s(e.row.commission_rate))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"券额",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("￥"+t._s(e.row.coupon_number))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商品状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(0==e.row.is_sale?"未上架":"已上 架")}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"coupon_number",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"pros",attrs:{type:"text",size:"small"},domProps:{textContent:t._s(0==e.row.is_sale?"上架":"下架")},on:{click:function(a){t.setSale(e.row.id,e.row.is_sale)}}}),t._v(" "),a("el-button",{staticClass:"pros",attrs:{type:"text",size:"small"},on:{click:function(a){t.del(e.row.id)}}},[t._v("删除\n\t\t\t\t\t\t\t\t")]),t._v(" "),a("el-button",{staticClass:"pros",attrs:{type:"text",size:"small"},on:{click:[function(t){},function(a){t.setHot(e.row.id)}]}},[t._v("设置热门\n\t\t\t\t\t\t\t\t")])]}}])})],1),t._v(" "),a("div",{staticStyle:{padding:"12px 20px",border:"1px solid rgb(223, 236, 235)","margin-bottom":"30px","border-top":"0",overflow:"hidden"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.del()}}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.setHot()}}},[t._v("设置热门")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.setSale("",1)}}},[t._v("批量上架")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.setSale("",0)}}},[t._v("批量下架")]),t._v(" "),a("el-select",{staticStyle:{width:"110px","margin-left":"40px"},attrs:{placeholder:"类目分类"},model:{value:t.cate,callback:function(e){t.cate=e},expression:"cate"}},t._l(t.options2,function(t){return a("el-option",{key:t.id,attrs:{label:t.cate_name,value:t.id}})})),t._v(" "),a("el-select",{staticStyle:{width:"110px","margin-right":"8px"},attrs:{placeholder:"专场分类"},model:{value:t.classify,callback:function(e){t.classify=e},expression:"classify"}},t._l(t.options3,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.saveSet()}}},[t._v("保存")]),t._v(" "),a("el-pagination",{staticStyle:{display:"inline-block",float:"right"},attrs:{"page-size":t.data.limit,layout:"prev, pager, next, jumper","page-count":t.totalPage},on:{"current-change":t.handleCurrentChange}})],1)],1)])])},staticRenderFns:[]}},606:function(t,e,a){var o=a(566);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(210)("0acab0f8",o,!0)},607:function(t,e,a){var o=a(567);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(210)("e51c369c",o,!0)}});