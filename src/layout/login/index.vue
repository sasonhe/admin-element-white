<template>
  <div class="box-wrapper">
    <div class="login_img" :style="{backgroundImage:`url(${$baseUrl}login/user.jpg)`}"></div>
    <div class="header-warpper">
      <Header />
    </div>
    <div class="view-main">
      <el-scrollbar ref="tops" wrap-class="scrollbar-wrapper">
        <div class="app-main">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
  </div>

</template>

<script>
  import Header from './Header/'
  export default {
    components:{
      Header,
    },
    created() {

    },
    mounted(){

    },
    computed:{

    },
    methods: {

    },
    watch: {

    },
  }
</script>

<style scoped>
/deep/ .app-main .el-card{
  background-color: rgba(255, 255, 255, 0.8);
}
.login_img{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.login_img_admin{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-size: cover;
}
.box-wrapper{
  height: 100%;
}
.app-main{
  max-width:1200px;
  margin: 0 auto;
  padding: 5px 0;
  height:100%;
  overflow: hidden;

}
.el-scrollbar{
  height:100%;
}
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden;
}
.view-main{
  padding-top: 60px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}
.header-warpper{
  background: rgba(156, 194, 255, 0.1);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2000;
}

</style>
