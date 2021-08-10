<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <i
    :class="{'is-active':isActive}"
    class="hamburger el-icon-s-fold"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 22px;
  height: 22px;
  font-size: 22px;
  transition: all .6s;
}

.hamburger.is-active {
  transform: rotate(180deg);
  background: none;
}
</style>
