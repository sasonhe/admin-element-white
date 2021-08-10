<template>
  <div class="footer">
    <div class="ftext">
      Copyright © {{new Date().getFullYear()}} XXXXXX
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped>
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 15px;
  height: 40px;
  z-index: 2000;
  border-top: solid 1px #e6e6e6;
  line-height: 40px;
  font-size: 14px;
  text-align: right;
  box-sizing: border-box;
  background: #fff;
}
.ftext{
  max-width:1200px;
  margin: 0 auto;
}
</style>
