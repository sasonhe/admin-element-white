<template>
  <div class="expo-list-wrapper">
    <div class="expo-header">
      <Header />
    </div>
    <div class="view-main">
      <el-scrollbar ref="tops" wrap-class="scrollbar-wrapper">
        <div class="app-main">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from './header'
  import Footer from './footer'
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    },
    components:{
      Header,Footer
    }
  }
</script>

<style scoped>
.expo-header{
  background: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index:2000;
  border-bottom: solid 1px #e6e6e6;
}
.app-main{
  max-width:1200px;
  margin: 0 auto;
  padding: 5px 0;
  height:100%;
  overflow: hidden;
}
.el-scrollbar,.expo-list-wrapper{
  height:100%;
}
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden;
}
.view-main{
  padding-top: 60px;
  padding-bottom: 40px;
  height: 100%;
  box-sizing: border-box;
  background: #e2e2e2;
}
</style>
