<template>
  <el-form :model="user" :rules="rules" ref="user">
    <el-form-item prop="username" ref="up" :error="errorMsg">
      <div class="input-bar">
        <el-input class="username" placeholder="请输入账号" v-model.trim="user.username">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
          <span slot="prefix" class="plice"></span>
        </el-input>
      </div>
    </el-form-item>
    <el-form-item prop="password" :error="passMsg">
      <div class="input-bar">
        <el-input
          ref="pass"
          type="password"
          class="username"
          placeholder="请输入密码"
          v-model.trim="user.password"
          show-password
          @keyup.enter.native="handleLogin('user')"
        >
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          <span slot="prefix" class="plice"></span>
        </el-input>
      </div>
    </el-form-item>
    <el-form-item prop="checked">
      <el-checkbox class="checkbox" v-model="user.checked">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        style="width: 100%"
        @click.native.prevent="handleLogin('user')"
      >登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Encrypt,Decrypt,EnRsa } from '@/utils/crypt'//加密、解密
import { setPsd, getPsd, removePsd } from '@/utils/auth'
export default {
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      errorMsg: "",
      passMsg:"",
      user: {
        username: "",
        password: "",
        checked: false
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: "change" },
        ],
        password: [{ required: true, message: '请输入密码', trigger: "change" }]
      },
      loading: false
    };
  },
  computed: {},
  created() {
    this.getHasPsd()
  },
  mounted() {},
  methods: {
    //切换tab重置表单
    reset() {
      this.$refs.user.resetFields();
    },
    // 登录按钮
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // tudo...
        } else {
          return false;
        }
      });
    },
    //统一登录
    hostLogin(){
      let params ={
        loginPwd:EnRsa(this.user.password),
        userPhone:EnRsa(this.user.username)
      }
      //记住密码
      if(this.user.checked){
        let p = this.user.username +'^'+ this.user.password;
        let str = Encrypt(p);
        setPsd(str,this.type);
      }else{
        removePsd(this.type)
      }
    },
    getHasPsd(){
      let psd = getPsd(this.type);
      if(psd){
        let u = Decrypt(psd);
        let [ username, password ] = Decrypt(psd).split('^');
        this.user.username = username;
        this.user.password = password;
        this.user.checked = true;
        return
      }
      this.user.username = '';
      this.user.password = '';
      this.user.checked = false;
    },
  },
  components: {},
  watch: {

  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.input-bar {
  position: relative;
  border-bottom: 1px solid #ddd;
}

.el-form-item {
  margin-bottom: 15px !important;
}
.checkbox {
  padding-left: 3px;
}
/deep/ .username {
  .el-input__inner {
    border: none;
    padding-left: 45px;
  }
  .el-input__icon {
    font-size: 18px;
    color: #{$menuRightBg};
  }
  .el-input__prefix {
    left: 0;
    .el-input__icon {
      text-align: left;
    }
  }
}
/deep/ .el-form-item__error {
  z-index: 100;
}
.plice {
  display: inline-block;
  position: absolute;
  height: 16px;
  width: 1px;
  border-right: 1px solid #409eff;
  top: 10px;
  left: 30px;
}
</style>
