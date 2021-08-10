<template>
  <div class="login_img">
    <div class="warpper">
      <div class="login-box clearfix">
        <div class="box-left fl">
          <div class="text-img">
            <el-image
            style="width: 352px; height: 360px"
            :src="`${$baseUrl}login/left_img.png`"
            fit="scale-down"></el-image>
          </div>
        </div>
        <div class="box-right fr">
          <div class="input-box admin">
            <el-tabs v-model="activeName" class="tabs" stretch>
              <el-tab-pane label="账号登陆" name="1">
                <Account :type="type"/>
              </el-tab-pane>
              <!-- <el-tab-pane label="验证码登陆" name="2">
                <Phone :type="type"/>
              </el-tab-pane> -->
            </el-tabs>
            <el-form>
              <el-form-item>
                <el-row style="text-align: center;">
                  <el-col :span="12"><el-button type="text" @click="toRegister(1)">用户注册</el-button></el-col>
                  <el-col :span="12"><el-button type="text" @click="toRegister(2)">忘记密码</el-button></el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="ftext">Copyright © {{new Date().getFullYear()}}  XXXXXX</div>
    </div>
  </div>
</template>

<script>
import Account from './Account/'
import Phone from './Phone/'
import axios from 'axios'
export default {

  data() {
    return {
      type:'',
      interval:null,
      show:true,
      activeName:'1',
      reset:false,
    };
  },
  computed: {

  },
  created() {},
  mounted() {

  },
  methods: {
    toRegister(type) {

    },
  },
  components: {
    Account,
    Phone
  },
  watch: {

  }
};
</script>

<style lang="scss" scoped>
.login-box{
  user-select: none;
  width: 795px;
  height: 360px;
  position: absolute;
  right: 100px;
  top: 50%;
  z-index: 1000;
  margin-top: -180px;
}
.box-left{
  display: inline-block;
  width: 352px;
  height: 360px;
  background: rgba(64, 158, 255, 0.8);
  overflow: hidden;
}
.box-right{
  display: inline-block;
  width: 443px;
  height: 360px;
  background: #fff;
  overflow: hidden;
}
.text{
  font-size: 20px;
  padding-top: 64px;
  text-align: center;
  color: #fff;
  font-weight: 500;
}
.text-img{
  position: relative;
}
.input-box{
  width: 300px;
  padding-top: 25px;
  margin: 0 auto;
}
.input-box.admin{
  padding-top: 42px;
}
/deep/ .tabs .el-tabs__item{
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}
.footer{
  position: fixed;
  left: 0;
  right:0;
  bottom: 0;
  z-index: 10001;
  background: rgba(0, 0, 0, 0.2);
}
.ftext{
  color: #fff;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.warpper{
  position: relative;
  // max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
.textTitle{
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 290px;
  text-align: center;
}
</style>
