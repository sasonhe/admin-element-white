<template>
  <div class="screenfull">
    <!-- <el-tooltip class="item" effect="dark" content="全屏切换" placement="left">

    </el-tooltip> -->
    <i class="el-icon-full-screen" @click="clickme()"> {{isFullscreen?'退出全屏':'全屏'}}</i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    clickme(){
      if (!screenfull.isEnabled) {
        this.$message({
          message: '你的浏览器不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen
        })
      }
    }
  }
}
</script>

<style scoped>
.screenfull {
  display: inline-block;
  cursor: pointer;

}
</style>
