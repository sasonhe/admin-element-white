<template>
<div id="app">
  <router-view v-if="isRouterAlive"/>
</div>
</template>

<script>
export default {
  name: "App",
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新view
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  },
};
</script>

<style>
#app,
html,
body {
  height: 100%;
  font-family: "微软雅黑",-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #fbfbfb;
  font-size: 14px;
}

.tool-bar {
  margin-bottom: 20px;
}

.select {
  margin: 0 4px;
}

.el-table--small {
  font-size: 13px;
}

.el-loading-mask {
  z-index: 1999;
}

@media screen and (max-width:1000px) and (min-height: 420px) {
  .el-dialog {
    width: 600px !important;
  }
}

@media screen and (max-width: 768px) and (min-height: 320px) {
  .el-dialog {
    width: 95% !important;
  }
}

.el-page-header__content {
  font-size: 14px;
}
.el-form-item--medium .el-form-item__label {
  position: relative;
}
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
  position: absolute;
  left: -8px;
  top: 0px;
}
.el-upload-list__item {
  transition: none !important;
}
#el-drawer__title span:focus{
  outline: none;
}
.annotationLayer{
  cursor: pointer;
}
.dtitle{
  padding-left: 8px;
  position: relative;
}
.dtitle::before{
  display: inline-block;
  content: '';
  width: 3px;
  height: 16px;
  background: #409eff;
  position: absolute;
  left: 0;
  top: 0px;
}
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .el-cascader__tags > span {
    flex: auto;
  }

  i.el-cascader-node__postfix {
    top: 50%;
    transform: translateY(-50%);
  }
}
/********webPrint*********/
.colors-custom .el-form-item__content{
  line-height: 12px !important;
}
.colors-custom .el-color-picker__trigger{
  width: 38px !important;
}
.font-label-custom{
  margin-right:0 !important;
}
.font-size-custom .el-input__inner{
  padding-left: 3px !important;
  padding-right: 36px !important;
}
/* .upload-demo .el-upload-dragger{
  height: 60px;
}
.upload-demo .el-upload-dragger .el-icon-upload{
  margin:0;
  font-size: 26px;
  line-height: 1;
} */
.setting-wrapper .scrollbar-wrapper .el-scrollbar__wrap{
  overflow-x:hidden;
}
.setting-wrapper .el-scrollbar__bar.is-horizontal{
  display: none;
}
.kk .el-input__inner{
  height:100%;
  text-align:center;
}
.kk .el-input__inner:active,.kk .el-input__inner:focus{
  border:none;
}
</style>
