<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 24px;margin-left: 20px;">签到管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <p class="m_title">签到积分设置</p>
            <div class="ms-doc_main">
                <p> 用户单次签到奖励积分设置</p>
                <el-input v-model="once_acer" style="width: 200px;margin:20px 20px 20px 0;" placeholder="请输入最低积分"></el-input>
                <p>用户连续签到积分奖励提升区间设置</p>
                <el-input v-model="week_reward.sign_day1.reward_num" class="input" placeholder="请输入首次奖励数"></el-input>
                <el-input v-model="week_reward.sign_day2.reward_num" class="input"  placeholder="请输入第二次奖励数"></el-input>
                <el-input v-model="week_reward.sign_day3.reward_num" class="input" placeholder="请输入第三次奖励数"></el-input>
                <el-input v-model="week_reward.sign_day4.reward_num" class="input" placeholder="请输入第四次奖励数"></el-input>
                <el-input v-model="week_reward.sign_day5.reward_num" class="input" placeholder="请输入第五次奖励数"></el-input>
                <el-input v-model="week_reward.sign_day6.reward_num" class="input" placeholder="请输入第六次奖励数"></el-input>
                <el-input v-model="week_reward.sign_day7.reward_num" class="input" placeholder="请输入第七次奖励数"></el-input>
                <p style="margin: 20px 0;">
                    <input type="checkbox" style="vertical-align: middle;width: 15px;height: 15px;" id="rememberMe"><span style="margin-left: 10px;font-size: 14px;">断签后是否重新以首次计算(勾选表示重新计算)</span>
                </p>
            </div>
            <div style="text-align: center;">
                <el-button type="primary" round style="background-color: #0f8edd;border-color: #0f8edd;margin-bottom: 50px;" @click="saveSignReward()">确认</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    let echarts = require('echarts');
    export default {
        components: {},
        data() {
            return {
                input:'',
                once_acer:'',
                week_reward:{
                    sign_day1:{
                        reward_num:''
                    },
                    sign_day2:{
                        reward_num:''
                    },
                    sign_day3:{
                        reward_num:''
                    },
                    sign_day4:{
                        reward_num:''
                    },
                    sign_day5:{
                        reward_num:''
                    },
                    sign_day6:{
                        reward_num:''
                    },
                    sign_day7:{
                        reward_num:''
                    }
                },
                is_stop:'',
            }
        },
        methods: {
            //      获取签到奖励初始设置
//            is_stop  1:重记    2：不重记
            getSignReward: function () {
                this.$ajax.get('/api/Sign/onceSignReward').then((res) => {
                    if (res.data.code == '200') {
                        this.once_acer = res.data.data.once_acer
                        this.week_reward=res.data.data.week_reward
                        this.is_stop=res.data.data.is_stop

                    }
                }, (err) => {
                    console.log(err)
                })
            },
//            保存设置
            saveSignReward: function () {
                var data=[
                    {id:this.week_reward.sign_day1.id,reward_num:this.week_reward.sign_day1.reward_num},
                    {id:this.week_reward.sign_day2.id,reward_num:this.week_reward.sign_day2.reward_num},
                    {id:this.week_reward.sign_day3.id,reward_num:this.week_reward.sign_day3.reward_num},
                    {id:this.week_reward.sign_day4.id,reward_num:this.week_reward.sign_day4.reward_num},
                    {id:this.week_reward.sign_day5.id,reward_num:this.week_reward.sign_day5.reward_num},
                    {id:this.week_reward.sign_day6.id,reward_num:this.week_reward.sign_day6.reward_num},
                    {id:this.week_reward.sign_day7.id,reward_num:this.week_reward.sign_day7.reward_num},
                ]
                if (document.getElementById("rememberMe").checked) {
                    this.is_stop = '1'
                } else {
                    this.is_stop = '2'
                }
                this.$ajax.post('/api/Sign/onceSignReward',{once_acer:this.once_acer,week_reward:data,is_stop:this.is_stop}).then((res) => {
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
        },
        mounted() {
        },
        created: function () {
             this.getSignReward()
        }
    }
</script>

<style scoped>
    .ms-doc{
        width: 100%;
        max-width: 980px;
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
    .input{
        width: 200px;margin:20px 40px 0 0;
    }
</style>
