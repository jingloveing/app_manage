<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">菜单排序</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <div class="color-list">
                <div
                    class="color-item"
                    v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
                    :key="color.text"
                >{{color.text}}</div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                colors: [{
                    text: "Aquamarine"
                }, {
                    text: "Hotpink"
                }, {
                    text: "Gold"
                }, {
                    text: "Crimson"
                }, {
                    text: "Blueviolet"
                }, {
                    text: "Lightblue"
                }, {
                    text: "Cornflowerblue"
                }, {
                    text: "Skyblue"
                }, {
                    text: "Burlywood"
                }]
            }
        },
        methods: {
            //      获取菜单列表
//            getList:function(){
//                this.$ajax.post('/api/Menu/totalMenu').then((res) => {
//                    if (res.data.code == '200') {
//                        this.list = res.data.data.menu
//                    }
//                }, (err) => {
//                    console.log(err)
//                })
//            },

        },
        mounted() {
            this.$dragging.$on('dragged', ({ value }) => {
                console.log(value.item)
                console.log(value.list)
            })
        },
        created: function () {
//            this.getList()
        }
    }
</script>

<style scoped>
    .ms-doc {
        width: 100%;
        /*max-width: 980px;*/
        max-width: 1300px;
        background-color: white;
        padding: 40px;
        color: #54667a;
    }
</style>
