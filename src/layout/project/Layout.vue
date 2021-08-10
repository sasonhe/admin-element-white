<template>
<div class="app-wrapper" :class="classObj">
  <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
  <div class="fixed-header">
    <i-header />
  </div>
  <i-slider />
  <div class="main-container mleft">
    <i-main />
  </div>
</div>
</template>
<script>
import Iheader from './header'
import Islider from './slider'
import Imain from './main'
import { mapGetters } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  mixins: [ResizeMixin],
  data() {
    return {

    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  components:{
    'i-slider':Islider,
    'i-header':Iheader,
    'i-main':Imain,
    // 'tags-view':TagsView
  }
};
</script>

<style>
.app-main .el-card{
  border-radius: 0;
  border: none;
  margin-bottom: 5px;
}
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.main-container {
  /* height: calc(100vh - 60px); */
  height:100%;
  padding-top: 60px;
  background: #e2e2e2;
  transition: all .28s;
  margin-left: 220px;
  overflow: hidden;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  transition: all .28s;
}

.hideSidebar .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
.openSidebar .sidebar-container{
  width: 220px;
}
.hideSidebar .mleft{
  margin-left: 220px;
}
.openSidebar.mobile .mleft{
  margin-left: 0px;
}
.hideSidebar .sidebar-container{
  width: 60px;
}
.hideSidebar .mleft{
  margin-left: 60px;
}

.hideSidebar.mobile .sidebar-container{
  width: 0px;
}
.hideSidebar.mobile .mleft{
  margin-left: 0px;
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background .3s;
}
.hamburger-container:hover {
  background: rgba(0, 0, 0, .025)
}
.el-image-viewer__wrapper .el-icon-circle-close {
    color: #fff;
}
</style>
