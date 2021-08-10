<template>
  <div class="header-bar">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="logo">
          <img :src="`${$baseUrl}login/5dov.png`" fit="scale-down"/>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right-menu">
          <div class="admin">管理平台</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    mounted(){

    },
    methods: {

    },
    computed:{

    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.el-menu--horizontal > .el-menu-item.is-active{
  background: #{$menuBarBg} !important;
  color: #{$menuRightBg} !important;
}
.header-bar{
  width: 100%;
  height: 60px;
  padding:0 100px;
  box-sizing: border-box;
  overflow: hidden;
}
.right-menu{
  float: right;
  user-select: none;
}
.logo{
  width:150px;
  height: 60px;
  padding-top: 2px;
  box-sizing: border-box;
}
.logo img{
  width:100%;
}
/deep/ .el-menu--horizontal > .el-menu-item:not(.is-active):hover {
  background: none !important;
}
.admin {
  font-size: 20px;
  font-weight: bold;
  color: #253e76;
  line-height: 60px;
}
.LangBtn{
  margin-left: 10px;
}
</style>
