<template>
  <el-scrollbar ref="tops" wrap-class="scrollbar-wrapper">
    <div class="app-main">
      <!-- //通过v-if来动态的判断展示 -->
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </el-scrollbar>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    created() {

    },
    mounted(){

    },
    methods: {

    },
    computed:{

    },

  }
</script>

<style scoped>
/* @import "~@/assets/css/transition.css"; */
.app-main{
  height:100%;
  padding: 5px 5px 45px 5px;
  box-sizing: border-box;
  overflow: hidden;
}
.el-scrollbar{
  height:100%;
}
</style>
